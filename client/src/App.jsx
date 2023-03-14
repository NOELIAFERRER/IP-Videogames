// import './App.css';
import Home from './views/Home/Home';
import Navbar from './views/Navbar/Navbar';
import Form from './views/Form/Form';
import Landing from './views/Landing/Landing';
import GameDescription from './components/GameDescription/GameDescription';
import { Route } from 'react-router-dom';
// import Game from './components/Game';
// import Details from './components/Details';
// import { Email } from './components/Email';
import styles from './App.modules.css';
import axios from 'axios';
import Footer from './views/Footer/Footer';
axios.defaults.baseURL = 'http://localhost:3001';

function App() {
  return (
    <div className={styles.container}>
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

      {/* PRUEBA EMAIL */}
      {/* <Route path='/email'> <Email /></Route> */}
      <Route
        path='/games/details/:id'
        render={(match) => <GameDescription match={match}/>}
      />
      <Route path='/games'>
        <Footer />
      </Route>
    </div>
  );
}

export default App
