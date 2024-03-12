import '../../assets/css/Principais.css'
import '../../assets/css/fonts.css'
import '../../assets/css/alteraSenha.css'
import '../../assets/css/colors.css'

import { useEffect, useState } from 'react'
import { AlteraSenhaVendedora } from '../funcionalidades/bancoGet'
import MenuSuperior from '../menuSuperior/MenuSuperior'

var windowHeight = window.screen.availHeight;
//logoAnimation
export default function AtualizaSenhaVendedora(props){

    const [callAlteraSenha, setCallAlteraSenha] = useState(0)
    const [novaSenha, setNovaSenha] = useState('')
    const [novaSenhaNovamente, setNovaSenhaNovamente] = useState('')

    const [alerta, setAlerta] = useState({status: false, title: '', text: ''})
    const usu_login = localStorage.getItem('usu_login')

    useEffect(() => {
        if(novaSenha !== novaSenhaNovamente){
            setAlerta({status: true, title: "Algo deu errado", text: "Senhas não são iguais!"})
        }else if(callAlteraSenha !== 0){
            AlteraSenhaVendedora({LOGIN: usu_login, NOVASENHA: novaSenha})
                .then(resp=>{
                    if(resp.Error){
                        setAlerta({status: true, title: "Algo deu errado", text: resp.Error})
                    }else{
                        setAlerta({status: true, title: "Sucesso", text: "Senha Alterada com sucesso!"})
                    }
                })
                .catch(()=>{setAlerta({status: true, title: "Algo deu errado", text: "Sistema Indisponível!"})})
        }
      }, [callAlteraSenha]);

    return <>
        <div className="containerPrincipal alteraSenha" style={{minHeight: "100vh", display: 'flex',
    flexDirection: 'column', justifyContent: "flex-end", overflowY: "hidden"}}>
        <MenuSuperior />
        {alerta.status  ? <div id="customDialog" className="custom-dialog" style={alerta.status ? {display: 'block'} : {display: 'none'}}>
            <h2>{alerta.title}</h2>
            <p>{alerta.text}</p>
            <button onClick={()=>setAlerta({status: false, title: "", text: ""})}>OK</button>
        </div> : <></>}
            <div className="containerMudaSenha">
                <div className="titleMudaSenha">Mudar Senha</div>
                <input type="password"  className="senhaNova" placeholder='Digite a Nova Senha'
                                            onChange={(event)=>setNovaSenha(event.target.value)} value={novaSenha}/>
                <input type="password"  className="senhaNovaNovamente" placeholder='Confirme a Nova Senha'
                                            onChange={(event)=>setNovaSenhaNovamente(event.target.value)} value={novaSenhaNovamente}
                                            onKeyDown = {event => event.key === 'Enter' ? setCallAlteraSenha(callAlteraSenha+1) : ''}/>
                <div className="buttonAlteraSenha" onClick={()=>setCallAlteraSenha(callAlteraSenha+1)}>Alterar Senha</div>
                <div className="buttonCancelMudarSenha" onClick={()=>{window.location.href = '/metavendedoracliente'}}>Cancelar</div>
            </div>
        </div>
    </>
}