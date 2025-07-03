import React from 'react';
import Equipamentos from './pages/Equipamentos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Equipamentos />
      <ToastContainer />
    </div>
  );
}

export default App;