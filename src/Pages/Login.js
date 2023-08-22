import React, { useState } from 'react';
import '../Styles/login.css';
import { Link } from 'react-router-dom';

function Login(res) {
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        if(formData.correo=='')
        {
            alert('Ingresa un correo')
            return
        }
        if(formData.contrasena=='')
        {
            alert('Ingresa una contraseña')
            return
        }
        event.preventDefault();
        // Aquí puedes agregar lógica para autenticar al usuario y manejar el inicio de sesión
        res.comprobar(formData)
    };

    const handleForgotPassword = () => {
        // Aquí puedes agregar lógica para manejar el caso de "Olvidaste tu contraseña"
        console.log("Olvidaste tu contraseña");
    };

    return (
        
        <div className="login-container">
            <div className="login-box">
            <h2 className="login-heading">Iniciar Sesión</h2>
            <form className="login-form">
                <input name="correo" value={formData.correo} onChange={handleChange} type="text" placeholder="Correo Electrónico" className="input-field" />
                <input name="contrasena" value={formData.contrasena} onChange={handleChange} type="password" placeholder="Contraseña" className="input-field" />
                <button onClick={handleSubmit} className="login-button">Ingresar</button>
            </form>
            <p className="login-text">¿Olvidaste tu contraseña? <Link to="/reset-password">Restablecer</Link></p>
            <p className="login-text">¿No tienes una cuenta? <Link to="/register">Registrarse</Link></p>
            </div>
        </div>
    );
}

export default Login;



