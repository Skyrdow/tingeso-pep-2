import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Reparations from "./pages/Reparations";
import Reports from "./pages/Reports";
import Prices from "./pages/Prices";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/Prices" element={<Prices />} />
        <Route path="/Reparations" element={<Reparations />} />
        <Route path="/Reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
