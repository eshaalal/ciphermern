import React from 'react';

import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  function onClickHandler(){
    setCount(count+1);
  }

  return (
    
      <div>
        <button onClick={onClickHandler}>count {count}</button>
       
        
      </div>
      
    
  )
}

export default App
