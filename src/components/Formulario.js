import React, { useState } from 'react';

function Formulario({datosConsulta}){
    

    //state del componente
    //busqueda = sate, guardarBusqueda = this.setState
    const [busqueda, guardarBusqueda] = useState({
        ciudad : '',
        pais : ''
    })

    const handleChange = e => {
        //change state
        //se guarda primero lo que venia en el state con ...busqueda y despues se guarda el valor que cambia
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const consultarClima = e => {
        e.preventDefault();
        //pasar hacia el componente principal la busqueda
        datosConsulta(busqueda);
    }

    return(
        <form
            onSubmit={consultarClima}
        >
            <div className="input-field col s12">
                <input 
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select onChange={handleChange} name="pais">
                    <option value="">Selecciona un pais</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Peru</option>
                </select>
            </div>
            <div className="input-field col s12">
                <input type="submit" className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima"/>
            </div>
        </form>
    );
}

export default Formulario;