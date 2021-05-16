import React, { Component } from 'react';
import './Starships.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';

export default class Starships extends Component {
  state = {
    isLoading: true,
    starships: [],
    error: false
  }

  componentDidMount() {
    const {starshipsUrl} = this.props;

    Promise.all(starshipsUrl.map(url => fetch(url)))
      .then(responses =>
        Promise.all(responses.map(response => response.json())))
          .then(data => {
            this.setState({
              isLoading: false,
              starships: data
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
    const {isLoading, error, starships} = this.state;
    const loading = (
      <div className="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );
    const errorMessage = (
      <p>Error. Please refresh and try again</p>
    )
    
    if (starships.length === 0) {
      return (
        <div>
          <h3>Starships:</h3>
          <p>Not provided</p>
        </div>
      )
    }

    return (
      <div>
        <h3>Starships:</h3>
        {isLoading && loading}
        {error && errorMessage}

        {starships.map((starship, index) => {
          return (
            <p key={index}>{starship.name}</p>
          )
        })}
      </div>
    )
  }
}