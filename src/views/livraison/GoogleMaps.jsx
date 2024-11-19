import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import InfoBox from './google-maps/InfoBox';
import MarkerClusterer from './google-maps/MarkerClusterer';
import Marker from './google-maps/Marker';
import StreetViewPanorma from './google-maps/StreetViewPanorma';

const GoogleMaps = () => {
  return (
    <React.Fragment>
      <Row>
       
          <Card>
            <Card.Header>
              <Card.Title as="h5">RANDRIANJANAHARY Rado <i>Today 15:00 PM</i> </Card.Title>
            </Card.Header>
             <div >
                <p><b>Produit : </b> Coussin <br /> 
                <b>Date commande : </b> 20-Juin-2024 <br />
                <b>Livraison  : </b> dans 1h30min <br />
                <b>Trajet  : </b> Andoharanofotsy-Tanjombato

                </p>
               

             </div>
            <Card.Body>
              <Marker />
            </Card.Body>
          </Card>
        
        
        
      </Row>
    </React.Fragment>
  );
};

export default GoogleMaps;
