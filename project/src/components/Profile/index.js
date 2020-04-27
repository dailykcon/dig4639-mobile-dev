import React from "react";
import "./styles.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      count: 0,
    };
  }

  addToCount = () => {
    let newcount = this.state.count + 1;
    this.setState({
      name: this.state.name,
      count: newcount,
    });
  };

  removeFromCount = () => {
    let newcount = this.state.count - 1;
    this.setState({
      name: this.state.name,
      count: newcount,
    });
  };

  componentDidMount() {
    window.fetch("http://plato.mrl.ai:8080/profile", {
        method: "GET",
        headers: {
          api: "connolly",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          name: data.name,
          count: data.count,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='banner profile'>
        PROFILE: {this.state.name}
        <br />
        CURRENT CONTACTS: {this.state.count}
      </div>
    );
  }
}

export default Profile;