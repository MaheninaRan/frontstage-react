import axios from 'axios';
import { index } from 'd3';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table,Modal } from 'react-bootstrap';
import './commande.css';
const Historique = () => {
  const [historique, setHistorique] = useState([]);
  const [selectedHistorique,setSelectedHistorique] = useState('');
  const [modalHistorique,setShowModalHistorique] = useState(false);

  const viewDetail =(histo)=>{
    setShowModalHistorique(true)
    setSelectedHistorique(histo)
  };
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };
  useEffect(()=>{
    axios.get('http://127.0.0.1:5000/client/historique_achat')
    .then(response =>{
        setHistorique(response.data);
    })
  }, []);

  return (
    <React.Fragment>        
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5"> Historique ahat</Card.Title>
            </Card.Header>
            <Card.Body>
              {historique.map((histo,index)=> (
                <Row key={index} style={{padding:'10px'}}>
                  <div className='offset-1 col-3 heureCommande'><b> {histo.date_achat} </b></div>
                  <div className='col-3 commande'> {histo.client_last_name} {histo.client_name}</div>
                  <div className='col-3 commande'> {formatNumber(histo.total)} Ar</div>
                  <div className='col-1'><i onClick={() => viewDetail(histo)} className='feather icon-info'></i></div>
               </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedHistorique && (
        <Modal show={modalHistorique} style={{color:'black'}} onHide={() => setShowModalHistorique(false)} centered>
          <Modal.Header closeButton className='modalHeader'>
            <Modal.Title>Detail commande </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBody'>
            <p><u>Ref :</u> {selectedHistorique.ref_commande}</p>
          <div className='row' >
              <div className='partie-gauche'>
                <p><b>Client : </b>{selectedHistorique.client_name} {selectedHistorique.client_last_name}  </p>
                <p><b>Date : </b> {selectedHistorique.date_achat}</p>
                <p><b>Livraison : </b> {selectedHistorique.date_livraison}</p>

              </div>
              <div className='partie-droite'>
                <h5><u>Produits</u></h5>
                {selectedHistorique.description.map((desc,index)=>(
                  <p>{desc.produit_nom} {desc.qte} pcs </p>
                ))}
                
                
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>Total : { formatNumber(selectedHistorique.total)} Ar </Modal.Footer>
        </Modal>
      )}

    </React.Fragment>
    
        
  );
};

export default Historique;
