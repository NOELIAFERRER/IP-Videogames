import { Route } from 'react-router-dom';
import axios from 'axios';
//components
import Landing from './views/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import Form from './views/Form/Form';
import GameDescription from './views/GameDescription/GameDescription';
import Footer from './components/Footer/Footer';
//styles
import styles from './App.modules.css';

// axios.defaults.baseURL = 'https://ip-videogames-production.up.railway.app/';
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

