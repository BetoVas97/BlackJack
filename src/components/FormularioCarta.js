import React,{useState} from 'react';

const FormularioCarta = (props)=>{
  const [carta,setCarta] = useState({
    mazo:'Corazones',
    numero:'',
    valor:''
  });

  function handleInput(e){
    const{value,name}=e.target;
    setCarta({
      ...carta,
      [name]:value
    });
  }

  function handleSubmit(e){
    console.log(e);
    console.log(carta);
    e.preventDefault();
    props.onAgregarCarta(carta);
  }

  return(
    <div className="card">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className ="form-group">
          <select onChange={handleInput} name="mazo" className="form-control">
            <option>Corazones</option>
            <option>Diamantes</option>
            <option>Treboles</option>
            <option>Espadas</option>
          </select>
        </div>
        <div className ="form-group">
          <input type="text" onChange={handleInput} name="numero" placeholder="Número" className="form-control"/>
        </div>
        <div className ="form-group">
          <input type="text" onChange={handleInput} name="valor" placeholder="Valor" className="form-control"/>
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar cartas
        </button>
      </form>
    </div>
  );


}

export default FormularioCarta;
