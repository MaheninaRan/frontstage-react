import React from 'react';
import { Row, Col,Card } from 'react-bootstrap';


const SamplePage = () => {
  return (
    
    <React.Fragment>
          <Card>
            <Card.Header>
                <Card.Title as="h5">Contact</Card.Title>
            </Card.Header>
            <Card.Body>
            <Row>       
                <Col md={5} xl={3}>
                  <Card className="card-social">
                    <Card.Body className="border-bottom">
                      <div className="row align-items-center justify-content-center">
                          <div className="col-auto">
                            <i className="fab fa-facebook-f text-primary f-36" />
                          </div>
                      </div> <br />
                      <div className="row align-items-center justify-content-center card-active">
                        <div className="col-12">
                          <h6 className="text-center">RM <br /> Randrianjanahary</h6>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={5} xl={3}>
                  <Card className="card-social">
                    <Card.Body className="border-bottom">
                      <div className="row align-items-center justify-content-center">
                          <div className="col-auto">
                            <i className="fab fa-google-plus-g text-c-green f-36" />
                          </div>
                      </div> <br /><br />
                      <div className="row align-items-center justify-content-center card-active">
                        <div className="col-12">
                          <h6 className="text-center">RM@gmail.com <br /> </h6>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
        </Row>
            </Card.Body>
          </Card>
    </React.Fragment>
  );
};

export default SamplePage;
