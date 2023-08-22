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

import '../Styles/style.css';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination, Navigation,EffectCoverflow } from 'swiper/modules';



function Home(db) {

    const [searchValue, setSearchValue] = useState('');
    const urlImg="http://127.0.0.1:8000/media/" 
    const navigate = useNavigate();
    
    const [categoria, setCategoria] = useState([]);
    const [categoFilter, setCategoFilter] = useState([]);
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const [logOn, setLogOn] = useState(false);
    

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {
        if (db && db.dbC) {
            setCategoria(db.dbC);
        }
        if (db && db.db) {
            setBooks(db.db); 
        }
    }, [db]);
    useEffect(() => {
        if(localStorage.getItem("UserId")>0)
        {
            if (db && db.dbU) {
                setUser(db.dbU);
                setLogOn(true)
                
            }
        }
    }, [db]);

    const options = categoria.map((info) => (
        {
            value: info.id,   
            label: info.tipocategoria 
        }
    ));

    function ButtonAct(ruta){
        //Esta funcion sirve para pasar de una pagina a otra
        navigate(ruta)
    }
    function filtroCate(ruta){
        //Esta funcion sirve para cambiar la categoria de los libros
        setCategoFilter(ruta)
        console.log(ruta)
        if(ruta!=null)
        {
            db.catChange(ruta.value)
        }
        if(ruta==null)
        {
            db.catChange(0)
        }
    }
    function closeS(){
        //Esta funcion sirve para pasar de una pagina a otra
        localStorage.setItem("UserId",0);
        window.location.reload()
    }

    const animatedComponents = makeAnimated();

    return(
        
        <div className='fullScreen'>
            <div className='Head'>

                <div className='Up'>
                    
                    <h1 className='Titulo1'>MyBooks</h1>
                    <div className='SearchB'>
                        <ReactSearchBox
                            
                            placeholder="Placeholder"
                            value={searchValue} onChange={handleSearchChange}
                        />
                        <Button onClick={()=>ButtonAct(`/Search?Search=${searchValue}`)} style={{backgroundColor:'purple',height:'200%',width:'100%'}} variant="contained">Buscar</Button>
                    
                    </div>
                    
                </div>
                {logOn==false&&
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={()=>ButtonAct("/Register")} style={{backgroundColor:'purple',height:'50%',width:'50%'}} variant="contained">Register</Button>
                        <Button onClick={()=>ButtonAct("/login")} style={{backgroundColor:'white',height:'50%',width:'50%',color:'purple'}}  variant="outlined">Login</Button>
                    </ButtonGroup>

                }
                {logOn==true&&
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={()=>ButtonAct("/User")} style={{backgroundColor:'purple',height:'100%',width:'50%'}} variant="contained">{user.Nombre}</Button>
                        <Button onClick={closeS} style={{backgroundColor:'white',height:'100%',width:'100%',fontSize:'10px',color:'purple'}} variant="outlined">Cerrar sesion</Button>
                    </ButtonGroup>
                }
                

            </div>
            <div className='Body'>
                <div className='filtro'>
                <h2 style={{ fontSize: '100%' }}>Filtrar por categoría:</h2>
                <div className='Select'>
                    <Select isClearable={true} components={animatedComponents} options={options} onChange={filtroCate} value={categoFilter} />
                </div>
                </div>
                <div className='Books'>
                {books.length>0&&
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
                        {books.length>0&&
                            (books.map((info) => {
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
                {db.db[0]==undefined&&
                    <div className='notFound' >
                        <h2>No se encontraron libros en esta categoria</h2>
                    </div>    
                }
                </div>
            </div>
        </div>
);
}

export default Home;