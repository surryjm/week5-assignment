import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterDetail.css';

class CharacterDetail extends Component {
  state = {
    isLoading: true,
    characterDetail: null,
    error: false
  }

  componentDidMount() {
    fetch('https://swapi.dev/api/people/1/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState ({
          isLoading: false,
          characterDetail: data
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: true
        });
      })
  }

  render() {
    const {isLoading, characterDetail, error} = this.state;
    const loading = (
      <div className="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );
    const errorMessage = (
      <p>Error. Please refresh and try again</p>
    )
    let content;

    if (characterDetail) {
      content = (
        <div>
          <h2>{characterDetail.name}</h2>
          {/* <img
            src={characterDetail.url}
            alt={`Image of ${characterDetail.name}`}
          /> */}
        </div>
      )
    }

    return (
      <div>
        <h1>Character Detail</h1>
        {isLoading && loading}
        {error && errorMessage}
        {content}
      </div>
    );
  }
}

export default CharacterDetail;