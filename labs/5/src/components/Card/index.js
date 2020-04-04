import React from 'react'
import './index.css'

class Card extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      temperature: 0,
      temperatureUnit: '',
      detailedForecast: ''
    };
  }

  render () {
    return (
      <div className="card">
        <h1 className="title">{this.props.name}</h1>
        <h1 className="temp">{this.props.temperature} {this.props.temperatureUnit}</h1>
        <p>{this.props.detailedForecast}</p>
      </div>
    )
  }
}

export default Card;