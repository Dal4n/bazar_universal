import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import StarRating from "./StarRating";
import SearchInput from "./SearchInput";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/apiConfig";

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

  useEffect(() => {
    fetchProduct();
  }, {});

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
        // Muestra alerta de éxito si se confirma la compra
        Swal.fire({
          icon: "success",
          title: "¡Compra exitosa!",
          text: "Gracias por tu compra.",
        });
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
      />
      <div className="container text-center mt-5 card p-3">
        <div style={{ width: "100%", overflowX: "auto" }}>
          {product.images.map((img, index) => (
            <div
              key={index}
              className="m-3"
              style={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
                borderRadius: "50%",
                boxShadow: "0 0 15px 1px #c3c3c3",
              }}
            >
              <img
                src={img}
                alt="product"
                className="img-fluid border-rounded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

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
