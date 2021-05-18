import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterDetail.css';
import FilmsList from '../FilmsList/FilmsList';
import HomeWorld from '../HomeWorld/HomeWorld';
import Starships from '../Starships/Starships';
import Species from '../Species/Species';

class CharacterDetail extends Component {
  state = {
    isLoading: true,
    characterDetail: null,
    error: false
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`https://swapi.dev/api/people/${id}/`)
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
        <div className="character-detail-container">
          <h2 className="character-name">{characterDetail.name}</h2>
          <div className="detail-container-1">
            <div><h3>Birth year:</h3>{characterDetail.birth_year}</div>
            <HomeWorld homeWorldUrl={characterDetail.homeworld}/>
          </div>
          <div className="detail-container-2">
            <Species speciesUrl={characterDetail.species} />
            <div><h3>Height:</h3>{characterDetail.height} centimeters</div>
          </div>
          <div className="detail-container-3">
            <Starships starshipsUrl={characterDetail.starships}/>
            <FilmsList filmsUrl={characterDetail.films} />
          </div>
        </div>
      )
    }

    return (
      <div>
        {isLoading && loading}
        {error && errorMessage}
        {content}
      </div>
    );
  }
}

export default CharacterDetail;