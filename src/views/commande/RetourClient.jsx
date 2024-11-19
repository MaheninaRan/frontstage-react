import React from 'react';
import { Row, Col, Card, Table,Tabs, Tab } from 'react-bootstrap';
import './../../assets/css/commande.css';
import { Link } from 'react-router-dom';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

const dataAll = [
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "Vous avez fait une erreur sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "J'ai une correction sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "Vous avez fait une erreur sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "Vous avez fait une erreur sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
];
const dataCorriger = [
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "J'ai une correction sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
];
const dataErreur = [
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "Vous avez fait une erreur sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
  {
    name: "Julie Vad",
    time: "Today 16:00 PM",
    message: "Vous avez fait une erreur sur le produit que j'ai commander, j'ai commander un coussin de couleur blue mais pas blanc",
    avatar: avatar2
  },
];

const RetourClient = () => {
    const tabAll = (
      <React.Fragment> <br />
        <Row className='boiteRetour'>
        {dataAll.map((item, index) => (
          <Col key={index}  className='boiteBoucle'>
            <div className='row'>
              <div className='col-4'>
                <img className="rounded-circle" style={{ width: '40px' }} src={item.avatar} alt="activity-user" />
              </div>
              <div className='col-8'>
                <h6 className="m-0 d-inline"><b>{item.name}</b> <br /> <i style={{fontSize:'12px'}}>{item.time}</i> </h6>
              </div> 
            </div> <br />
            <div className='row'>
              {item.message}
            </div> <br />
            <div className='row'><button className='button-60'>Lu <i className='feather icon-check-circle' style={{marginLeft:'10px'}}></i> </button></div>
          </Col>
        ))}
      </Row>
      </React.Fragment>
    );
    const tabErreur = (
      <React.Fragment> <br />
        <Row className='boiteRetour'>
        {dataErreur.map((item, index) => (
          <Col key={index}  className='boiteBoucle'>
            <div className='row'>
              <div className='col-4'>
                <img className="rounded-circle" style={{ width: '40px' }} src={item.avatar} alt="activity-user" />
              </div>
              <div className='col-8'>
                <h6 className="m-0 d-inline"><b>{item.name}</b> <br /> <i style={{fontSize:'12px'}}>{item.time}</i> </h6>
              </div> 
            </div> <br />
            <div className='row'>
              {item.message}
            </div> <br />
            <div className='row'><button className='button-60'>Lu <i className='feather icon-check-circle' style={{marginLeft:'10px'}}></i> </button></div>
          </Col>
        ))}
      </Row>
      </React.Fragment>
    );
    const tabCorriger = (
      <React.Fragment> <br />
        <Row className='boiteRetour'>
        {dataCorriger.map((item, index) => (
          <Col key={index}  className='boiteBoucle'>
            <div className='row'>
              <div className='col-4'>
                <img className="rounded-circle" style={{ width: '40px' }} src={item.avatar} alt="activity-user" />
              </div>
              <div className='col-8'>
                <h6 className="m-0 d-inline"><b>{item.name}</b> <br /> <i style={{fontSize:'12px'}}>{item.time}</i> </h6>
              </div> 
            </div> <br />
            <div className='row'>
              {item.message}
            </div> <br />
            <div className='row'><button className='button-60'>Lu <i className='feather icon-check-circle' style={{marginLeft:'10px'}}></i> </button></div>
          </Col>
        ))}
      </Row>
      </React.Fragment>
    );
    return(
      <React.Fragment>
        <Row>
        <Col md={12} xl={12} className="user-activity">
          <Card>
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="ALL">
                {tabAll}
              </Tab>
              <Tab eventKey="week" title="Correction">
                {tabErreur}
              </Tab>
              <Tab eventKey="all" title="Erreur">
                {tabCorriger}
              </Tab>
            </Tabs>
          </Card>
        </Col>
        </Row>
      </React.Fragment>
    );
};

export default RetourClient;
