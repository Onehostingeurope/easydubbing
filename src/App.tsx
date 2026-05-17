import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppGUI from './pages/AppGUI';
import Success from './pages/Success';
import Activate from './pages/Activate';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/app"     element={<AppGUI />}  />
        <Route path="/success" element={<Success />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/admin"   element={<Admin />}   />
      </Routes>
    </Router>
  );
}

export default App;
