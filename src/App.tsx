import { useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <div className="App">
      <Link to='/servc_assignment/pokemons'>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Click me to browse some Pokemons</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      </Link>
    </div>
  )
}

export default App
