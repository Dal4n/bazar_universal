import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchInput from "./SearchInput";
import StarRating from "./StarRating";
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

const ProductList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(search);
    if (search) {
      axios
        .get(`${API_BASE_URL}/productos/${search}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [search]);

  const handleSearch = (value) => {
    navigate(`/products/${value}`);
  };

  const handleDetails = (value) => {
    navigate(`/product/${value}`);
  };

  return (
    <div className="container">
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
      />
      <h3 className="text-center mb-3">
        Resultados de la búsqueda de {search}: {products.length}
      </h3>
      <div className="row">
        {products.map((product) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
            key={product.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleDetails(product.id)}
          >
            <div className="card d-flex flex-column align-items-center">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body text-center">
                <h5
                  className="card-title"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                >
                  {product.title}
                </h5>
                <p className="card-text text-muted">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="card-text">
                    <strong>${product.price}</strong>
                  </h4>
                  <StarRating rating={product.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
