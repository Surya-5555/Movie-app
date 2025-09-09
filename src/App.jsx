import './css/App.css'
import Home from './pages/Home'
import {Routes , Route} from 'react-router-dom'
import Favourites from './pages/Favourites'
import NavBar from './components/NavBar'
import './css/App.css'
import {MovieProvider} from './contexts/MovieContext' // last step

function App() {

  return (
    <MovieProvider>  
    <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          
        </Routes>
      </main>
    </MovieProvider>  // last step
  )
}

export default App
