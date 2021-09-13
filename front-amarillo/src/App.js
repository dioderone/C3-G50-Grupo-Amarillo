import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Front del EquipoAmarillo, el mejor forever
        </p>  
        <form>
          <label>
            Usuario:
            <input type="text" name="name" />
          </label>         
          <label>
            contraseña:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>  
      </header>
    </div>
  );
}

export default App;
