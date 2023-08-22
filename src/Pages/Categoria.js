import React, { useEffect, useState } from 'react';
import ReactSearchBox from "react-search-box";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Slider from "react-slick";

import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useHistory, useLocation, useParams, useNavigate} from 'react-router';

import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import '../Styles/search.css';

import 'swiper/css/pagination';
import axios from 'axios'
// import required modules
import { Autoplay, Pagination, Navigation,EffectCoverflow } from 'swiper/modules';


function Categoria(db) {
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    
    let busqueda=query.get("categoria")
    let catName=query.get("name")

    
    const [searchValue, setSearchValue] = useState(busqueda);
    const url='http://127.0.0.1:8000/'
    const urlImg="http://127.0.0.1:8000/media/" 
    const navigate = useNavigate();
    
    const [categoria, setCategoria] = useState([]);
    
    

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {

        const apiUrl = `${url}libro/libroCat/${busqueda}`;
        axios.get(apiUrl).then((response) => {
            console.log(response)
            const allRepos = response.data.book;
            setCategoria(allRepos);
            if(response.data.message=='producto no encontradas')
            {
                setCategoria([]);
            }
            
        });
        if (db && db.dbC) {
            setCategoria(db.dbC);
        }
    }, [db]);
    
    function ButtonAct(ruta){
        //Esta funcion sirve para pasar de una pagina a otra
        navigate(ruta)
    }
    function searchC(ruta){
        //Esta funcion sirve para cambiar la categoria de los libros
        navigate(`/Search?Search=${ruta}`)

    }

    const animatedComponents = makeAnimated();

    return(
        
        <div className='fullScreenS'>
            <div className='HeadS'>

                <div className='UpS'>
                    <div className='SearchB'>
                        <ReactSearchBox
                            placeholder={'Buscar:'}
                            value={busqueda} onChange={handleSearchChange}
                        />
                        <Button onClick={()=>ButtonAct(`/Search?Search=${searchValue}`)} style={{backgroundColor:'purple',height:'250%',width:'100%'}} variant="contained">Buscar</Button>
                    </div>
                </div>
                <Button onClick={()=>ButtonAct("/")}  style={{backgroundColor:'white',height:'50%',width:'50%',fontSize:'15px',color:'purple'}} variant="outlined"> Inicio</Button>
            </div>
            <div className='Body'> 
            <h1>Resultados a {catName}: </h1>             
                {categoria.length>0&&
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        
                        slidesPerView={4}
                        spaceBetween={30}
                        pagination={true}
                        modules={[ Pagination,Autoplay]}
                        className="SwiperB"
                    >
                        {categoria.length>0&&
                            (categoria.map((info) => {
                                return(<>
                                    <SwiperSlide style={{ height: '99%', width: '100%' }} >
                                        <Card onClick={()=>ButtonAct(`/Book?idBook=${info.id}`)} Button={true} className='Card'>
                                            <CardMedia
                                            className='mediaCard'
                                            image={`${urlImg}${info.file}`}
                                            />
                                            <CardContent className='DescCard'>
                                                <Rating
                                                    style={{justifyContent:'center'}}
                                                    value={info.calificacion}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                <div className='TituloBooks'>
                                                    {info.nombre}
                                                </div>
                                                <div className='Descp'>
                                                    {info.resumen}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </SwiperSlide>
                                </>)
                            }))
                        }
                    </Swiper>
                }  
            </div>
        </div>
);
}

export default Categoria;