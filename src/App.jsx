import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowToUsePage from "./pages/HowToUsePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;