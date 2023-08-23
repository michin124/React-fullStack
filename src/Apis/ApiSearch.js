
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Home from '../Pages/Home';
import axios from 'axios'
import Search from '../Pages/Search';
import { useHistory, useLocation} from 'react-router';


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
function ApiSeacrh() {
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    
    let busqueda=query.get("Search")

    const url='https://34.95.245.78:8000/'
    //Api de buscador que consume los servicios necesarios para buscar
    const [db,setDb]=useState(initialDb)//constante que guarda los libros por nombre
    const [dbN,setDbN]=useState(initialDb)//constante que guarda los libros por autor
    const [dbC,setDbC]=useState(initialDbCat)//constante que guarda las categorias
    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });
    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = `${url}libro/libroU/${busqueda}`;
        axios.get(apiUrl).then((response) => {
            //consumer los libros, los autores y las categorias
            setDb(response.data.libros);
            setDbN(response.data.autores.libros)
            setDbC(response.data.categorias.categorias)
            
        });
    }, [setDb]);

    const searchChange = (data) => {
        
        const apiUrl = `${url}libro/libroU/${data}`;
        
        axios.get(apiUrl).then((response) => {
            //los vuelve a consumir si el buscador se vuelve a utilizar, para realizar una busqueda mas rapida
            console.log(response.data.libros.message)
            if(response.data.libros.message=='libros no encontradas')
            {
            
                setDb([]);
            }
            else{
                setDb(response.data.libros);
            }
            if(response.data.autores.message=='libros no encontradas')
            {
                setDbN([]);
            }
            else{
                setDbN(response.data.autores.libros)
            }
            if(response.data.categorias.message=='libros no encontradas')
            {
                setDbC([]);
            }
            else{
                setDbC(response.data.categorias.categorias)
            }
        });
        
        
    }
        console.log(db)
    return(
        <Search db={db} dbN={dbN} dbC={dbC} searchChange={searchChange}></Search>
    );
}

export default ApiSeacrh;