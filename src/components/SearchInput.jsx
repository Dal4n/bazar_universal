import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SearchInput = ({
  searchValue = "",
  setSearchValue,
  onSearch,
  isVisible,
}) => {
  const handleBusqueda = (event) => {
    setSearchValue(event.target.value);
  };

  const navivate = useNavigate();

  const handleBuscar = () => {
    if (searchValue.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "¡Error!",
        text: "Por favor, ingrese un valor de búsqueda.",
      });
    } else {
      onSearch(searchValue);
    }
  };

  const handleNavitage = () => {
    navivate("/");
  };

  return (
    <div className="input-group mb-3 mx-auto" style={{ maxWidth: "100%" }}>
      {isVisible ? (
        <button
          className="btn btn-outline-secondary mx-3"
          onClick={handleNavitage}
        >
          Volver Inicio
        </button>
      ) : (
        <></>
      )}

      <input
        type="text"
        className="form-control"
        placeholder="Buscar producto"
        value={searchValue}
        onChange={handleBusqueda}
      />
      <button className="btn btn-primary" onClick={handleBuscar}>
        Buscar
      </button>
    </div>
  );
};

export default SearchInput;
