
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Home from '../Pages/Home';
import axios from 'axios'
import Search from '../Pages/Search';
import { useHistory, useLocation,useNavigate} from 'react-router';
import Register from '../Pages/Register';


const initialDb=[
    {
        id:null,
        Nombre: '',
        Correo: '',
        Password: '',
        Answer: '',
        Pregunta: 1,
        
    }
]
function ApiRegister() {
    
    const navigate = useNavigate();
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    
    let busqueda=query.get("Search")
    const url='http://34.95.245.78:8000/'
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
    const createData = (data) => {
        const apiUrl = `${url}user/users/${data.Correo}`;
        axios.get(apiUrl).then((response) => {
            if(response.data.message!='succes')
            {
                const urlPost = `${url}user/user/`;
                //para realizar un post
                axios.post(urlPost,data);
                navigate('/login')
                window.location.reload();
            }
            else{
                alert('Error, trata de nuevo')
            }
        })
    }
    return(
        <Register db={db} createData={createData}></Register>
    );
}

export default ApiRegister;