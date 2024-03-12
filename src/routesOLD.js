import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from './components/login/Login';
import Meta from './components/meta/acessonegado';
import MetasVendedoras from './components/MetasVendedoras/metasvend';
import MetasVendedorasGeral from './components/metavendendorageral/metavendedorageralgerencial';
import MetasVendedorasGeralVend from './components/metavendendorageralvend/metavendedorageralvend';
import MetasVendedorasGerenteLoja from './components/metavendendoragerenteloja/metasvendgerenteloja';

export default function MainRoutes(){
const usu_tipo = localStorage.getItem('usu_tipo')

return(
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/acessonegado" element={<Meta/>} />
<Route path="/metavendedoracliente" element={<MetasVendedoras/>} />
<Route path="/metavendedorageralgerencial" element={ usu_tipo === '0' || usu_tipo === '2'? <MetasVendedorasGeral/> : <Navigate to="/acessonegado" />} />
<Route path="/metavendedorageralvend" element={ usu_tipo === '1'? <MetasVendedorasGeralVend/> : <Navigate to="/acessonegado" />} />
<Route path="/metavendedorageralgerenteloja" element={usu_tipo === '2'? <MetasVendedorasGerenteLoja/> : <Navigate to="/acessonegado" />} />
</Routes>
);
}

// 0 gerencial
// 1 VENDEDEDOR
// 2 GERENTE LOJA