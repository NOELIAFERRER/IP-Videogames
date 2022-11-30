import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Landing from './components/Landing';
import GameDetail from './components/GameDetail';
import { Route } from 'react-router-dom';
import Game from './components/Game';
// import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route path='/games'>
        <Navbar />
      </Route>
      <Route exact path='/games'>
        <Home />
      </Route>
      <Route path='/games/post'>
        <Form />
      </Route>
      <Route
        path='/games/details/:id'
        render={(match) => <GameDetail match={match}/>}
      />
    </div>
  );
}

export default App

