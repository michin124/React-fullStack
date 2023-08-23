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
// import required modules
import { Autoplay, Pagination, Navigation,EffectCoverflow } from 'swiper/modules';



function Search(db) {
    let {search}=useLocation();
    let query=new URLSearchParams(search);
    
    let busqueda=query.get("Search")
    
    const [searchValue, setSearchValue] = useState(busqueda);
    console.log(db)
    const urlImg="https://34.95.245.78:8000/media/" 
    const navigate = useNavigate();
    
    const [categoria, setCategoria] = useState([]);
    const [autor, setAutor] = useState([]);
    const [books, setBooks] = useState([]);
    
    console.log(autor)
    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {
        if (db && db.dbC) {
            setCategoria(db.dbC);
        }
        if (db && db.dbN) {
            
            setAutor(db.dbN); 
        }
        if (db && db.db.libros) {
            console.log(db.db)
            setBooks(db.db.libros); 
        }
    }, [db]);
    
    function ButtonAct(ruta){
        //Esta funcion sirve para pasar de una pagina a otra
        navigate(ruta)
    }
    function searchC(ruta){
        //Esta funcion sirve para cambiar la categoria de los libros
        navigate(`/Search?Search=${ruta}`)
        
        db.searchChange(ruta)
        window.location.reload()
    }

    const animatedComponents = makeAnimated();

    return(
        
        <div className='fullScreenS'>
            <div className='HeadS'>

                <div className='UpS'>
                    <div className='SearchB'>
                        <ReactSearchBox
                            
                            placeholder={'Ultima busqueda: '+busqueda}
                            value={busqueda} onChange={handleSearchChange}
                        />
                        <Button onClick={()=>searchC(searchValue)} style={{backgroundColor:'purple',height:'250%',width:'100%'}} variant="contained">Buscar</Button>
                    </div>
                </div>
                <Button onClick={()=>ButtonAct("/")}  style={{backgroundColor:'white',height:'50%',width:'50%',fontSize:'15px',color:'purple'}} variant="outlined"> Inicio</Button>
            </div>
            <div >
                
                    {categoria.length>0&&
                        categoria[0].id!=null&&
                            <div style={{height:'10%',marginBottom:'5%'}}>
                                <h2>Categorias que tienen en el nombre "{busqueda}":</h2>
                                <Swiper
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    
                                    slidesPerView={2}
                                    spaceBetween={30}
                                    pagination={true}
                                    modules={[ Pagination,Autoplay]}
                                    className="SwiperCat"
                                >
                                    {categoria[0].id!=null&&
                                        (categoria.map((info) => {
                                            console.log(info)
                                            return(<>
                                                <SwiperSlide style={{ height: '100%', width: '100%' }} >
                                                    <Card onClick={()=>ButtonAct(`/Cate?categoria=${info.id}`+`&name=${info.tipocategoria}`)} Button={true} className='CardSmall'>
                                                            <div className='TituloBooks'>
                                                                {info.tipocategoria}
                                                            </div>
                                                    </Card>
                                                </SwiperSlide>
                                            </>)
                                        }))
                                    }
                                </Swiper>
                            </div>
                    } 
                {books.length>0&&
                    books[0].id!=null&&
                        <div className='Books'>
                            <br></br>
                            <br></br>
                            <h2>Libros que tienen en el nombre "{busqueda}":</h2>
                            <Swiper
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={true}
                                modules={[ Pagination,Autoplay]}
                                className="SwiperB"
                            >
                                {books[0].id!=null&&
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
                                                    </CardContent>
                                                </Card>
                                            </SwiperSlide>
                                        </>)
                                    }))
                                }
                            </Swiper>
                        </div>
                }  
                {autor.length>0&&
                    autor[0].id!=null&&
                        <div className='Books'>
                            <br></br>
                            <br></br>
                            <h2>Estos son los libros que tienen autores con "{busqueda}":</h2>
                            <Swiper
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                
                                slidesPerView={3}
                                spaceBetween={30}
                                pagination={true}
                                modules={[ Pagination,Autoplay]}
                                className="SwiperB"
                            >
                                {autor[0].id!=null&&
                                    (autor.map((info) => {
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
                                                    </CardContent>
                                                </Card>
                                            </SwiperSlide>
                                        </>)
                                    }))
                                }
                            </Swiper>
                        </div>
                }
            </div>
        </div>
);
}

export default Search;