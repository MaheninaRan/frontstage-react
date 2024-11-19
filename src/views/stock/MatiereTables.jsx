import React,{ useEffect, useState }  from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';

const MatiereTables = () => {
  const [matiere, setMatiere] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/stockMatiere')
        .then(response => {
          setMatiere(response.data);
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête API !', error);
        });
  }, []);
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Stock MAMAMA</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Produit</th>
                    <th>Quantité</th>
                  </tr>
                </thead>
                <tbody>
                    {matiere.map((matieres, index) => (
                      <tr key={index}>
                        <td></td>
                          <td>{matieres.matiere_nom}</td> {/* Remplacez 'nom' par le nom du champ approprié */}
                          <td>{matieres.stock_rest} </td> {/* Remplacez 'prix' par le nom du champ approprié */}
                      </tr>
                    ))}                               
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
          
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default MatiereTables;
