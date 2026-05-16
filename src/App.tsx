import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AppGUI from './pages/AppGUI';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<AppGUI />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
