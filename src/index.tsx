import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
register();

async function register() {
  //console.log("Registering service worker");
  
  if ('serviceWorker' in navigator) {
    try {
      // Change the service worker URL to see what happens when the SW doesn't exist
      const registration = await navigator.serviceWorker.register("./sw.js");
      //console.log("Service worker registered: ", registration);
      if (registration.installing) {
        //console.log('Service worker installing');
      } else if (registration.waiting) {
        //console.log('Service worker installed');
      } else if (registration.active) {
        //console.log('Service worker active');
      }
       
    } catch (error) {
      //console.log("Error while registering: " + (error as Error).message);
    }    
  } else {
    //console.log("Service workers API not available");
  }
}; 