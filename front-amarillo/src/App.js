import Home from './pages/home'
import InvDisponible from './pages/inventarioDisponible';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">     
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path='/inventarioDisponible' component={InvDisponible} exact />          
        </Switch>               
    </div>
  );
}

export default App;
