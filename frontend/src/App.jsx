
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Home from "./pages/home";

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Register' element={<Register />}></Route>
      </Routes>
     </BrowserRouter>
  )
}

export default App
