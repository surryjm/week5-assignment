import CharacterSearch from './Characters/CharacterSearch/CharacterSearch';
import CharacterDetail from './Characters/CharacterDetail/CharacterDetail';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <Link to="/character-search">Back to search</Link>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/character-search" component={CharacterSearch}></Route>
          <div>
            <NavBar />
            <Route path="/character-details/:id" component={CharacterDetail}></Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
