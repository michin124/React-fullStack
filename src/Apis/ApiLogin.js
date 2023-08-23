
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Home from '../Pages/Home';
import axios from 'axios'
import Search from '../Pages/Search';
import { useHistory, useLocation,useNavigate} from 'react-router';

import Login from '../Pages/Login';



const initialDb=[
    {
        id:null,
        Nombre: '',
        Correo: '',
        Password: '',
        Pregunta: 1,
        Respuesta: '',
    }
]

function ApiLogin() {
    const navigate = useNavigate();
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    let busqueda=query.get("Search")

    const url='https://34.95.245.78:8000/'
    //Api de registro que consume los servicios necesarios para crear un usuario
    const [db,setDb]=useState(initialDb)//constante que guarda los usuarios
    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });
    useEffect(() => {
        setAppState({ loading: true });
            const apiUrl = `${url}libro/libroU/${busqueda}`;
            axios.get(apiUrl).then((response) => {
                setDb(response.data.libros);
            });
    }, [setDb]);
    
    const comprobar = (data) => {
        
        //para verificar
        const apiUrl = `${url}user/login/uno/`;
        axios.post(apiUrl, data )
        .then(response => {
            console.log(response)
            if(response.data.message=='succes')
            {
                console.log(response.data.Opiniones)
                localStorage.setItem("UserId",response.data.Opiniones[0].id);
                localStorage.setItem("UserName",response.data.Opiniones[0].Nombre);
                navigate('/')
            } 
            if(response.data.message!='succes')
            {
                alert('Correo o contraseña incorrectos')
            }    
            
        });
        
    };

    return(
        <Login db={db} comprobar={comprobar}></Login>
    );
}

export default ApiLogin;