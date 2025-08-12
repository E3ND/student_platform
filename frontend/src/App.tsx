
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import './App.css'
import Home from './pages/Home'

function App() {
    useEffect(() => {
        setDefaultOptions({ locale: ptBR });
    }, [])

  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
