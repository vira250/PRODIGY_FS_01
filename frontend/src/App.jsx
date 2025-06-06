
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Register from './pages/Register'
import Home from "./pages/home";
import Login from './pages/Login'

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/register" replace />} />
        <Route path='/home' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
     </BrowserRouter>
  )
}

export default App
