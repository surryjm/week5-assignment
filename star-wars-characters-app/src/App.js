import CharacterSearch from './Characters/CharacterSearch/CharacterSearch';
import CharacterDetail from './Characters/CharacterDetail/CharacterDetail';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React from 'react';

function NavBar() {
  return (
    <div className="navbar">
      <Link to="/">Back to search</Link>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={CharacterSearch}></Route>
          <React.Fragment>
            <NavBar />
            <Route path="/character-details/:id" component={CharacterDetail}></Route>
          </React.Fragment>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
