
import './App.css'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Login from './component/Login/Login'
import Domain from './component/Domain/Domain'
import Question from './component/Question/Question'
function App() {
  
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/domain' element={<Domain/>}/>
    <Route path='/question' element={<Question/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
