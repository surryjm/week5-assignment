import React, { Component } from 'react';
import './HomeWorld.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';

export default class HomeWorld extends Component {
  state = {
    isLoading: true,
    homeWorld: '',
    error: false
  }

  componentDidMount() {
    const {homeWorldUrl} = this.props;

    fetch(homeWorldUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          homeWorld: data,
          isLoading: false
        })
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error: true
        })
      });
  }

  render() {
    const {isLoading, error, homeWorld} = this.state;
    const loading = (
      <div className="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );
    const errorMessage = (
      <p>Error. Please refresh and try again</p>
    )

    return (
      <div>
        <h3>Home planet: </h3>
        {isLoading && loading}
        {error && errorMessage}
        <p>{homeWorld.name}</p>
      </div>
    )
  }
}