import '../../assets/css/colors.css'
import '../../assets/css/Principais.css'
import '../../assets/css/fonts.css'
import '../../assets/css/tipoPagVendedora.css'
import { useEffect, useReducer, useRef } from 'react'
import { ConsultaTipoPagVendedora } from '../funcionalidades/bancoGet'
import GlobalVar from '../funcionalidades/GlobalVar'
import MenuSuperior from '../menuSuperior/MenuSuperior'

import GlobalGraficoTipodePag from '../funcionalidades/GlobalGraficoTipodePag'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; //Graficos
import { Doughnut } from "react-chartjs-2"; //grafico de rosca
import preencheInfo from '../funcionalidades/reducerTipoPagRevend'

ChartJS.register(ArcElement, Tooltip, Legend);

const LinhaTabela = (props)=>{
    const {val,i, usu_tipo} = props
        return <>
          <tr key={i}>
            {usu_tipo !== '1' && val.ven_nome ? <td>{val.ven_nome}</td> : <></>}
            <td>{val.forpag_desc}</td>
            <td>R$ {GlobalVar.converteFloat(val.caipag_valor)}</td>            
          </tr>
          </>
  }

export default function TipoPagamentosVendedoras(props){
    
    const hoje = new Date().toISOString().split('T')[0];
    const umMesAtras = GlobalVar.retornaMesAnterior()

    

    const [stateInfo, dispachInfo] = useReducer(preencheInfo, {dataInit : umMesAtras, dataFim: hoje, codigoVend: '', limpaCampos: false, dadosGraf : null,
    pesquisaTipoPagVend: 1, alerta: {status: false, title: '', text: ''}, graficoConfig: {}, selectedData: null})

    const tablePagVendedoras = useRef()

    const usu_tipo = localStorage.getItem('usu_tipo')
    const lojaLogada = localStorage.getItem('loja')
    const ven_numero = localStorage.getItem('ven_numero')


    const tamanhoGrafico = props.ativaResp ? '95vw' : '20vw'

    useEffect(()=>{
        if (stateInfo.pesquisaTipoPagVend > 0 && stateInfo.dataInit !== ''){
            ConsultaTipoPagVendedora({DATAINIT : stateInfo.dataInit, DATAFIM: stateInfo.dataFim, 
                CODIGOVEND: usu_tipo === '1' ? ven_numero : stateInfo.codigoVend, LOJAORIGEM: lojaLogada})
                .then(resp => {
                    if(resp.Error){
                        dispachInfo({type:'alerta', value: {status: true, title: "Algo deu errado", text: resp.Error}})
                        dispachInfo({type:'dadosGraf', value: null})
                    }else{
                        let configGrafico = {POSITIVO: [], NEGATIVO: [], TOTALPOSITIVO: {qtd: 0, valor: 0}, TOTALNEGATIVO: {qtd: 0, valor: 0},
                        TOTAL: {qtd: 0, valor: 0},dataGrafico: []}
                        let dataGrafico = []
                        let legendaGrafico = []
                        let fundoGrafico = []

                        resp.forEach((val,index)=>{
                            if ([1,5,4,11,12].includes(val.forpag_cod)){
                                configGrafico.POSITIVO.push(val)
                                configGrafico.TOTALPOSITIVO.valor += parseFloat(val.caipag_valor)
                                
                            }else{
                                configGrafico.NEGATIVO.push(val)
                                configGrafico.TOTALNEGATIVO.valor += parseFloat(val.caipag_valor)
                            }                            
                        })
                        const larguraResp = [configGrafico.POSITIVO.length,configGrafico.NEGATIVO.length]
                        
                        configGrafico.TOTAL.valor += configGrafico.TOTALNEGATIVO.valor + configGrafico.TOTALPOSITIVO.valor

                        configGrafico.POSITIVO.forEach((val,index)=>{
                            configGrafico.dataGrafico.push(val)
                            fundoGrafico.push(GlobalGraficoTipodePag.gerarTomDiferente(((index/(larguraResp[0]))).toFixed(1),"#0eccc8", 'blue'))
                            dataGrafico.push(val.caipag_valor)
                            legendaGrafico.push(' '+val.forpag_desc)
                        })
                        configGrafico.NEGATIVO.forEach((val,index)=>{
                            configGrafico.dataGrafico.push(val)
                            fundoGrafico.push(GlobalGraficoTipodePag.gerarTomDiferente(((index/(larguraResp[1]))).toFixed(1),"#c90e40", 'red'))
                            dataGrafico.push(val.caipag_valor)
                            legendaGrafico.push(' '+val.forpag_desc)
                        })

                        dispachInfo({type:'dadosGraf', value: configGrafico})
                        dispachInfo({type:'graficoConfig', value: {...GlobalGraficoTipodePag.configuracaoDados, labels: legendaGrafico,
                        datasets : [{...GlobalGraficoTipodePag.configuracaoDados.datasets[0], data: dataGrafico, 
                        backgroundColor: fundoGrafico}]}})

                        
                    }
                })
        }else if(stateInfo.pesquisaTipoPagVend > 0 && stateInfo.dataInit === ''){
            dispachInfo({type:'alerta', value: {status: true, title: "Alerta", text: "Preencha a data Inicial."}})
        }
        
    },[stateInfo.pesquisaTipoPagVend])

    useEffect(() => {
        if (stateInfo.limpaCampos) {
            dispachInfo({type:'dataInit', value:''})
            dispachInfo({type:'dataFim', value:''})
            dispachInfo({type:'codigoVend', value:''})
            dispachInfo({type:'limpaCampos', value: false})
        }
      }, [stateInfo.limpaCampos]);

    return <>
        <div className="containerPrincipal tipoPagVendedora" style={{minHeight: "100vh", /*maxHeight: windowHeight, */display: 'flex',
    flexDirection: 'column', overflowY: "hidden"}}>
        <MenuSuperior />
        {stateInfo.alerta.status  ? <div id="customDialog" className="custom-dialog" style={stateInfo.alerta.status ? {display: 'block'} : {display: 'none'}}>
            <h2>{stateInfo.alerta.title}</h2>
            <p>{stateInfo.alerta.text}</p>
            <button onClick={()=>dispachInfo({type:'alerta', value: {status: false, title: "", text: ""}})}>OK</button>
        </div> : <></>}
        <div className="card card--accent">
            <h2>Tipo Pagamento Revendedora</h2>
            <div className="inputsCard">
                <div className='inputTitleComp'>
                    <label>Data Inicial</label>
                    <input type="date" id="dataIni" onChange={(e)=>dispachInfo({type:'dataInit', value: e.target.value})} value={stateInfo.dataInit}/>
                </div>
                
                <div className='inputTitleComp'>
                    <label>Data Final</label>
                    <input type="date" id="dataFim" onChange={(e)=>dispachInfo({type:'dataFim', value: e.target.value})} value={stateInfo.dataFim}/>
                </div>

                
                {usu_tipo === '1' ? <></> : <div className='inputTitleComp'>
                    <label>Código Vendedora</label>
                    <input type="text" id="codVend" onChange={(e)=>dispachInfo({type:'codigoVend', value: e.target.value})} value={stateInfo.codigoVend}/>
                </div>}
            </div>
            
            
            <div className="button-group">
                <button className="pesquisar" onClick={()=>dispachInfo({type:'pesquisaTipoPagVend', value:stateInfo.pesquisaTipoPagVend+1})}>Pesquisar</button>
                <button className="limpar" onClick={()=>dispachInfo({type:'limpaCampos', value: !stateInfo.limpaCampos})}>Limpar</button>
                <button className="geraexcel" onClick={()=>GlobalVar.exportaExcel(tablePagVendedoras.current,'RelacoesVendedoras')}>Gerar Excel</button>
            </div>
        </div>
        
        {stateInfo.dadosGraf ?
        <div className='totalPorcentagem'>
                <div className="naMeta">PERCENTUAL BOM: {((stateInfo.dadosGraf.TOTALPOSITIVO.valor / stateInfo.dadosGraf.TOTAL.valor) *100).toFixed(2)}%</div>
                <div className="foraMeta">PERCENTUAL RUIM: {((stateInfo.dadosGraf.TOTALNEGATIVO.valor / stateInfo.dadosGraf.TOTAL.valor) *100).toFixed(2)}%</div>
            </div>
      : <></>}
        <div className='graficoTotal'>
                    {stateInfo.dadosGraf  ? <Doughnut data={stateInfo.graficoConfig } options={{...GlobalGraficoTipodePag.options,
                    onClick: (event, elements) => (elements.length > 0) ? '' : ''
                }} 

                    plugins={[GlobalGraficoTipodePag.myPlugin]} 
                    style={props.ativaResp ? {maxWidth: tamanhoGrafico, maxHeight: tamanhoGrafico} : 
                            {maxWidth: tamanhoGrafico, maxHeight: tamanhoGrafico, 
                                width: tamanhoGrafico, height: tamanhoGrafico}}/> : <></>}
            </div>


        <table className="tablePagVendedoras" ref={tablePagVendedoras}>  
            <thead>
                {stateInfo.dadosGraf ? <tr>
                    {usu_tipo !== '1' && ((stateInfo.dadosGraf.POSITIVO[0] && stateInfo.dadosGraf.POSITIVO[0].ven_nome)
                     || (stateInfo.dadosGraf.NEGATIVO[0] && stateInfo.dadosGraf.NEGATIVO[0].ven_nome)) ? <th>NOME VENDEDORA</th> : <></>}
                    <th>TIPO DE PAGAMENTO</th>
                    <th>VALOR TOTAL</th>
                </tr> : <></>}
        </thead>
        <tbody>
            {stateInfo.dadosGraf ? stateInfo.dadosGraf.POSITIVO.map((val, i) => {
                return <LinhaTabela  val={val} i={i} key={"celulaTipoPagVend"+i} usu_tipo={usu_tipo}/>
                }) : <></>}
            {stateInfo.dadosGraf  ? stateInfo.dadosGraf.NEGATIVO.map((val, i) => {
                return <LinhaTabela  val={val} i={i} key={"celulaTipoPagVend"+i} usu_tipo={usu_tipo}/>
                }) : <></>}
        </tbody>
        </table>

        </div>
    </>
}
