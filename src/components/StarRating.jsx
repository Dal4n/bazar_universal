import ReactStars from "react-rating-stars-component";

const StarRating = ({ rating = 0, size = 24 }) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      size={30}
      isHalf={true}
      activeColor="#ffd700"
      edit={false}
      classNames={"p-0"}
    />
  );
};

export default StarRating;
