import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Col, Row, Form } from "reactstrap";
import api from "../../api";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { ptBR } from 'date-fns/locale'
import "./metavendedorageralNEW.css";
import "react-datepicker/dist/react-datepicker.css";
import MenuSuperior from '../menuSuperior/MenuSuperior';
import MetasVendedorasGeral from '../metavendendorageralNEW/metavendedorageralgerencial';
import Modal from 'react-modal';

function MetasVendedorasGeralnew() {

  var loj = 0;

  const [selectDateIni, setSelectDateIni] = useState(null);

  const [selectDateFim, setSelectDateFim] = useState(null);

  const [progresso, setProgresso] = useState([]);

  const [progressoLoja, setProgressoLoja] = useState([]);

  const datainicial = moment(selectDateIni).format("YYYYMMDD")

  const datafinal = moment(selectDateFim).format("YYYYMMDD")

  const [mostrarMetaLoja, setMostrarMetaLoja] = useState(false);

  const [chamaLoja, setchamaLoja] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const [selectedStore, setSelectedStore] = useState(null);

  const [loading, setLoading] = useState(false);



  const [ativaResp, setAtivaResp] = useState(false)

  useEffect(()=>{
    if (window.matchMedia("(max-width: 767px)").matches){
      setAtivaResp(true)
    }
  })
  
  


  const handleOpenModal = (index, item) => {
    setLoading(true);

    setSelectedStore(item.loj_cod);
    setchamaLoja(item.loj_cod);

    // Simule um tempo de carregamento, substitua isso pela lógica real para carregar as informações do modal
    setTimeout(() => {
      // Suponha que 'modalData' contenha as informações do modal após o carregamento
      

      setLoading(false);
      
    }, 10000);

    console.log('Modal');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  const handleClick = (event, event2) => {
    console.log(event);
    console.log('Loja Clicada: ' + event2.loj_cod);
    setchamaLoja(event2.loj_cod);
    setMostrarMetaLoja(true);
  };

  function Parar() {
    console.log('Parar');
  }

  const onChange = selectDateIni => {
    setSelectDateIni(selectDateIni);
  }

  const onChange1 = selectDateFim => {
    setSelectDateFim(selectDateFim);
  }


  const MetaNew = useCallback(() => {
    api.get(`/metavendedorageralgerenciallojas/${datainicial}/${datafinal}/`).then(response => {
      const uniqueProgresso = response.data.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setProgresso(uniqueProgresso);
    })
  }, [datainicial, datafinal])

  return (
    <React.Fragment>
      <MenuSuperior />
      <Form>
        <div className="alinhamento mb-3">
          <h2 className="text-center">Acompanhamento De Metas Periódicas New</h2>
        </div>
        <Row className="d-flex justify-content-between">
          <Col sm={5} xs={12} id="dateInput">
            <DatePicker
              placeholderText='Data Inicial:'
              id="data"
              onChange={onChange}
              selected={selectDateIni}
              locale={ptBR}
              dateFormat="P"
              withPortal
              type='reset'
            />
          </Col>
          <div style={{ width: '1rem' }}></div>
          <Col sm={5} xs={12} id="dateInput1">
            <DatePicker
              placeholderText='Data Final:'
              id="data1"
              onChange={onChange1}
              selected={selectDateFim}
              locale={ptBR}
              dateFormat="P"
              withPortal
              type='reset'
            />
          </Col>
          <Col sm={2}>
            <Button id="botaosm" color="primary" onClick={MetaNew} > Filtrar </Button>
          </Col>
        </Row>
        <div className="MetaNew" >
          <Card>
            <div className="MetaNew_titulo" >
              <Row>
              {ativaResp ? <></> : <><Col className="col-titulo">
                  LOJA
                </Col>
                <Col className="col-titulo">
                  META
                </Col>
                <Col className="col-titulo">
                  TOTAL VENDA
                </Col>
                <Col className="col-titulo">
                  DIFENÇAS
                </Col>
                <Col className="col-titulo">
                  PERCENTUAL META
                </Col>
                <Col className="col-titulo mobile">
                  ATINGIU META
                </Col>
                <Col className="col-titulo mobile">
                  ATUALIZADO
                </Col> </>}
              </Row>
            </div>
            {/* progresso.map */}
            <div>
              <div>
                {progresso.map((item, index) => {
                  var loja = item.loj_cod;
                  loj = loja;
                  var dif = item.venda_total - item.diferenca_valor;
                  var atingiu = 'NÃO';
                  if (dif < item.venda_total) {
                    atingiu = 'SIM';
                  }
                  if (loja === 99) {
                    return null; // This will skip rendering the store with code 99
                  }

                  return (
                    <div>
                      <div className="principal" >
                          <Row className={`MetaNew_coluna loja${loja}`} style={{ 'height:': '30px' ,padding: 0,
                          'backgroundColor': item.falta_porcent < 100 ? '#FF8A80' : '#B9F6CA',
                          margin : ativaResp ? "auto" : 0 }} onClick={()=>handleOpenModal(index, item)}>
                            <Col  nome="0" className="loja" > {loja} </Col>

                            {ativaResp ? <div class="legenda">META</div> : <></>}
                            <Col  className=" dinheiro">{dif}</Col>
                            
                            {ativaResp? <div class="legenda">TOTAL VENDA</div> : <></>}
                            <Col  className=" dinheiro">{item.venda_total}</Col>
                            
                            {ativaResp? <div class="legenda">DIFENÇAS</div> : <></>}
                            <Col  className=" dinheiro diferenca">{item.diferenca_valor}</Col>
                            
                            {ativaResp? <div class="legenda">PERCENTUAL META</div> : <></>}
                            <Col  className="porcentagem">{item.falta_porcent}</Col>
                            
                            <Col className="mobile">{atingiu}</Col>
                            <Col className="mobile">{item.hora_atualiza.split(".")[0]}</Col> 
                          </Row>
                      </div>

                    </div>
                  );
                  
                })}
              </div>
              {showModal ? <div className="modal-content">
              <Modal isOpen={showModal} onRequestClose={handleCloseModal}  >
                {/* Conteúdo do modal */}
                <Row>{<MetasVendedorasGeral lojas={chamaLoja} datini={datainicial} datfim={datafinal} />}</Row>
                {/* Restante do conteúdo do modal */}
                <button id="fechaModal" className="modal-close-button" onClick={handleCloseModal}>{ativaResp ? '' : "Fechar"}</button>
              </Modal>
              </div>: <></>}
            </div>
            {/* progresso.map */}

          </Card >

          {/* Loading */}
          {loading && (
              <div class="loading-container">
              <div class="loading"></div>
            </div>
          )}
        </div>
      </Form>
    </React.Fragment>
  )
};

export default MetasVendedorasGeralnew;


