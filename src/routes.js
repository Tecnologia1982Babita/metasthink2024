import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from './components/login/Login';
import Meta from './components/meta/acessonegado';
import MetasVendedoras from './components/MetasVendedoras/metasvend';
import MetasVendedorasGeral from './components/metavendendorageral/metavendedorageralgerencial';

import MetasVendedorasGeralVend from './components/metavendendorageralvend/metavendedorageralvend';
import MetasVendedorasGerenteLoja from './components/metavendendoragerenteloja/metasvendgerenteloja';
import MetasVendedorasGeralnew from './components/metavendendorageralNEW/metavendedorageralgerencialNEW';
import MetasVendedorasGeralant from './components/metavendendorageralANT/metavendedorageralgerencialANT';

import TipoPagamentoRevend from './components/VendedorasUtils/TipoPagamentoRevend';
import TipoPagamentoRevendGeral from './components/VendedorasUtils/TipoPagamentoRevendGeral';
import AtualizaSenha from "./components/VendedorasUtils/AtualizaSenha";

export default function MainRoutes(){
const usu_tipo = localStorage.getItem('usu_tipo')

    const [ativaResp, setAtivaResp] = useState(null)
    //Responsividade
    useEffect(()=>{
        if (ativaResp == null){
            if (window.matchMedia("(max-width: 767px)").matches){
            setAtivaResp(true)
            }else{
                setAtivaResp(false)
            }
        }
    },[ativaResp])

return(
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/acessonegado" element={<Meta/>} />
<Route path="/metavendedoracliente" element={<MetasVendedoras/>} />
<Route path="/metavendedorageralvend" element={ usu_tipo === '1'? <MetasVendedorasGeralVend/> : <Navigate to="/acessonegado" />} />
<Route path="/metavendedorageralgerenteloja" element={usu_tipo === '2'? <MetasVendedorasGerenteLoja/> : <Navigate to="/acessonegado" />} />
<Route path="/metavendedorageralgerencial" element={ usu_tipo === '0' || usu_tipo === '2'? <MetasVendedorasGeral/> : <Navigate to="/acessonegado" />} />
<Route path="/metavendedorageralgerencialnew" element={<MetasVendedorasGeralnew/>} />
<Route path="/tipopagamentorealizado" element={usu_tipo === '2' || usu_tipo === '1' ? <TipoPagamentoRevend ativaResp={ativaResp}/> : <Navigate to="/acessonegado" />} />
<Route path="/alterarsenha" element={usu_tipo ? <AtualizaSenha /> : <Navigate to="/acessonegado" />} />
<Route path="/metavendedorageralgerencialant" element={<MetasVendedorasGeralant/>} />
<Route path="/tipopagamentorealizadoGeral" element={usu_tipo === '0' ? <TipoPagamentoRevendGeral ativaResp={ativaResp}/> : <Navigate to="/acessonegado" />} />
</Routes>
);
}

// 0 gerencial
// 1 VENDEDEDOR
// 2 GERENTE LOJA