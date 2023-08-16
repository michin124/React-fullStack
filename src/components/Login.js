import React, { useState } from 'react';

function Login() {
    const [formData, setFormData] = useState({
        correo: '',
        contrasena: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar lógica para autenticar al usuario y manejar el inicio de sesión
        console.log(formData);
    };

    const handleForgotPassword = () => {
        // Aquí puedes agregar lógica para manejar el caso de "Olvidaste tu contraseña"
        console.log("Olvidaste tu contraseña");
    };

    return (
        <div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Correo:
            <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
            </label>
            <br />
            <label>
            Contraseña:
            <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
        </div>
    );
}

export default Login;



