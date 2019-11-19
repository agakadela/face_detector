import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 360,
      density: {
        enable: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      random: true,
      speed: 1,
      direction: "top",
      out_mode: "out"
    }
  }
};
class App extends React.Component {
  state = { input: "" };

  inputChangeHandler = event => {
    console.log(event);
  };

  submitHandler = () => {
    console.log("click");
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          inputChangeHandler={this.inputChangeHandler}
          submitHandler={this.submitHandler}
        />
        {/* 
      <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
