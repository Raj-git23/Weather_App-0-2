import React from 'react';
import Data from './components/img';
import Img from './components/data';
import './index.css';

function App() {
  
  return (
    <div className="bg-cover bg-center flex justify-center overflow-hidden">
      <Data className="shadow-2xl"/>
      <Img className="shadow-2xl"/>
    </div>
  );
}

export default App;
