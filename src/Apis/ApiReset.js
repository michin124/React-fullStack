
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Home from '../Pages/Home';
import axios from 'axios'
import Reset from '../Pages/Reset1';

const initialDbCat=[
    {
        id: null,
        tipocategoria: "",
        resumen:"",    
    }
]
const initialUser=[
    {
        id: null,
        Nombre: "",
        Correo:"",  
    }
]
function ApiReset() {

    const url='https://34.95.245.78:8000/'
    //Api de inicio que consume los servicios necesarios
    const [valid,setValid]=useState(false)//constante que sabe si es valido el correo
    const [db,setDb]=useState(initialDbCat)//constante que guarda la informacion del usuario
    const [pregunta,setPregunta]=useState('')//constante que guarda la pregunta del usuario
    const [respuesta,setRespuesta]=useState('')//constante que guarda la respuesta del usuario
    const[id,setId]=useState(0)
    
    
    const comprobar = (data) => {
        
        //para verificar
        const apiUrl = `${url}user/users/${data.correo}`;
        
        axios.get(apiUrl).then((response) => {
            console.log(response)
            setId(response.data.Opiniones[0].id)
            if(response.data.message=='succes')
            {
                const apiUrl = `${url}user/pregunta/${response.data.Opiniones[0].IdRespuesta_id}`;
                axios.get(apiUrl).then((response) => {
                    console.log(response.data.Opiniones[0].pregunta)
                    setPregunta(response.data.Opiniones[0].pregunta)
                    setValid(true)
                })
                
                setRespuesta(response.data.Opiniones[0].Answer)        
            }
        }); 
    }
    const reset = (data) => {
        //para verificar
        const apiUrl = `${url}user/confirm/${id}/`;
        axios.put(apiUrl, data)
    }   


    return(
        <Reset reset={reset} comprobar={comprobar} valid={valid} pregunta={pregunta} respuesta={respuesta}></Reset>
    );
}

export default ApiReset;