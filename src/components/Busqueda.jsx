import { useState } from "react";
import imglogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

const Busqueda = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    navigate(`/products/${value}`);
  };

  const handlePurchases = () => {
    navigate("/purchases");
  };

  return (
    <div className="text-center mt-5 d-flex justify-content-center align-items-center flex-column">
      <h1>Bazar Online</h1>
      <div
        className="m-4"
        style={{
          backgroundColor: "wheat",
          width: "100px",
          height: "100px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <img
          src={imglogo}
          alt="logo"
          className="img-fluid border-rounded"
          style={{
            width: "110%",
            height: "110%",
          }}
        />
      </div>

      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
      />

      <button
        className="btn btn-outline-warning mt-4"
        onClick={handlePurchases}
        style={{ width: "50%" }}
      >
        Compras
      </button>
    </div>
  );
};

export default Busqueda;
