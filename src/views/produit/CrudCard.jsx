import React from 'react';
import './productcard.css';
import sary from './sary.jpg';

function CrudCard({ product, onClose }) {
    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='update-produit'>
                <div className='partie-gauche'>
                    <input type="text" placeholder='Nom' defaultValue={product.nom} /> <br /> <br />
                    <input type="text" placeholder='Prix' defaultValue={product.prix} /> <br /> <br />
                    <select name="" id="" defaultValue={product.categorie}>
                        <option value="categorie1">Categorie 1</option>
                        <option value="categorie2">Categorie 2</option>
                    </select> <br /> <br /> <br />
                    <button>Valider</button>
                </div>
                <div className='partie-droite'>
                    <img src={sary} alt="photo" />
                </div>
            </div>
        </div>
    );
}

export default CrudCard;
