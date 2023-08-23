
import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Book from '../Pages/Book';
import axios from 'axios'
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
const initialDbO=[
    {
        id: null,
        nombreUser: "",
        calificacion: "",
        descripcion: "",
        idUser_id:0,
        idLibro_id: 0,
        date:"",
    }
]
function ApiBook() {
    const url='http://34.95.245.78:8000/'
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    const [db,setDb]=useState(initialDb)//constante que guarda los libros
    const [dbOpi,setDbOpi]=useState(initialDbO)
    const [nameCat,setNameCat]=useState('')
    const [appState, setAppState] = useState({
        loading: false,
        repos: null,
    });
    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = `${url}libro/libro/${query.get("idBook")}`;
        axios.get(apiUrl).then((response) => {
            const allRepos = response.data.book;
            setNameCat(response.data.categoria)
            setDb(allRepos);
            setAppState({ loading: false, repos: allRepos });
        });
        const apiOpi = `${url}opiniones/opiniones/${query.get("idBook")}`;
        axios.get(apiOpi).then((response) => {
            console.log(response)
            const allRepos = response.data.book;
            if(response.data.Opiniones!=undefined)
            {
                setDbOpi(response.data.Opiniones);
            }
            if(response.data.Opiniones==undefined)
            {
                setDbOpi([]);
            }
            
        });

    }, [setDb]);

    const createData = (data) => {
        const urlPost = `${url}opiniones/opiniones/`;
        //para realizar un post
        axios.post(urlPost,data);

        window.location.reload()
    }


    return(
        <Book db={db} dbOpi={dbOpi} nameCat={nameCat} createData={createData}></Book>
    );
}

export default ApiBook;