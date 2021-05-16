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
        <div>
          <h2>{characterDetail.name}</h2>
          {/* <img
            src={characterDetail.url}
            alt={`Image of ${characterDetail.name}`}
          /> */}
          <div><h3>Birth year:</h3>{characterDetail.birth_year}</div>
          <HomeWorld homeWorldUrl={characterDetail.homeworld}/>
          <Species speciesUrl={characterDetail.species} />
          <div><h3>Height:</h3>{characterDetail.height} centimeters</div>
          {/*<Height height={card.height} />*/}
          <Starships starshipsUrl={characterDetail.starships}/>
          <FilmsList filmsUrl={characterDetail.films} />
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