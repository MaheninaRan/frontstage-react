import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

const JWTLogin = () => {
  const valideLogin = (values) => {
    console.log("Login initiated with values:", values);
    
    // Décommentez et utilisez votre logique d'API ici
    const parametre = {
      login: values.email,
      password: values.password
    };
    console.log("parametre:", parametre);
    axios.post('http://127.0.0.1:5000/loginadmin', parametre)
      .then(response => {
        console.log("Reponse connexion : ", response.data);  
        if(response.data.statut===0){
            window.location.href="/demos/admin-templates/datta-able/react/free/app/dashboard/default";
        }else{
          alert('Erreur login');
        }
      })
      .catch(error => {
        console.error('Il y a eu un problème avec la requête API !', error);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        valideLogin(values); // Utilisez la fonction valideLogin ici
        setSubmitting(false); // Réinitialisez le statut d'envoi
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <input
              className="form-control"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
              >
                Signin
              </button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
