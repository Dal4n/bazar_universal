import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/apiConfig";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/purchases`);
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
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
    <div className="container mt-5">
      <h2>Registered Purchases</h2>

      {purchases.length === 0 ? (
        <div className="text-center text-danger mt-3">
          <h3>No hay registros</h3>
        </div>
      ) : (
        <div className="row">
          {purchases.map((purchase, index) => (
            <div className="col-md-4 mt-3" key={index}>
              <div
                className="card mb-4 shadow-sm"
                style={{
                  position: "relative",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "60px",
                    height: "60px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                >
                  <img
                    src={purchase.producto.thumbnail}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bold", fontSize: "1.25rem" }}
                  >
                    {purchase.producto.title}
                  </h5>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Precio total: <strong>${purchase.total.toFixed(2)}</strong>
                  </p>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Fecha:{" "}
                    <strong>
                      {
                        new Date(purchase.feRegistro)
                          .toISOString()
                          .split("T")[0]
                      }
                    </strong>
                  </p>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Método de pago: <strong>{purchase.metodoPago}</strong>
                  </p>
                  <p
                    className="card-text text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Cantidad de productos:{" "}
                    <strong>{purchase.cantidadProductos}</strong>
                  </p>

                  {/* Estatus con fondo verde */}
                  <span
                    className="badge"
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "15px",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    {purchase.estado}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn btn-primary mt-3"
        onClick={handleBack}
        style={{ width: "40%" }}
      >
        Salir
      </button>
    </div>
  );
};

export default Purchases;
