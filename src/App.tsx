import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import UserTable from './components/UserTable' // <-- Добавлено

function App() {
  return (
    <>
      <div>
        <a href="[https://vite.dev](https://vite.dev)" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="[https://react.dev](https://react.dev)" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Counter />
      <br />
      <UserTable /> {/* <-- Добавлено */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App