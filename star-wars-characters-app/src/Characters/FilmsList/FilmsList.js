import React, { Component } from 'react';
import './FilmsList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';

export default class FilmsList extends Component {
  state = {
    isLoading: true,
    films: [],
    error: false
  }

  componentDidMount() {
    const {filmsUrl} = this.props;

    Promise.all(filmsUrl.map(url => fetch(url)))
      .then(responses => 
        Promise.all(responses.map(response => response.json())))
          .then(data => {
            this.setState({
              films: data,
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
    const {isLoading, error, films} = this.state;
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
        <h3>Films:</h3>
        {isLoading && loading}
        {error && errorMessage}

        {films.map((film, index) => {
          return (
            <p key={index}>{film.title}</p>
          )
        })}
      </div>
    )
  }
}