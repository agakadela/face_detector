import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Clarifai from "clarifai";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "ac5546da7b744b68839e879cfd5ab33c"
});

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
  state = {
    input: "",
    imageURL: "",
    box: "",
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    }
  };

  componentDidMount() {
    fetch("http://localhost:3000")
      .then(response => response.json())
      .then(data => console.log(data));
  }

  inputChangeHandler = event => {
    this.setState({
      input: event.target.value
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    this.setState({ box });
  };

  submitHandler = () => {
    this.setState({
      imageURL: this.state.input
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count =>
              this.setState({
                user: {
                  entries: count
                }
              })
            );
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({
      route
    });
  };

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <React.Fragment>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              inputChangeHandler={this.inputChangeHandler}
              submitHandler={this.submitHandler}
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </React.Fragment>
        ) : route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
