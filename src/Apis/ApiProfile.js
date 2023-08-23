
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Home from '../Pages/Home';
import axios from 'axios'
import Search from '../Pages/Search';
import { useHistory, useLocation} from 'react-router';
import UserProfile from '../Pages/Profile';


const initialDb=[
    {
        id: null,
        nombre: "",
        autor: "",
        calificacion: 4,
        categoria_id:0,
        foto: "",
        resumen:"",
    }
]

const initialDbCat=[
    {
        id: null,
        tipocategoria: "",
        resumen:"",    
    }
]
function ApiProfile() {
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    
    let busqueda=query.get("Search")

    const url='https://34.95.245.78:8000/'
    //Api de buscador que consume los servicios necesarios para mostrar el usuario
    const [db,setDb]=useState(initialDb)//constante que guarda el usuario
    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });
    useEffect(() => {
        const apiUrl = `${url}user/user/${localStorage.getItem("UserId")}`;
        axios.get(apiUrl).then((response) => {
            //consumer los libros, los autores y las categorias
            console.log(response.data.Opiniones[0])
            setDb(response.data.Opiniones[0]);
        });
    }, [setDb]);

    return(
        <UserProfile db={db}></UserProfile>
    );
}

export default ApiProfile;