import React ,{useState,useEffect} from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import {cartas} from  './cartas.json'
import FormularioCarta from './components/FormularioCarta';

function App() {
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
    console.log(cartas);
    console.log('Effect componentDidMount!');
  },[]);


  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Número de Cartas <span className="badge badge-pill badge-light">
                              {cartas.length}
                              </span>
        </a>
      </nav>
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
    </div>
    );

}
// class App extends React.Component{
//   constructor(){
//     super();
//     this.state = {
//       cartas
//     }
//   }
//
//   tirarCarta(id){
//     this.setState({
//       cartas:this.state.cartas.filter((e,i)=>{
//         return i!== id
//       })
//     });
//   }
//
//   render(){
//     console.log(this.state);
//     const cartasActuales = this.state.cartas.map((carta, i)=>{
//       return(
//         <div className="col-md-4" key={i}>
//           <div className="card mt-4">
//             <div className="card-header">
//               <h3>Carta {i+1}</h3>
//             </div>
//             <div className="card-body">
//               <h3>Mazo: {carta.mazo}</h3>
//               <h4>Número: {carta.numero}</h4>
//               <h5>Valor: {carta.valor}</h5>
//             </div>
//             <div className="card-footer">
//               <button type="button" onClick={this.tirarCarta.bind(this, i)} class="btn btn-danger">Tirar Carta</button>
//
//             </div>
//           </div>
//         </div>
//       );
//     });
//     return (
//       <div>
//         <nav  className="navbar navbar-dark bg-dark">
//           <a className="navbar-brand" href="/">
//             Número de Cartas <span className="badge badge-pill badge-light">{this.state.cartas.length}
//             </span>
//           </a>
//
//         </nav>
//
//         <FormularioCarta/>
//
//         <div>
//           {cartasActuales}
//         </div>
//       </div>
//
//     );
//   }
// }

export default App;
