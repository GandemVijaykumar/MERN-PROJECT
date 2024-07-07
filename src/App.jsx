import { BrowserRouter,Routes,Route,} from 'react-router-dom';
import Home from './pages/Home';
import Signout from './pages/Signout';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import About from './pages/About';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/sign-out' element={<Signout/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/about' element={<About/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App