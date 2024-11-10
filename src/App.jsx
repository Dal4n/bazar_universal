import ProductList from "./components/ProductList";
import Busqueda from "./components/Busqueda";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetail from "./components/ProductDetail";
import Purchases from "./components/Purchases";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="m-3 d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<Busqueda />} />
          <Route
            path="/products/:search"
            element={<ProductList search="Mascara" />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
