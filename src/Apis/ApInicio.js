
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Home from '../Pages/Home';
import axios from 'axios'



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
const initialUser=[
    {
        id: null,
        Nombre: "",
        Correo:"",  
    }
]
function ApInicio() {

    const url='https://34.95.245.78:8000/'
    //Api de inicio que consume los servicios necesarios
    const [db,setDb]=useState(initialDb)//constante que guarda los libros
    const [dbC,setDbC]=useState(initialDbCat)//constante que guarda las categorias
    const [dbU,setDbU]=useState(initialUser)//constante que guarda las categorias
    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });
    useEffect(() => {
        setAppState({ loading: true });
            const apiUrl = `${url}libro/libro/`;
            axios.get(apiUrl).then((response) => {
                const allRepos = response.data.books;
                setDb(allRepos);
                setAppState({ loading: false, repos: allRepos });
            });
    }, [setDb]);
    useEffect(() => {
        setAppState({ loading: true });
            const apiUrl = `${url}categoria/categoria/`;
            axios.get(apiUrl).then((response) => {
                console.log(response)
                const allRepos = response.data.Categoria;
                setDbC(allRepos);
                setAppState({ loading: false, repos: allRepos });
            });
    }, [setDbC]);
    useEffect(() => {
        
        if(localStorage.getItem("UserId")>0)
        {
            
            const apiUrl = `${url}user/user/${localStorage.getItem("UserId")}`;
            console.log(apiUrl)
            axios.get(apiUrl).then((response) => {
                setDbU(response.data.Opiniones[0])
            });
        }
        if(localStorage.getItem("UserId")==0)
        {
            setDbU([])
        }
        

    }, [setDb]);
    

    const catChange = (data) => {
        if(data==0)
        {
            const apiUrl = `${url}libro/libro/`;
            axios.get(apiUrl).then((response) => {
                const allRepos = response.data.books;
                setDb(allRepos);
                setAppState({ loading: false, repos: allRepos });
            });
        }
        if(data!=0)
        {
            const apiUrl = `${url}libro/libroCat/${data}`;
            axios.get(apiUrl).then((response) => {
                console.log(response)
                const allRepos = response.data.book;
                setDb(allRepos);
                if(response.data.message=='producto no encontradas')
                {
                    setDb([]);
                }
                setAppState({ loading: false, repos: allRepos });
            });
        }
        
    }

    return(
        <Home db={db} dbC={dbC} dbU={dbU} catChange={catChange}></Home>
    );
}

export default ApInicio;