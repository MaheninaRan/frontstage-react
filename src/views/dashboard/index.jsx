import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import Cardmeilleur from './Cardmeilleur';


const DashDefault = () => {
  
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const [dashboard, setChiffreAffaire] = useState({});
  useEffect(() =>{
    axios.get('http://127.0.0.1:5000/admin/dashboard')
        .then(response =>{
          console.log(response.data);
          setChiffreAffaire(response.data);
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête API !', error);
        });
  }, []);

  

  const [meilleursbyachat, setMeilleurByachat] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/client/bestbypurchase')
        .then(response => {
          setMeilleurByachat(response.data);
          console.log(response.data)
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête API !', error);
        });
  }, []);

  const [meilleursbypoint, setLeilleurBypoint] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/client/bestpoint')
        .then(response => {
          setLeilleurBypoint(response.data);
          console.log(response.data)
        })
        .catch(error => {
            console.error('Il y a eu un problème avec la requête API !', error);
        });
  }, []);

  const dashSalesData = [
    { title: 'Chiffre d\'affaire', amount: formatNumber(40404040404), icon: 'icon-arrow-up text-c-green' },
    { title: 'Benefice', amount: '0 Ar', icon: 'icon-arrow-down text-c-red', value: 36, class: 'progress-c-theme2' },
    { title: 'Perte', amount: '0 Ar', icon: 'icon-arrow-up text-c-green', value: 70, color: 'progress-c-theme' }
  ];
  
  return (
    <React.Fragment>
      <Row>
        {dashSalesData.map((data, index) => {
          return(
            <Col key={index} xl={6} xxl={4}> 
              <Card>
                <Card.Body>
                  <h6 className="mb-4">{data.title}</h6>
                  <div className="row d-flex align-items-center" >
                    <div className="col-9">
                      <h3 className="f-w-300 d-flex align-items-center m-b-0">
                        <i className={`feather ${data.icon} f-30 m-r-5`} /> {data.amount}
                      </h3>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Col md={12} xl={12}>
          <Card className="Recent-Users widget-focus-lg">
            <Card.Header>
              <Card.Title as="h5">Meileurs client</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Par achat">
                  {meilleursbyachat.map((meilleur, index) => (
                    <Cardmeilleur key={index} nom={meilleur.users_client_last_name} prenom={meilleur.users_client_name} amount={meilleur.totalachat} unite="Ariary"/>
                  ))}
              </Tab>
              <Tab eventKey="week" title="Par point">
                  {meilleursbypoint.map((meilleur, index) => (
                    <Cardmeilleur key={index} nom={meilleur.users_client_last_name} prenom={meilleur.users_client_name} amount={meilleur.point} unite="points"/>
                  ))}
              </Tab>
            </Tabs>
            </Card.Body>
          </Card>
        </Col>  
        
      </Row>
    </React.Fragment>
  );
};

export default DashDefault;
