import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Input, Progress, Card, Label, Col, Row, FormGroup, Form } from "reactstrap";
import api from "../../api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ptBR } from 'date-fns/locale'
import "./metasvend.css";
import "react-datepicker/dist/react-datepicker.css";
import MenuSuperior from '../menuSuperior/MenuSuperior';


const MetasVendedoras = (props) => {

    const ven_numero = localStorage.getItem('ven_numero');
    const loja = localStorage.getItem('loja')

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


    const consultasdiversas = useCallback(() => {
        api.get(`metavendedoracliente/${datainicial}/${datafinal}/${loja}/${ven_numero}`).then(response => {
            const uniqueProgresso = response.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setProgresso(uniqueProgresso);
        })
    }, [datainicial, datafinal, loja,ven_numero ])


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
                                <Col sm={5} id="dateInput">
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
                                <Col sm={5} id="dateInput1">
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
                                <Col sm={2}>  
                                  <Button  id="botaosm" color="primary" onClick={consultasdiversas} > Filtrar </Button> 
                                 
                                </Col>
                            </Row>


                        </Form>

            
          
            <Label >{progresso[0]?.ven_nome}</Label>
            <div>
                <Card>
                    {progresso.map((item, index) => {
                        var procentagemfalta = item.procentagemfalta;
                        var porcentagemvenda = item.porcentagemvenda;
                        
                                   console.log(procentagemfalta, porcentagemvenda)
                        
                        
                                   if(item.meta === null || item.meta === 'null' ||item.meta === '')
                                   { item.meta = 0; 
                                   }
                                   if(item.venda === null || item.venda  === 'null'||item.venda  === '')
                                   { item.venda  = 0; 
                                   }
                                   if(item.falta === null || item.falta === 'null' || item.falta === '')
                                   { 
                                    item.falta = item.meta; 
                                   }
                                   if(porcentagemvenda === null || porcentagemvenda === 'null'||porcentagemvenda ==='')
                                   { porcentagemvenda = 100; 
                                   }
                                   if(procentagemfalta === null || porcentagemvenda === 'null'||porcentagemvenda === '')
                                   {
                                    porcentagemvenda = 0; 
                                   }
                                   var porcentagemvenda2 = porcentagemvenda;
                                   var procentagemfalta2 = procentagemfalta;
                                   
                                   
                                   if(Number(porcentagemvenda) > 80){
                                     
                                     porcentagemvenda2 = 80;
                                   }
                                   
                                   if(Number(procentagemfalta) <20){
                                     
                                     procentagemfalta2 = 20;
                                   }
                                   
                                   if(Number(porcentagemvenda) > 100){
                                     
                                     porcentagemvenda2 = 100;
                                   }
                                   if(Number(porcentagemvenda) < 15){
                                     
                                     porcentagemvenda2 = 15;
                                   }
                                   
                                   if(Number(procentagemfalta) > 85){
                                     
                                     procentagemfalta2 = 85;
                                   }
                        
                                   if(Number(procentagemfalta) < 0){
                                     
                                    procentagemfalta2 = 0;
                                  }
                                  return (
                        <div key={index}>
                            <Label >{item.cpf_cnpj} { ' - ' } {item.clientes_nome} { ' - ' } {item.tipo_cliente} </Label>
                            <Progress multi>

                            <Progress bar color="success"  value={porcentagemvenda2}><span class="">R$ { item.venda } - ({item.porcentagemvenda}%)</span></Progress>
                                <Progress  bar color="danger" value={procentagemfalta2}><span class="">R$ { item.falta } - ({item.procentagemfalta}%)</span></Progress>
                            </Progress>
                        </div>
                         );
                })}
                </Card>
            </div>
        </div>
        </React.Fragment>
    );
}

export default MetasVendedoras;
