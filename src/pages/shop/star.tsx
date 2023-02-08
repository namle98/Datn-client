import React from "react";
import StarRating from "react-star-ratings";

function Star({ starClick, numberOfStars }: any) {
  return (
    <>
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </>
  );
}

export default Star;
