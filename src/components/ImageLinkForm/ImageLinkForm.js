import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ inputChangeHandler, submitHandler }) => {
  return (
    <div>
      <p className="f4 white">
        {"This magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={inputChangeHandler}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={submitHandler}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
