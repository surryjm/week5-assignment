import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterSearch.css';
import FilmsList from '../FilmsList/FilmsList';
import HomeWorld from '../HomeWorld/HomeWorld';
import Starships from '../Starships/Starships';
import Species from '../Species/Species';
import { Link } from 'react-router-dom';

class CharacterSearch extends Component {
  state = {
    isLoading: true,
    characters: [],
    error: false
  }

  componentDidMount() {
    fetch(`https://swapi.dev/api/people/`)
      .then(response => response.json())
      .then(data => {
        this.setState ({
          isLoading: false,
          characters: data.results
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: true
        });
      })
  };

  searchForUser = (name) => {
    this.setState({
      isLoading: true,
      characters: [],
      error: false
    });

    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then(response => response.json())
      .then(data => {
        this.setState ({
          isLoading: false,
          characters: data.results
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: true
        });
      })
  };

  onSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target[0].value;
    this.searchForUser(searchValue);
  };

  render() {
    const {isLoading, characters, error} = this.state;
    const loading = (
      <div className="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );
    const errorMessage = (
      <p>Error. Please refresh and try again</p>
    );

    return (
      <div>
        <h1>Star Wars Characters</h1>
        <form onSubmit={this.onSearch}>
          <input type="text" />
          <button type="submit">Search</button>
        </form>
        {isLoading && loading}
        {error && errorMessage}

        {characters && this.state.characters.map((card, index) => {
          return (
            <div key={index}>
              <Link to={`/character-details/${index + 1}/`}><h2>{card.name}</h2></Link>
              {/*<div><h3>Birth year:</h3>{card.birth_year}</div>*/}
              {/*<HomeWorld homeWorldUrl={card.homeworld}/>*/}
              {/*<Species speciesUrl={card.species} />*/}
              {/*<div><h3>Height:</h3>{card.height} centimeters</div>*/}
              {/*<Height height={card.height} />*/}
              {/*<Starships starshipsUrl={card.starships}/>*/}
              {/*<FilmsList filmsUrl={card.films} />*/}
            </div>
          )
        })}
      </div>
    );
  }
}

export default CharacterSearch;