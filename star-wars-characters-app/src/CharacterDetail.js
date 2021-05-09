import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import './CharacterDetail.css';

class CharacterDetail extends Component {
  state = {
    isLoading: true
  }

  render() {
    const {isLoading} = this.state;
    const loading = (
      <div class="loading-animation">
        <FontAwesomeIcon icon={faJedi} />
        <p>Loading...</p>
      </div>
    );

    return (
      <div>
        <h1>Character Detail</h1>
        {isLoading && loading}
      </div>
    );
  }
}

export default CharacterDetail;