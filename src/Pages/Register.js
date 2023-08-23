import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/register.css';


function Register(res) {

    const [formData, setFormData] = useState({
        Nombre: "",
        Correo: "",
        Password: "",
        PasswordC: "",
        Answer:"",
        Pregunta: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        if(formData.Nombre=='')
        {
            alert('Ingresa un nombre')
            return
        }
        if(formData.Correo=='')
        {
            alert('Ingresa un correo')
            return
        }
        if(formData.Password=='')
        {
            alert('Ingresa una contraseña')
            return
        }
        if(formData.Pregunta=='')
        {
            alert('Escoge una pregunta')
            return
        }
        if(formData.Respuesta=='')
        {
            alert('Ingresa una respuesta a la pregunta')
            return
        }
        
        res.createData(formData)
    };

    return (
        <div className="register-container">
        <div className="register-box">
            <h2 className="register-heading">Registro</h2>
            <form className="register-form">
            <input type="text" name="Nombre" value={formData.Nombre} onChange={handleChange} placeholder="Nombre" className="input-field" />
            <input type="email" name="Correo" value={formData.Correo} onChange={handleChange} placeholder="Correo Electrónico" className="input-field" />
            <input type="Password" name="PasswordC" value={formData.PasswordC} onChange={handleChange} placeholder="Contraseña" className="input-field" />
            <input type="Password" name="Password" value={formData.Password} onChange={handleChange} placeholder="Confirmar Contraseña" className="input-field" />
            <select name="Pregunta" value={formData.Pregunta} onChange={handleChange} className="input-field select-field">
                <option value="">Seleccionar Pregunta de Seguridad</option>
                <option value={1}>¿Cual es el nombre de tu primera mascota?</option>
                <option value={2}>¿Como se llama tu ser mas querido?</option>
                <option value={3}>¿Cual es tu equipo favorito?</option>
            </select>
            <input type="text" name="Answer" value={formData.Answer} onChange={handleChange} placeholder="Respuesta de Seguridad" className="input-field" />
            {formData.Password==formData.PasswordC&&
                <button onClick={handleSubmit} className="register-button">Registrar</button>
            }
            {formData.Password!=formData.PasswordC&&
                <h3 style={{color:'red'}}>No coinciden las contraseñas</h3>
            }
            </form>
            <p className="register-text">¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </div>
        </div>
    );
}

export default Register;