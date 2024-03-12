import React, { useState } from "react";
import {  useNavigate  } from 'react-router-dom';
import "./Login.css";
import api from '../../api';
import { Input, Button, Label, Media, Row, Col, FormGroup, Form} from 'reactstrap';



const Login = (props) => {
   
    const [usu_login, setLogin] = useState('');
    const [usu_senha, setSenha] = useState('');
    
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);

    function onChange1(ev) {
        const {nome, value} = ev.target;
        setLogin(value)
        if (ev !== '') {
            setIsActive1(true);
          } else {
            setIsActive1(false);
          }
    }

    function onChange2(ev) {
        const {name, value} = ev.target;
        setSenha(value)
        if (ev !== '') {
            setIsActive2(true);
          } else {
            setIsActive2(false);
          }
    }
   
    const navigate  = useNavigate ();
    

   async function handleLogin(e){
        e.preventDefault();

        try {
const response = await api.get(`usuariosvend/${usu_login}/${usu_senha}`);
console.log(response.data[0].ven_numero[0]) 

localStorage.setItem('usu_login', response.data[0].usu_login)
localStorage.setItem('usu_senha', response.data[0].usu_senha)
localStorage.setItem('ven_numero', response.data[0].ven_numero)
localStorage.setItem('loja', response.data[0].ven_loja)
localStorage.setItem('usu_tipo', response.data[0].usu_tipo)
     


navigate('/metavendedoracliente')
} catch (err) {
alert('falha')
        }
        
    }

    
    return (
        <div className="root2">
        <Form id="loginSistem" onSubmit={handleLogin}>
            <Row className="row">
                <Col sm={6}>
                    <FormGroup className="title">  
                        <h2 id="title-text" className="text">THINK METAS</h2>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className="login">
                        <Input className="form" type="text" placeholder=" " id="login" value={usu_login} onChange={onChange1}></Input>
                        <Label className={ isActive1 ? "Active" : ""}>Usuário:</Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup className="senha">
                        <Input className="form" type="password" placeholder=" " id="senha" value={usu_senha} onChange={onChange2}></Input>
                        <Label  className={ isActive2 ? "Active" : ""}>Senha:</Label>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Button id="buttonlogin" className="efeito efeito-1" type="submit">LOGIN</Button>
                    </FormGroup>
                </Col>
            </Row>
        </Form>

    </div>  
    )
}

export default Login;