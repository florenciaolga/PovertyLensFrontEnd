import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowToUsePage from "./pages/HowToUsePage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;