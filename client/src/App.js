//import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Dogs from './components/Dogs/Dogs';
import { AddDog } from './components/AddDog/AddDog';
import DogDetail from './components/DogDetail/DogDetail';
//import styles from './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Dogs} />
          <Route exact path="/create" component={AddDog} />
          <Route exact path="/dogs/:id" component={DogDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
