import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Add extends React.Component {

  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.numberRef = React.createRef();
    this.onSubmit = props.onSubmit;
  }

  getInput = (event) => {
    event.preventDefault();
    let name = this.nameRef.current.value.trim();
    let number = this.numberRef.current.value.trim();
    if (name.length > 0 && number.length > 0) {
      window.fetch("http://plato.mrl.ai:8080/contacts/add", {
          method: "POST",
          headers: {
            api: "connolly",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name,
            number: number,
          }),
        })
        .then((response) => response.json())
        .then(() => {
          this.onSubmit(name, number);
        })
        .catch((err) => {
          console.log(err);
        });

      this.nameRef.current.value = "";
      this.numberRef.current.value = "";
    }
  };

  render() {
    return (
      <div id='add'>
        <br />
            <form className='form' onSubmit={this.getInput}>
                <h1>NEW CONTACT</h1>
                <input type='text' placeholder='Enter a name' ref={this.nameRef} />
                <br /><br />
                <input type='text' placeholder='Enter a number' ref={this.numberRef} />
                <br /><br />
              <button className='button'>Add Contact</button>
              </form>
              <br />
            </div>
    );
  }
}

Add.propTypes = {
  onSubmit: PropTypes.func,
};

export default Add;