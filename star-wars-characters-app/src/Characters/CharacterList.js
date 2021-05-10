import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterList.css';

class CharacterList extends Component {
  state = {
    isLoading: false,
    characters: [],
    error: false
  }

  componentDidMount() {
    fetch(`https://swapi.dev/api/people/`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        //console.log(data.results);
        //console.log(data.results[0].name);
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
  }

  render() {
    const {isLoading, characters, error} = this.state;
    console.log(this.state.characters);
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
        {isLoading && loading}
        {error && errorMessage}

        {characters && this.state.characters.map((card, index) => {
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

export default CharacterList;