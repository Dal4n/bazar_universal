import Swal from "sweetalert2";

const SearchInput = ({ searchValue = "", setSearchValue, onSearch }) => {
  const handleBusqueda = (event) => {
    setSearchValue(event.target.value);
  };

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

  return (
    <div className="input-group mb-3 mx-auto" style={{ maxWidth: "400px" }}>
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
