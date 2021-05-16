import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterSearch.css';
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
          //let indexPlusOne = (index + 1);
          const urlId = (card.url).split('/')[5];

          return (
            <div key={index}>
              <Link to={`/character-details/${urlId}`}><h2>{card.name}</h2></Link>
            </div>
          )
        })}
      </div>
    );
  }
}

export default CharacterSearch;