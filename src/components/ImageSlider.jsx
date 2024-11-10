import { Carousel } from "react-bootstrap";
import "./ImageSlider.css";

const ImageSlider = ({ images = [] }) => {
  return (
    <div>
      <Carousel interval={2000}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <div
              key={index}
              className="d-flex jusity-content-center align-items-center flex-column"
            >
              <div
                className="m-3 shadow"
                style={{
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                  borderRadius: "20%",
                }}
              >
                <img
                  src={image}
                  alt="product"
                  className="img-fluid border-rounded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
