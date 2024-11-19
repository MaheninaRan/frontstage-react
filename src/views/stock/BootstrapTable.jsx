import React, { useEffect, useState }  from 'react';
import { Row, Col, Card, Table,Modal,Dropdown  } from 'react-bootstrap';
import axios from 'axios';
import './stock.css';

const BootstrapTable = () => {
  const [selectedProduct,setSelectedProduct] = useState('');
  const [produits, setProduits] = useState([]);
  const [modalProduct,setShowModalProduct] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState('');

  const showmodalProduct =(product)=>{
    setShowModalProduct(true)
    setSelectedProduct(product)
  }

  const options = [
    { id: 0, label: 'Trier par nom' },
    { id: 1, label: 'Trier par quantite' },
    { id: 2, label: 'Trier par prix' }
  ];

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/stockProduit')
        .then(response => {
            setProduits(response.data);
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête API !', error);
        });
  }, []);
  


  const valideSearch = () =>{
    const data = {
      produit_nom:search
    }
      axios.post('http://127.0.0.1:5000/stockrecherche', data)
      .then(response =>{
          setProduits(response.data);
      })
  };

  const changeOption = (val) =>{
    const data = {
      option:val.toString()
    }
      axios.post('http://127.0.0.1:5000/stockoption', data)
      .then(response =>{
        console.log("Reponse : " , response.data);
          setProduits(response.data);
      })
      
  };

  const handleToggle = () => {
    setShowDropdown(!showDropdown)
  
  };
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col md={3}><Card.Title as="h5">Stock produit</Card.Title></Col>
                <Col md={1}></Col>
                <input style={{height:'30px'}} value={search} onChange={(e) => setSearch(e.target.value)} className='col-md-2 col-5' type="text" />
                <Col md={1} xs={3}><button onClick={valideSearch}>valider</button></Col>
                <Col md={3} xs={2}></Col>
                <Col md={2}>
                <Dropdown show={showDropdown} onToggle={handleToggle}>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" onClick={handleToggle}>
                      Option <i className='fas fa-sort-amount-up'></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {options.map(option => (
                      <Dropdown.Item key={option.id} onClick={() => changeOption(option.id)}> {option.label} </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                  
                  </Col>
              </Row>

            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantite</th>
                    <th>Total prix</th>

                  </tr>
                </thead>
                <tbody>
                    {produits.map((produit, index) => (
                        <tr key={index} onClick={() => showmodalProduct(produit)}>
                            <td>{produit.produit_nom}</td>
                            <td>{produit.stock_rest} </td>
                            <td>{produit.total_prix} </td>
                        </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {selectedProduct && (
        <Modal show={modalProduct} onHide={() => setShowModalProduct(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Aperçu du produit {selectedProduct.produit_nom} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className='row'>
              <div className='partie-gauche'>
                <p><b>Prix : </b>{selectedProduct.produit_prix}</p>
                <p><b>Marque : </b> {selectedProduct.marque}</p>
                <p><b>Taille : </b> {selectedProduct.taille}</p>

              </div>
              <div className='partie-droite'>
                <img className='appercuImage' src={selectedProduct.produit_image} alt="photo"/>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default BootstrapTable;
