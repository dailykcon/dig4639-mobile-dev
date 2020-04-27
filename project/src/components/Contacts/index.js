import React from "react";
import Add from "../Add/index.js";
import Remove from "../Remove/index.js";
import Profile from "../Profile/index.js";
import "./styles.css";

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
    this.profileRef = React.createRef();
  }

  contactAdded = (name, number) => {
    let newcontacts = this.state.contacts;
    let added = {
      name: name,
      number: number,
    };
    newcontacts.push(added);
    this.setState(newcontacts);
    this.profileRef.current.addToCount();
  };

  contactDeleted = (position) => {
    let newcontacts = this.state.contacts;
    newcontacts.splice(position, 0);
    newcontacts.pop();
    this.setState(newcontacts);
    this.profileRef.current.removeFromCount();
  };

  componentDidMount() {
    window.fetch("http://plato.mrl.ai:8080/contacts", {
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
          contacts: data.contacts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='contacts'>
        <Profile ref={this.profileRef} />
        <Add onSubmit={this.contactAdded} />
        {this.state.contacts.map((value, index) => {
          return (
            <div class='card'>
            <div className='box' key={index}>
              <p className='p'>
                Name: {value.name}
                <br />
                Number: {value.number}
              </p>
              <Remove onClick={this.contactDeleted} position={index} />
                <br />
            </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Contacts;