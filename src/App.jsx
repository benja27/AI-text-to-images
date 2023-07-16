import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import TextToImg from './components/TextToImg'
import './App.css'

function App() {
  

  return (
    <div style={{color:"white", overflowX:"hidden"}} className='min-vh-100' >
      <Navbar></Navbar>
      <TextToImg></TextToImg>
    </div>
        
  )
}

export default App
