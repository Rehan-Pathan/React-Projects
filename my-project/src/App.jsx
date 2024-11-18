// src/App.js
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Team from './components/Team'
import User from './components/User'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <nav className="bg-black text-white p-4 flex justify-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/user/:id" className="hover:text-gray-300">User info</Link>

        </nav>
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} >
              <Route path="team" element={<Team />} />
            </Route>
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
