import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const AccessDenied = () => {
return (
<Container>
<Row className="justify-content-md-center text-center mt-5">
<Col xs={12} md={8} lg={6} className="mx-auto">
<h1 className="display-4">Acesso Negado</h1>
<p className="lead">Você não tem permissão para acessar esta página.</p>
<Button color="primary" href="/metavendedoracliente">Voltar à página inicial</Button>
</Col>
</Row>
</Container>
);
};

export default AccessDenied;




