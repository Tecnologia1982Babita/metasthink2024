import React, { useState } from 'react';
import "./MenuSuperior.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import logo from "../img/logo_branca.png"
import MaterialIcon from '@material/react-material-icon';

const MenuSuperior = (props) => {
  const usu_tipo = localStorage.getItem('usu_tipo')
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md">
        <NavbarBrand href="/"><img src={logo} className="img"></img></NavbarBrand>
          <NavbarToggler onClick={toggle} className="Hamburger" />
            <Collapse isOpen={isOpen} navbar id="geral">
              <Nav className="mr-auto" navbar id="geral">
         
              { usu_tipo === '1' ? <>
                <NavItem id="li1">
                    <NavLink href="/metavendedoracliente" id="menus">META VENDEDORA / REVENDEDORA</NavLink>
                </NavItem>

                 <NavItem id="li2">
                    <NavLink href="/metavendedorageralvend" id="menus">META GERAL</NavLink>
                </NavItem> 
                </>: <></>}

                {usu_tipo === '2'? <NavItem id="li2">
                    <NavLink href="/metavendedorageralgerenteloja" id="menus">META VENDEDORA / REVENDEDORA (GERENTE LOJA) </NavLink>
                </NavItem> : <></>}

                { usu_tipo === '2'? <NavItem id="li2">
                    <NavLink href="/metavendedorageralgerencial" id="menus">META GERAL (GERENTE LOJA)</NavLink>
                </NavItem> : <></>}

                <NavItem id="li2">
                    <NavLink href="/metavendedorageralgerencialNEW" id="menus">METAS UNIFICADAS APP (ESCRITORIO)</NavLink>
                </NavItem>

                { usu_tipo === '1' || usu_tipo === '2'?
                <NavItem id="li2">
                    <NavLink href="/tipopagamentorealizado" id="menus">TIPOS DE PAGAMENTO REVENDEDORA</NavLink>
                </NavItem> : <></>}

                { usu_tipo === '0'?
                <NavItem id="li2">
                    <NavLink href="/tipopagamentorealizadoGeral" id="menus">TIPOS DE PAGAMENTO REVENDEDORA</NavLink>
                </NavItem> : <></>}

                { usu_tipo ?<NavItem id="li2">
                    <NavLink href="/alterarsenha" id="menus">ALTERAR SENHA</NavLink>
                </NavItem> : <></>}

                <NavItem id="li2">
                    <NavLink href="/metavendedorageralgerencialANT" id="menus">METAS CONSULTAS ANTIGAS (ESCRITORIO)</NavLink>
                </NavItem>

              {/*  <NavItem id="li3">
                    <NavLink href="/checkpromo" id="menus"><i className="material-icons md-36 souza-left ">plagiarism</i>PRODUTOS PROMOÇÃO</NavLink>
                </NavItem>
              */}
      
              </Nav> 
              <NavItem id="BotaoSair">
                <NavLink href="/" className="btn">SAIR</NavLink>
              </NavItem>
          </Collapse>
      </Navbar>
    </div>
  );
}

export default MenuSuperior;