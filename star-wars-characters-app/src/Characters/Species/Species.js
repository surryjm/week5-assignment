import React, { Component } from 'react';
import './Species.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';

export default class Species extends Component {
  state = {
    isLoading: true,
    species: [],
    error: false
  }

  componentDidMount() {
    const {speciesUrl} = this.props;
    
    Promise.all(speciesUrl.map(url => fetch(url)))
      .then(responses =>
        Promise.all(responses.map(response => response.json())))
        .then(data => {
          this.setState({
            isLoading: false,
            species: data
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
    const {isLoading, species, error} = this.state;
    const loading = (
      <div className="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );
    const errorMessage = (
      <p>Error. Please refresh and try again</p>
    )

    if (species.length === 0) {
      return (
        <div>
          <h3>Species:</h3>
          <p>Not provided</p>
        </div>
      )
    }

    return (
      <div>
        <h3>Species:</h3>
        {isLoading && loading}
        {error && errorMessage}

        {species.map((species, index) => {
          return (
            <p key={index}>{species.name}</p>
          )
        })}
      </div>
    )
  }
}