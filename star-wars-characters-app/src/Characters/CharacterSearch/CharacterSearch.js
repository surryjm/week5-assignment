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
      <div className="character-search">
        <h1 className="main-title">Star Wars Characters</h1>

        <div className="character-search-container">
          <form onSubmit={this.onSearch}>
            <input className="input" type="text" placeholder="Search characters..."/>
            <button className="input-button" type="submit">Search</button>
          </form>
          {isLoading && loading}
          {error && errorMessage}

          <div className="search-results-container">
          {characters && this.state.characters.map((card, index) => {
            const urlId = (card.url).split('/')[5];
            <div></div>
            return (
              <div className="search-result" key={index}>
                <Link to={`/character-details/${urlId}`}><h2>{card.name}</h2></Link>
              </div>
            )
          })}
          </div>
        </div>

      </div>
    );
  }
}

export default CharacterSearch;