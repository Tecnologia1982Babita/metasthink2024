import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Progress } from 'reactstrap';

const SalesBySellers = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3333/metavendedoracliente/20230117/20230117/4/44');
      setSales(result.data);
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        {sales.map(sale => (
          <Col key={sale.cpf_cnpj} xs="12" md="6">
            <p>{sale.clientes_nome}: {sale.venda}</p>
            <Progress value={sale.venda} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SalesBySellers;
