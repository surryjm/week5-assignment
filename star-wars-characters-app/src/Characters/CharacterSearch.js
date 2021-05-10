import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterSearch.css';
import CharacterList from './CharacterList';


class CharacterSearch extends Component {
  state = {
    isLoading: false,
    characterDetail: null,
    error: false
  }

  searchForUser = (name) => {
    this.setState({
      isLoading: true,
      characterDetail: null,
      error: false
    });

    fetch(`https://swapi.dev/api/people/?search=${name}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        //console.log(data.results);
        //console.log(data.results[0].name);
        this.setState ({
          isLoading: false,
          characterDetail: data.results
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          error: true
        });
      })
  }

  onSearch = (event) => {
    event.preventDefault();
    const searchValue = event.target[0].value;
    //console.log(searchValue);
    this.searchForUser(searchValue);
  };



  render() {
    const {isLoading, characterDetail, error} = this.state;
    console.log(this.state.characterDetail);
    const loading = (
      <div className="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );
    const errorMessage = (
      <p>Error. Please refresh and try again</p>
    )
    //let content;
    

    return (
      <div>
        <h1>Star Wars Characters</h1>
        <form onSubmit={this.onSearch}>
          <input type="text" />
          <button type="submit">Search</button>
        </form>
        {isLoading && loading}
        {error && errorMessage}

        {characterDetail && this.state.characterDetail.map((card, index) => {
          return (
            <div key={index}>
              <h2>{card.name}</h2>
              {/* <img
                src={characterDetail.url}
                alt={`Image of ${characterDetail.name}`}
              /> */}
            </div>
          )
        })}
      </div>
    );
  }
}

export default CharacterSearch;