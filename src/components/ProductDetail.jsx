import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import StarRating from "./StarRating";
import SearchInput from "./SearchInput";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/apiConfig";
import ImageSlider from "./ImageSlider";

const ProductDetail = () => {
  let [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();

  const handleSearch = (value) => {
    navigate(`/products/${value}`);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/producto/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener la información del producto.",
      });
    }
  };

  const fetchCompra = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/purchases`, data);
      setProduct(response.data);
    } catch (error) {
      console.error("Error al guardar el registro", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener la información del producto.",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handlePurchase = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas comprar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const now = new Date();
        const fechaHora = now.toISOString().slice(0, 19);

        fetchCompra({
          feRegistro: fechaHora,
          estado: "Completada",
          metodoPago: "Tarjeta",
          cantidadProductos: 1,
          total: product.price,
          producto: {
            id: product.id,
          },
        });
        Swal.fire({
          icon: "success",
          title: "¡Compra exitosa!",
          text: "Gracias por tu compra.",
        });

        navigate("/");
      }
    });
  };

  if (!product) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
        isVisible={true}
      />
      <div className="container text-center mt-5 card p-3">
        <ImageSlider images={product.images} />
        <h2 className="mt-3">{product.title}</h2>
        <h4 className="text-muted">{product.category.toUpperCase()}</h4>
        <p className="text-muted">{product.description}</p>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3">
          <span>
            <strong>Marca: </strong>
            {product.brand}
          </span>
          <span>
            <strong>Stock: </strong>
            {product.stock}
          </span>
          <span>
            <strong>
              <i>Descuento: </i>
              {product.discountPercentage}%
            </strong>
          </span>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3">
          <h3 className="mb-3 mb-sm-0">$ {product.price}.00</h3>
          <StarRating rating={product.rating} />
        </div>
        <button
          className="btn btn-outline-success mt-4"
          onClick={handlePurchase}
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
