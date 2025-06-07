import { BrowserRouter } from 'react-router-dom';
import Router from './Router.jsx';
import { useState, useEffect } from 'react';
import { Context, initialValue } from './context.js';
import axios from 'axios';
import { BACKEND_PORT } from "../backend.config.json";
import ErrorModal from './components/template/ErrorModal.jsx';

const App = () => {
  // initialise error modal state handling
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const openErrorModal = (message) => {
    setErrorMsg(message); 
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => setIsErrorModalOpen(false);

  // token and presentation context state handling
  const [token, setToken] = useState(initialValue.token);
  const [presentations, setPresentations] = useState(initialValue.presentations);

  const getters = {
    token,
    presentations
  };
  const setters = {
    setToken,
    setPresentations
  };

  // whenever token's value is updated and is defined, get user's presentations from the backend 
  // and set in frontend store (triggered by setToken)
  useEffect(() => {
    if (token) {
      axios.get(`http://localhost:${BACKEND_PORT}/store`, {
        headers: { Authorization: `Bearer ${getters.token}`}
      })
        .then((response) => {
          const fetchedPresentations = response.data.store.presentations || {};
          setPresentations(fetchedPresentations);
  
          // save presentations to local storage
          localStorage.setItem("presentations", JSON.stringify(fetchedPresentations));
        })
        .catch((err) => {
          openErrorModal("Error fetching store: ", err.message);
        });
    }
  }, [token]);

  // update local storage and backend whenever user's presentations change (triggered by setPresentations)
  useEffect(() => {
    if (token) {
      localStorage.setItem("presentations", JSON.stringify(presentations));
  
      axios.put(`http://localhost:${BACKEND_PORT}/store`, {
        store: { 
          presentations: presentations
        } 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .catch((err) => {
          openErrorModal("Error creating presentations: ", err.message);
        });
    }

  }, [presentations]);

  return (
    <>
      <Context.Provider value={{ getters, setters }}>
        <BrowserRouter>
          <Router />
          <ErrorModal
            errorMsg={errorMsg} 
            isModalOpen={isErrorModalOpen} 
            closeModal={closeErrorModal} 
          />
        </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App
