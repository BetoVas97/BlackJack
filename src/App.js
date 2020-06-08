import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import FormularioCarta from './components/FormularioCarta';

function Partida(){
  const [cartas,setCartas]=useState([]);

  function tirarCarta(id){
    setCartas(cartas.filter((c)=>c!==id));
  }

  function agregarCarta(carta){
    setCartas([...cartas,carta]);
  }

  useEffect(()=>{
    axios
     .get("http://3.23.131.19:8080/cartas")
     .then(result=>{
      console.log(result.data);
      setCartas(result.data.cartas);
     });
    console.log('Effect componentDidMount!');
  },[]);

  return(
    <div>
      {/*<h2>Numero de mesa </h2>
      <h3>Numero de jugadores en la mesa</h3>
      <div>
        <h3>Cartas de la casa</h3>
      </div>
      <div>
      <h3>Tus cartas</h3>
      <h5>Agarrar carta</h5>
      </div>*/}
      <FormularioCarta onAgregarCarta={agregarCarta}/>

      {cartas.map((carta,i) => {
        return(<div className="col-md-4" key={i}>
                <div className="card mt-4">
                  <div className="card-header">
                    <h3> Carta {i+1}</h3>
                  </div>
                  <div className="card-body">
                    <h3>Mazo: {carta.mazo}  </h3>
                    <h4>Numero: {carta.numero} </h4>
                    <h5>Valor: {carta.valor}</h5>
                  </div>
                  <div className="card-footer">
                    <button type="button" onClick={()=>tirarCarta(carta)} className="btn btn-danger">Tirar Carta</button>
                  </div>
                </div>
              </div>);
      })}
      
      <NavLink to="/" activeClassName="is-active" exact>Abandonar juego y volver a menu </NavLink>
    </div>
    );
}

function Presentacion(){
  return (
    <div>
      <h1>Black Jack 21</h1>
      <h3>Elije una opcion para empezar a jugar</h3>
      <NavLink to="/" activeClassName="is-active" exact>Pagina de presentacion </NavLink>
      <NavLink to="/agregar-partida" activeClassName="is-active"> Agregar Partida </NavLink>
      <NavLink to="/unirse-partida" activeClassName="is-active"> Unirse a Partida</NavLink>
    </div>
  );
}

function e404(){
  return(
    <div>
      <h1>404</h1>
      <Link to="/">Ir al menú</Link>
    </div>
  );
}

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path='/' component={Presentacion} exact/>
        <Route path='/agregar-partida' component={Partida} />
        <Route component={e404} />
      </Switch>
    </BrowserRouter>
    </div>
    );

}


export default App;
