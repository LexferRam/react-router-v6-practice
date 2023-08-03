import { useState } from 'react';
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Admin, Analitycs, Dashboard, Home, LandingPage } from './pages';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {

  const [user, setUser] = useState<any>(null)

  const login = () => {
    setUser({
      id: 1, 
      username: 'user', 
      permissions: ['analize']
    })
  }

  const logout = () => setUser(null)

  return (
    <BrowserRouter>
      <Navigation />

      {
        user ? (
            <button onClick={logout}>Logout</button>
        ) : (
            <button onClick={login}>Login</button>
        )
      }
      
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />

        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        <Route path='/analitics' element={
          <ProtectedRoute 
            isAllowed={!!user && user.permissions.includes('analize')} 
          >
            <Analitycs />
          </ProtectedRoute>
        } />
        
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

function Navigation() {
  return(
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analitics">Analitics</Link>
        </li>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
      </ul>
    </nav>
  )
}

export default App
