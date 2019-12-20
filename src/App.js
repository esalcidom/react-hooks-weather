import React, {useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  const [ciudad, guardarCiudad] = useState('')
  const [pais, guardarPais] = useState('')
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    //prevenir ejecucion
    if(ciudad === '')
      return;
    consultarAPI();
  }, [ciudad, pais])

  const datosConsulta = datos => {
    //validar que los campos esten
    if(datos.ciudad === '' || datos.pais === ''){
      guardarError(true);
      return;
    }
    //Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
  }

  const consultarAPI = async () => {

    const appId = 'e4402f02ced9182bf3bcbbeef0581280';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    guardarResultado(resultado);
  }

  // cargar un componente condicionalmente
  let componente;
  if(error){
    //mostrar error
    componente = <Error mensaje='Ambos campos son obligarorios'/>
  }
  else if(resultado.cod == '404'){
    componente = <Error mensaje='La ciudad no existe'/>
  }
  else{
    //mostrar el clima
    componente = <Clima resultado={resultado}/>;
  }

  return (
    <div className="App">
      <Header 
        titulo='React Weather App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
