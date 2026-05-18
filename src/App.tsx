import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppGUI from './pages/AppGUI';
import Success from './pages/Success';
import Activate from './pages/Activate';
import Admin from './pages/Admin';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Only track once per session
    if (!sessionStorage.getItem('ed_visited')) {
      fetch('/api/track_visit', { method: 'POST' }).catch(() => {});
      sessionStorage.setItem('ed_visited', 'true');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/app"     element={<AppGUI />}  />
        <Route path="/success" element={<Success />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/admin"   element={<Admin />}   />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms"   element={<Terms />}   />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
