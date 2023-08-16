import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        preguntaSeguridad: '',
        respuestaSeguridad: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar lógica para guardar los datos del formulario
        console.log(formData);
    };

    return (
        <div>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
            <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <br />
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
            <label>
            Confirmar Contraseña:
            <input type="password" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} />
            </label>
            <br />
            <label>
            Pregunta de Seguridad:
            <select name="preguntaSeguridad" value={formData.preguntaSeguridad} onChange={handleChange}>
                <option value="">Seleccionar pregunta...</option>
                <option value="pregunta1">Pregunta 1</option>
                <option value="pregunta2">Pregunta 2</option>
                <option value="pregunta3">Pregunta 3</option>
            </select>
            </label>
            <br />
            <label>
            Respuesta de Seguridad:
            <input type="text" name="respuestaSeguridad" value={formData.respuestaSeguridad} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Registrar</button>
        </form>
        </div>
    );
}

export default Register;