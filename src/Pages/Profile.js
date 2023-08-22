import React from 'react';
 // Asegúrate de que la ruta sea correcta


const userProfileStyles = {
    all: {
        height:'100%',
        width:'100%',
        backgroundColor: 'purple',
        textAlign: 'center',
        
    },
    container: {
        height:'30%',
        width:'40%',
        margin: '0px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
    },
    heading: {
        color: 'purple'
    },
    userInfo: {
        color: '#666',
        marginTop: '10px',
        fontSize:'1.4vw'
    }
};
function UserProfile(res) {
    return (
        <div style={userProfileStyles.all} >
            <div style={userProfileStyles.container}>
                <h1 style={userProfileStyles.heading}>Datos de Usuario</h1>
                <p style={userProfileStyles.userInfo}><strong>Nombre:</strong> {res.db.Nombre}</p>
                <p style={userProfileStyles.userInfo}><strong>Correo Electrónico:</strong> {res.db.Correo}</p>
            </div>

        </div>
        
    );
}

export default UserProfile;