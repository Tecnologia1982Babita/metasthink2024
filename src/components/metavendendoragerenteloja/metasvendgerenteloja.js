import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Input, Progress, Card, Label, Col, Row, FormGroup, Form } from "reactstrap";
import api from "../../api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ptBR } from 'date-fns/locale'
import "./metasvendgerenteloja.css";
import "react-datepicker/dist/react-datepicker.css";
import MenuSuperior from '../menuSuperior/MenuSuperior';


const MetasVendedoras = (props) => {

    const ven_numero = localStorage.getItem('ven_numero');
    const loja = localStorage.getItem('loja')

    const [vendedoras, setVendedoras] = useState([]);
    const [vendedoraSelecionada, setVendedoraSelecionada] = useState("");




      function handleVendedoraSelecionada(ev) {
        const {name, value} = ev.target;
        setVendedoraSelecionada(value)
        }
    

      console.log(vendedoraSelecionada);

    function hoje() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var formatado = dd + '/' + mm + '/' + yyyy;
        var bd = yyyy + '' + mm + '' + dd;
        var valores = { 'formatado': formatado, 'bd': bd };
        return valores;
    }

    var dataHoje = hoje().bd;

    const [selectDateIni, setSelectDateIni] = useState(null);
    

    const onChange = selectDateIni => {
        setSelectDateIni(selectDateIni);
        }




    const [selectDateFim, setSelectDateFim] = useState(null);

    const onChange1 = selectDateFim => {
        setSelectDateFim(selectDateFim);
    }

    const onChange50 = selectDateFim => {
        setSelectDateFim(selectDateFim);
    }

    const [value5, setValue5] = useState([]);



    const datainicial = moment(selectDateIni).format("YYYYMMDD")

  

    const datafinal = moment(selectDateFim).format("YYYYMMDD")


    console.log(datainicial, datafinal)


    const [progresso, setProgresso] = useState([]);

   /* useEffect(() => {
        api.get(`http://192.168.0.62:3333/metavendedoracliente/${dataHoje}/${dataHoje}/${loja}/${ven_numero}`).then(response => {
            const uniqueProgresso = response.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setProgresso(uniqueProgresso);
        })
    }, [loja])*/

    useEffect(() => {
        api.get(`metavendedora_listavendedoras/${loja}/`).then(response => {
            setVendedoras(response.data)
        })
    }, []);

    console.log(vendedoras)

   /* const consultasdiversas = useCallback(() => {
        api.get(`http://192.168.0.62:3333/metavendedoracliente/${datainicial}/${datafinal}/${loja}/${ven_numero}`).then(response => {
            const uniqueProgresso = response.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setProgresso(uniqueProgresso);
        })
    }, [datainicial, datafinal, loja,ven_numero ])*/


    const consultasdiversasgerenteloja = useCallback(() => {
        api.get(`metavendedoraclientegerenteloja/${datainicial}/${datafinal}/${loja}/${vendedoraSelecionada}/`).then(response => {
            const uniqueProgresso = response.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setProgresso(uniqueProgresso);
        })
    }, [datainicial, datafinal, loja,vendedoraSelecionada ])



    return (
        <React.Fragment>
        
        <div>
        <MenuSuperior />
   <Form>
   <div className="alinhamento">
  <h2 >Expectativa de Compra das Revendedoras</h2>
</div>
                            <Row>
                                <Col sm={12}> 
        
                                </Col>
                            </Row> 
                            <Row className="d-flex justify-content-between">
                                <Col sm={12} md={5} id="dateInput">
                                    <DatePicker 
                                        placeholderText='Data Inicial:' 
                                        id="data"  
                                        onChange = { onChange } 
                                        selected = { selectDateIni } 
                                        locale= { ptBR } 
                                        dateFormat="P"
                                        withPortal
                                        type='reset'
                                    />
                                </Col>
                                <div style={{ width: '1rem' }}></div>
                                <Col sm={12} md={5} id="dateInput1">
                                    <DatePicker 
                                        placeholderText='Data Final:' 
                                        id="data1" 
                                        onChange = { onChange1 } 
                                        selected = { selectDateFim }
                                        locale= { ptBR } 
                                        dateFormat="P"
                                        withPortal
                                        type='reset'
                                    /> 
                                </Col>
                                <Col sm={12} md={2}>
<select style={{ 
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#f2f2f2',
  color: '#333',
  padding: '5px',
  fontSize: '16px',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)'
  
}} onChange={handleVendedoraSelecionada} id='selectsilas'>
  <option value="">Selecione uma vendedora</option>
  {vendedoras.map((vendedora) => (
    <option key={vendedora.ven_numero} value={vendedora.ven_numero}>
      {vendedora.ven_nome} 
    </option>
  ))}
</select>

        </Col>
                                <Col sm={12} md={2}>  
                                <Button  id="botaosm" color="primary" onClick={consultasdiversasgerenteloja} > Filtrar </Button> 
                                 
                                </Col>
                            </Row>


                        </Form>

            
          
            <Label >{progresso[0]?.ven_nome}</Label>
            <div>
                <Card>
                    {progresso.map((item, index) => (
                        <div key={index}>
                            <Label >{item.cpf_cnpj} { ' - ' } {item.clientes_nome} { ' - ' } {item.tipo_cliente} </Label>
                            <Progress multi>
                                <Progress  bar color="success" value={item.venda}>{'R$ ' + item.venda + '  -  (' + item.porcentagemvenda + '%)'}</Progress>
                                <Progress  bar color="danger" value={item.falta}>{'R$ ' + item.falta + ' - (' + item.procentagemfalta + '%)'}</Progress>
                            </Progress>
                        </div>
                    ))}
                </Card>
            </div>
        </div>
        </React.Fragment>
    );
}

export default MetasVendedoras;
