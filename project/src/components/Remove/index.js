import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Remove extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = props.onClick;
    this.state = { position: props.position };
  }

  deleteContact = (event) => {
    event.preventDefault();
    window.fetch("http://plato.mrl.ai:8080/contacts/remove", {
        method: "POST",
        headers: {
          api: "connolly",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          position: this.state.position,
        }),
      })
      .then((response) => response.json())
      .then(() => {
        this.onClick(this.state.position);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button
          className=' delete btn btn-outline-warning button'
          onClick={this.deleteContact}
        >
          x
        </button>
      </div>
    );
  }
}

Remove.propTypes = {
  onClick: PropTypes.func,
};

export default Remove;