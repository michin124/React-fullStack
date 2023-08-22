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
import { Link } from 'react-router-dom';

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


function Reset(res) {
    console.log(res)
    const [validado,setValidado]=useState(false)//si es valida la respuesta entonces puede ingresar una nueva contrasena
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
        respuesta:'',
    });
    const [contrasena, setContrasena] = useState({
        contrasena: '',
        confirmContra:'',
        respuesta:'',
    });
    const handleChangeContra = (event) => {
        const { name, value } = event.target;
        setContrasena((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setContrasena((prevData) => ({ ...prevData, [name]: value }));
    };
    


    const handleSubmit = (event) => {
        if(formData.respuesta=='')
        {
            alert('Ingresa una respuesta')
            return
        }
        if(res.respuesta!=formData.respuesta)
        {
            alert('Respuesta incorrecta')
            return
        }
        if(res.respuesta==formData.respuesta)
        {
            setValidado(true)
        }
        
    };
    const handleSubmit1 = (event) => {
        if(formData.correo=='')
        {
            alert('Ingresa un correo')
            return
        }
        event.preventDefault();
        // Aquí puedes agregar lógica para autenticar al usuario y manejar el inicio de sesión
        res.comprobar(formData)
    };
    const handleNewContra = (event) => {
        //con las dos contraseñas se realiza el put a la base de datos
        if(contrasena.contrasena=='')
        {
            alert('Ingresa una contrasena')
            return
        }
        if(contrasena.confirmContra=='')
        {
            alert('Confirma la contrasena')
            return
        }
        if(res.respuesta==formData.respuesta)
        {
            setValidado(true)
            res.reset(contrasena)
        }
    };

    

    const [searchValue, setSearchValue] = useState('');
    const url='http://127.0.0.1:8000/'
    const urlImg="http://127.0.0.1:8000/media/" 
    const navigate = useNavigate();    

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };


    const animatedComponents = makeAnimated();

    return(

        <div >
            {validado==false&&
                <div className='fullScreenS'>
                    {res.valid==true&&
                        <div className="login-box">
                            <h2 className="login-heading">Recuperar contraseña</h2>
                            <form className="login-form">
                                <h5>Pregunta de seguridad: {res.pregunta}</h5>
                                <input name="respuesta" value={formData.respuesta} onChange={handleChange} placeholder="Respuesta" className="input-field" />
                                <button onClick={handleSubmit} className="login-button">Restablecer</button>
                            </form>
                            <p className="login-text">Volver al <Link to="/">inicio</Link></p>
                            
                        </div>
                    }
                    
                    {res.valid==false&&
                        <div className="login-box">
                            <h2 className="login-heading">Recuperar contraseña</h2>
                            <form className="login-form">
                                <input name="correo" value={formData.correo} onChange={handleChange} type="text" placeholder="Correo Electrónico que ingresaste" className="input-field" />
                                <button onClick={handleSubmit1} className="login-button">Buscar</button>
                            </form>
                            <p className="login-text">Volver al <Link to="/">inicio </Link></p>
                        </div>
        
                    }
                </div>
            }
            {validado==true&&
                <div className='fullScreenS'>
                    <div className="login-box">
                        <h2 className="login-heading">Recuperar contraseña</h2>
                        <form className="login-form">
                            <h5>Ingresa la nueva contraseña</h5>
                            <input name="contrasena" value={contrasena.contrasena} onChange={handleChangeContra} placeholder="Nueva contraseña" className="input-field" />
                            <input name="confirmContra" value={contrasena.confirmContra} onChange={handleChangeContra} placeholder="Confirmar contraseña" className="input-field" />
                            {contrasena.contrasena==contrasena.confirmContra&&
                                <button onClick={handleNewContra} className="register-button">Cambiar</button>
                            }
                            {contrasena.contrasena!=contrasena.confirmContra&&
                                <h3 style={{color:'red'}}>No coinciden las contraseñas</h3>
                            }
                        </form>
                        <p className="login-text">Volver al <Link to="/">inicio</Link></p>
                        
                    </div>
                </div>
            }
            
            
        </div>
);
}

export default Reset;