
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { useEffect } from 'react';
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import './App.css'
import Home from './pages/Home'
import { UserProvider } from './context/UserProvider';
import Login from './pages/login';
import Register from './pages/register';
import { ReloadProvider } from './context/reloadProvider';

function App() {
    useEffect(() => {
        setDefaultOptions({ locale: ptBR });
    }, [])

  return (
    <>
    <Router>
      <UserProvider>
        <ReloadProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ReloadProvider>
      </UserProvider>
    </Router>
    </>
  )
}

export default App
