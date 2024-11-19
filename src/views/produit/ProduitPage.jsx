import React, { useState, useEffect } from 'react';
import { Modal, Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Historique = () => {
  const [produits, setProduits] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showSearch,setSearchModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showModaldelete,setShowModaldelete] = useState(null);
  const [nom, setNom] = useState('');
  const [nom_search,setNomSearch] = useState('');
  const [prix, setPrix] = useState('');
  const [produit_prix_min, setPrixmin] = useState('');
  const [produit_prix_max, setPrixmax] = useState('');
  const [categories, setCategories] = useState([]);
  const [categorieselect, setCategorieSelect] = useState('');
  const [categorie_search, setCategorieSearch] = useState(0);
  const searchClose = () => setSearchModal(false);
  const deleteClose= () => setShowModaldelete(false);
  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };

  const fechData=()=>{
    axios.get('http://127.0.0.1:5000/produit/all')
    .then(response => {
      setProduits(response.data);
    })
    .catch(error => {
      console.error('Il y a eu un problème avec la requête API !', error);
    });
    axios.get('http://127.0.0.1:5000/produit/categorie')
    .then(response => {
      const data = JSON.parse(JSON.stringify(response.data));
      data.unshift({"id": "0", "nom": "Tout"});
      setCategories(data);      
    })
    .catch(error => {
      console.error('Il y a eu un problème avec la requête API !', error);
  });
  };
  useEffect(() => {
    fechData();
  }, []);

  

  const handleSaveChanges = () => {
    const updatedProduct = {
      ...selectedProduct,
      nom,
      prix: parseFloat(prix.replace(' Ar', '').trim()),
      id_categorie: categorieselect
    };

    axios.put(`http://127.0.0.1:5000/produit/update/${selectedProduct.id}`, updatedProduct)
      .then((response) => {
        console.log('Produit mis à jour avec succès:', response.data);
        setProduits(produits.map(p => p.id === selectedProduct.id ? response.data : p)); // Utiliser la réponse pour mettre à jour les produits
        handleClose();
        fechData();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du produit:', error);
      });
  };

  const handleDelete = () =>{    
    console.log("produit tong : ", selectedProduct);
    axios.delete(`http://127.0.0.1:5000/produit/delete/${selectedProduct.id}`)
    .then((response) => {
      fechData();
      deleteClose();
    })
    .catch((error) => {
      console.error('Erreur lors du delete:', error);
    });

  }

  const handleShow = (product) => {
    setSelectedProduct(product); // Stocke le produit sélectionné
    setNom(product.nom);
    setPrix(product.prix + " Ar"); // Affiche le prix avec "Ar"
    setCategorieSelect(product.categorie_id); // Assigner l'ID de la catégorie
    setShowModal(true);
  };

  const showDelete=(product)=>{
    setSelectedProduct(product);
    setShowModaldelete(true)
  }
  

  const searchProduct = () =>{
    const search = {
      categorie_search:parseInt(categorie_search),
      produit_nom:nom_search,
      produit_prix_min:parseInt(produit_prix_min.trim()),
      produit_prix_max:parseInt(produit_prix_max.trim()),
    };
    console.log("Valeur search:", search)
    axios.post(`http://127.0.0.1:5000/produit/recherche`, search)
      .then((response) => {
        setProduits(response.data);
        searchClose();
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour du produit:', error);
    });
    setCategorieSearch(0);
    setNomSearch('');
    setPrixmin('');
    setPrixmax('');
  }
  const handleClose = () => setShowModal(false);

  const handlechangeCategorie = (e) => {
    let id = e.target.value;
    setCategorieSearch(id);
  };
  
  const handleImageChange = (event) => {
    console.log("Tonga upload")
    const file = event.target.files[0];
    console.log("File name:", file.name)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return(
    <div className="container">

      {selectedProduct && (
        <Modal show={showModaldelete} onHide={() => setShowModaldelete(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger"><i class="fas fa-exclamation-triangle"></i> Voulez-vous vraiment effacer <b>{selectedProduct.nom}</b> ? </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">Cette action est irréversible. Voulez-vous continuer ?  </p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <button className="btn btn-danger mx-2" onClick={handleDelete}>Valider</button>
            <button className="btn btn-secondary mx-2" onClick={() => setShowModaldelete(false)}>Annuler</button>
          </Modal.Footer>
        </Modal>
      )}

      <Button onClick={()=> setSearchModal(true)}>Recherche</Button>
      <Modal show={showSearch} onHide={() => setSearchModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Recherche avancée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col xs={12} md={{ span: 8, offset: 2 }}>
              <div className="mb-3">
                <label className="form-label">Catégorie :</label>
                <select value={categorie_search} onChange={handlechangeCategorie} name="categorie" className='form-select'>
                  {categories.map((categ, index) => (<option key={index} value={categ.id}>{categ.nom}</option>))}
                </select>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={{ span: 8, offset: 2 }}>
              <div className="mb-3">
                <label className="form-label">Nom :</label>
                <input className='form-control' type="text" placeholder='nom_produit' value={nom_search} onChange={(e) => setNomSearch(e.target.value)}/>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={{ span: 8, offset: 2 }}>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <label className="form-label">Prix min :</label>
                  <input className='form-control' type="text" placeholder='prix_min' value={produit_prix_min} onChange={(e) => setPrixmin(e.target.value)}/>
                </div>
                <div className="ms-2">
                  <label className="form-label">Prix max :</label>
                  <input className='form-control' type="text" placeholder='prix_max' value={produit_prix_max} onChange={(e) => setPrixmax(e.target.value)}/>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <button className='btn btn-primary' onClick={searchProduct}> Valider</button>
        </Modal.Footer>
      </Modal>

      {selectedProduct && (
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header className='modalHeaderEdit' closeButton>
            <Modal.Title >Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='partie-gauche'>
                <input type="text" placeholder='Nom' value={nom} onChange={(e) => setNom(e.target.value)}/> <br /> <br />
                <input type="text" placeholder='Prix'value={prix} onChange={(e) => setPrix(e.target.value)}/> <br /> <br />
                <Button className='updateButton' onClick={handleSaveChanges}>Valider</Button>
              </div>
              <div className='partie-droite'>
                <img className='modifStyle' src={selectedProduct.image} alt="photo" onClick={handleImageClick}/>
                <input 
                  type="file" 
                  id="imageUpload" 
                  style={{ display: 'none' }} 
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <marquee behavior="" direction="">Modification du produit <b>{selectedProduct.nom}</b></marquee>
          </Modal.Footer>
        </Modal>
      )}

        

      <div className="boiteProduit">
        {produits.map((produit, index) => (
          <ProductCard
            key={index}
            imageSrc={produit.image}
            description={produit.nom}
            rating={4}
            price={produit.prix}
            discount={produit.discount}
            news={produit.news}
            onEdit={() => handleShow(produit)}
            forDelete={() => showDelete(produit)}
          />
        ))}
      </div>
    </div>
  );
};

export default Historique;
