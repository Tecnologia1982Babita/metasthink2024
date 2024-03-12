import React, { useEffect, useState } from "react";
import { Container, Button, Input, Progress, Card, Label, Col, Row, FormGroup, Form } from "reactstrap";
import api from "../../api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ptBR } from 'date-fns/locale'
import "./metavendedorageral.css";
import "react-datepicker/dist/react-datepicker.css";
import MetasVendedorasClientes from '../metavendendorageralNEW/metasvend';
import Modal from 'react-modal';
const MetasVendedorasGeral = (props) => {
  console.log('metag: ' + props.lojas);
  var lojas = props.lojas

  const [chamaCliente, setchamaCliente] = useState(0);

  const [showModalCliente, setShowModalCliente] = useState(false);

  const [selectedStore, setSelectedStore] = useState(null);

  const [loading, setLoading] = useState(false);

  
  const [ativaResp, setAtivaResp] = useState(false)

  useEffect(()=>{
    if (window.matchMedia("(max-width: 767px)").matches){
      setAtivaResp(true)
    }
  })
  


  const handleOpenModal = (index, item,event) => {
    setSelectedStore(item.loj_cod);
    console.log('Modal');
    console.log(event);
    setchamaCliente(event);

    
    setShowModalCliente(true);
  };

  const handleCloseModal = () => {
    setShowModalCliente(false);
  };

  const [mostrarMetaLoja, setMostrarMetaLoja] = useState(false);
  const handleClick = (event) => {
    console.log("TRUE");
    console.log(event);
    setMostrarMetaLoja(true);

  };




  const datainicial = moment(props.datini).format("YYYYMMDD")
  const datafinal = moment(props.datfim).format("YYYYMMDD")


  console.log(datainicial, datafinal)


  const [progresso, setProgresso] = useState([]);

 

  useEffect(() => {
    api.get(`metavendedorageralgerencial/${datainicial}/${datafinal}/${lojas}/`).then(response => {
      const uniqueProgresso = response.data.filter((value, index, self) => {
        lojas = 0;
        return self.indexOf(value) === index;
      });
      setProgresso(uniqueProgresso);

    })
  }, [datainicial, datafinal, lojas])


  return (

    <React.Fragment>

      <div className="metaslojas">
        <div style={{ width: '103.3%' }}>
          <Card style={{ background: '' }}>
            {progresso.map((item, index) => {
              // verifica se é o primeiro item do vendedor para exibir o nome
              var RN = item.codigovend;
              if (index === 0 || item.ven_nome !== progresso[index - 1].ven_nome) {
                // atribui o nome do vendedor à variável venNome
                var venNome = item.ven_nome;
                return (
                  <div key={index} onClick={() => handleOpenModal(index, item,RN)} style={{ margin: '10px' }}>
                    <Label style={{ background: '#1E88E5' }}>{venNome}</Label>
                    <Progress multi style={{ margin: '10px' }} >
                      <Label>{item.rev_nom}</Label>
                      <Progress bar color="success" value={item.venda}>{'R$ ' + item.venda + '  -  (' + item.porcentagemvenda + '%)'}</Progress>
                      <Progress bar color="danger" value={item.falta}>{'R$ ' + item.falta + ' - (' + item.procentagemfalta + '%)'}</Progress>
                    </Progress>
                    <Row> {mostrarMetaLoja && < MetasVendedorasClientes lojas={lojas} datini={datainicial} datfim={datafinal} vendedoraN={RN} />}</Row>
                  </div>
                );
              } else {
                // se não for o primeiro item do vendedor, não exibe o nome
                return (
                  <div key={index} onClick={() => handleClick(RN)}>
                    <Progress multi>
                      <Label>{item.rev_nom}</Label>
                      <Progress bar color="success" value={item.venda}>{'R$ ' + item.venda + '  -  (' + item.porcentagemvenda + '%)'}</Progress>
                      <Progress bar color="danger" value={item.falta}>{'R$ ' + item.falta + ' - (' + item.procentagemfalta + '%)'}</Progress>
                    </Progress>
                    <Row> {mostrarMetaLoja && < MetasVendedorasClientes lojas={lojas} datini={datainicial} datfim={datafinal} vendedoraN={RN} />}</Row>
                  </div>
                );
              }

            })}
            <Modal isOpen={showModalCliente} onRequestClose={handleCloseModal} className="modal-container" >
            
              {/* Conteúdo do modal */}
              <Row>{< MetasVendedorasClientes lojas={lojas} datini={datainicial} datfim={datafinal} vendedoraN={chamaCliente} />}</Row>
              {/* Restante do conteúdo do modal */}
              <button id='fechaModal' className="modal-close-button" onClick={handleCloseModal}>{ativaResp ? '' : "Fechar"}</button>
            </Modal>
          </Card>
       
        </div>
      </div>
    </React.Fragment>
  );
}

export default MetasVendedorasGeral;
