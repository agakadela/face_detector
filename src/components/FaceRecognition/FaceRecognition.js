import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageURL}
          alt={imageURL ? "face to recognize" : null}
          width="500px"
          height="auto"
        />
        {box ? (
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol
            }}
          ></div>
        ) : null}
      </div>
    </div>
  );
};

export default FaceRecognition;
