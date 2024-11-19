import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import PieBasicChart from './chart/PieBasicChart';
import GroupedColumnChart from './chart/GroupedChart';

const Nvd3Chart = () => {
  return (
    <>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">
                <Row>
                  <Col xl={5}>Produit par mois</Col>
                  <input type="text" className='col-4' />
                  <Col xl={2}><button>Valider</button></Col>
                </Row>
                </Card.Title>
            </Card.Header>
            <Card.Body>
              <GroupedColumnChart />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Static produit</Card.Title>
            </Card.Header>
            <Card.Body className="text-center">
              <PieBasicChart />
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </>
  );
};

export default Nvd3Chart;
