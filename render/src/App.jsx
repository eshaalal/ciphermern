import { useState } from 'react'

import './App.css'

function App() {
  
  return (
    <div>
      
      <h1>My name is raman</h1>
      <StopRender />
    </div>
  )
}
  function StopRender(){
    const [name, setName] = useState("Esha");
    const onClick = () => {
      const randomNumber = Math.floor(Math.random() * 100); // Generates a random number between 0 and 99
      setName(randomNumber.toString()); // Updates the name state with the random number
    };
    return (
    <div>
      <button onClick={onClick}>click me to change</button>
      <h1>my name is {name}</h1>
    </div>
    );
  }


export default App
