import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import './../../assets/css/commande.css';
import axios from 'axios';

const MouvementStock = () => {
  const [allMouvement, setMouvement] = useState([]);
  const [sortieMouvement, setSortieMouvement] = useState([]);
  const [entrerMouvement, setEntrerMouvement] = useState([]);
  const [activeKey, setActiveKey] = useState('today');

  const fetchData = async (choix) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/mouvementstock', { choix });
      if (choix === 0) {
        setMouvement(response.data);
      } else if (choix === 1) {
        setSortieMouvement(response.data);
      } else if (choix === 2) {
        setEntrerMouvement(response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData(0); // Charger les données pour le choix par défaut (allMouvement)
  }, []);

  const handleSelect = (key) => {
    setActiveKey(key);
    if (key === 'today') {
      fetchData(0);
    } else if (key === 'week') {
      fetchData(1);
    } else if (key === 'all') {
      fetchData(2);
    }
  };

  const renderTableRows = (data, showQteEntrer, showQteSortie) => (
    data.map((item, index) => (
      <tr key={index}>
        <td>{item.date}</td>
        <td>{item.produit_nom}</td>
        {showQteEntrer && <td>{item.qte_entrer}</td>}
        {showQteSortie && <td> -{item.qte_sortie}</td>}
      </tr>
    ))
  );

  return (
    <React.Fragment>
      <Row>
        <Col md={12} xl={12} className="user-activity">
          <Card>
            <Tabs
              activeKey={activeKey}
              onSelect={handleSelect}
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="today" title="Mouvement">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Qte_entrer</th>
                        <th>Qte_sortie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows(allMouvement, true, true)}
                    </tbody>
                  </Table>
              </Tab>
              <Tab eventKey="week" title="Sortie">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Qte_sortie</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows(sortieMouvement, false, true)}
                    </tbody>
                  </Table>
              </Tab>
              <Tab eventKey="all" title="Entrer">
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Qte_entrer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows(entrerMouvement, true, false)}
                    </tbody>
                  </Table>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MouvementStock;
