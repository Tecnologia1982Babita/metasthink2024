import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Input, Progress, Card, Label, Col, Row, FormGroup, Form } from "reactstrap";
import api from "../../api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ptBR } from 'date-fns/locale'
import "./metavendedorageral.css";
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

    useEffect(() => {
        api.get(`http://192.168.0.62:3333/metavendedorageral/${dataHoje}/${dataHoje}/${loja}/`).then(response => {
            const uniqueProgresso = response.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setProgresso(uniqueProgresso);
        })
    }, [loja])


    const consultasdiversas = useCallback(() => {
        api.get(`http://192.168.0.62:3333/metavendedorageral/${datainicial}/${datafinal}/${loja}/`).then(response => {
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
  <h2 >Acompanhamento de Metas Geral</h2>
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
                                  <Button  color="primary" onClick={consultasdiversas} > Filtrar </Button> 
                                 
                                </Col>
                            </Row>


                        </Form>

            
          
          
            <div>
<Card>
  {progresso.map((item, index) => {
    // verifica se é o primeiro item do vendedor para exibir o nome
    if (index === 0 || item.ven_nome !== progresso[index - 1].ven_nome) {
      // atribui o nome do vendedor à variável venNome
      var venNome = item.ven_nome;
      return (
        <div key={index}>
          <Label>{venNome}</Label>
          
          <Progress multi>
          <Label>{item.rev_nom}</Label>
            <Progress bar color="success" value={item.venda}>{'R$ ' + item.venda + '  -  (' + item.porcentagemvenda + '%)'}</Progress>
            <Progress bar color="danger" value={item.falta}>{'R$ ' + item.falta + ' - (' + item.procentagemfalta + '%)'}</Progress>
          </Progress>
        </div>
      );
    } else {
      // se não for o primeiro item do vendedor, não exibe o nome
      return (
        <div key={index}>
          <Progress multi>
          <Label>{item.rev_nom}</Label>

            <Progress bar color="success" value={item.venda}>{'R$ ' + item.venda + '  -  (' + item.porcentagemvenda + '%)'}</Progress>
            <Progress bar color="danger" value={item.falta}>{'R$ ' + item.falta + ' - (' + item.procentagemfalta + '%)'}</Progress>
          </Progress>
        </div>
      );
    }
  })}
</Card>

            </div>
        </div>
        </React.Fragment>
    );
}

export default MetasVendedoras;
