import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppGUI from './pages/AppGUI';
import Pricing from './pages/Pricing';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        {/* The beautiful Marketing Landing Page for easydubbing.uk */}
        <Route path="/" element={<Home />} />
        
        {/* The actual AI Dubbing Tool Interface */}
        <Route path="/app" element={<AppGUI />} />

        {/* Pricing Details */}
        <Route path="/pricing" element={<Pricing />} />

        {/* Success Page */}
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
