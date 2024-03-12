import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Input, Progress, Card, Label, Col, Row, FormGroup, Form } from "reactstrap";
import api from "../../api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ptBR } from 'date-fns/locale'
import "./metasvend.css";
import "react-datepicker/dist/react-datepicker.css";


const MetasVendedorasClientes = (props) => {
    console.log("VENDEDORA");
    var vendedoraN = props.vendedoraN;
    
    var lojas = props.lojas;

    const datainicial = moment(props.datini).format("YYYYMMDD")
    const datafinal = moment(props.datfim).format("YYYYMMDD")

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

    console.log(datainicial, datafinal)


    const [progresso, setProgresso] = useState([]);


     useEffect(() => {
        api.get(`metavendedoracliente/${datainicial}/${datafinal}/${lojas}/${vendedoraN}`).then(response => {
            const uniqueProgresso = response.data.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            setProgresso(uniqueProgresso);
        })
    }, [datainicial, datafinal, lojas, vendedoraN])

    const progressoOrdenado = progresso.sort((a, b) => b.venda - a.venda);

    return (
        <React.Fragment >
            <div className="metasclientes" >
                <div  style={{ width: '96%' }}>
                    <Card>
                        {progressoOrdenado.map((item, index) => (
                            <div className="cliente" key={index}>
                                <Label >{item.cpf_cnpj} {' - '} {item.clientes_nome} {' - '} {item.tipo_cliente} </Label>
                                <Progress multi>
                                    <Progress bar color="success" value={item.venda}>{'R$ ' + item.venda + '  -  (' + item.porcentagemvenda + '%)'}</Progress>
                                    <Progress bar color="danger" value={item.falta}>{'R$ ' + item.falta + ' - (' + item.procentagemfalta + '%)'}</Progress>
                                </Progress>
                               
                            </div>
                        ))}
                    </Card>
                    
                </div>
            </div>
        </React.Fragment>
    );
}

export default MetasVendedorasClientes;
