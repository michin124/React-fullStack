

import React, { useState,useEffect } from 'react';
import ReactSearchBox from "react-search-box";
import { SegmentedControl } from 'segmented-control'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { useHistory, useLocation, useParams, useNavigate} from 'react-router';
import { Rating } from '@mui/material';
import '../Styles/styleBook.css';

function Book(db) {
    const currentDate = new Date();
    const [idLibro, setIdLibro] = useState(0);

    const [formData, setFormData] = useState({
        nombreU: localStorage.getItem("UserName"),
        calificacion: null,
        descripcion: "",
        idU: localStorage.getItem("UserId"),
        idL: idLibro,
        date: currentDate.toLocaleDateString(),
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        
        formData.idL=db.db[0].id;
        console.log(formData);
        if(formData.calificacion==null)
        {
            alert('Ingresa una calificacion')
            return
        }
        db.createData(formData)
        setOpen(false)
    };
    const navigate = useNavigate();
    const urlImg="https://34.95.245.78:8000/media/" 
    const [open, setOpen] = React.useState(false);
    const [book, setBook] = useState('Informacion');
    const [opi, setOpi] = useState([]);

    useEffect(() => {
        setIdLibro(db.db[0].id)
        if (db && db.dbOpi) {
            setOpi(db.dbOpi);
            
        }
    }, [db]);
    function ButtonAct(ruta){
        //Esta funcion sirve para pasar de una pagina a otra
        navigate(ruta)
    }
    return(
        <div className='BodyBook'>
            <div style={{height:'80%',width:'100%'}} >
                <img className='imgBook' src={`${urlImg}${db.db[0].file}`}/>
            </div>
            <div className='infoBook'>
                <h1 className='titleBook'>{db.db[0].nombre}</h1>
                <div >
                    <Rating
                        style={{justifyContent:'left'}}
                        value={db.db[0].calificacion}
                        precision={0.5}
                        readOnly
                        size="large"
                    />
                </div>
                <div>
                    <SegmentedControl
                        name="oneDisabled"
                        options={[
                            
                            { label: "Informacion", value: "Informacion", default: true },
                            { label: "Opiniones", value: "Opiniones" }
                        ]}
                        setValue={newValue =>setBook(newValue) }
                        style={{ width: '90%',height:'90%', color: '#ab47bc',fontSize:'60%' }} // purple400
                    />
                </div>
                {book=='Informacion'&&
                    <div className='bodyInfo'>
                        <h2 style={{fontSize:'100%'}}>Autor: {db.db[0].Autor}</h2>
                        <h3 style={{fontSize:'90%'}}>Categoria: {db.nameCat}</h3>

                        <div>
                            <p style={{fontSize:'100%'}}>
                                {db.db[0].resumen}
                            </p>
                        </div>

                    </div>
                }
                {book=='Opiniones'&&
                    <div className='bodyOpi'>
                        <div className='titleOpi'>
                            {localStorage.getItem("UserId")>0&&
                                <div className='Opinar'>
                                    <h4 style={{fontSize:'80%'}}>¿Ya lo leiste?, dejanos saber tu opinion</h4>
                                    
                                    <Button variant="outlined" onClick={() => setOpen(true)}  style={{backgroundColor:'purple',height:'40%',width:'40%',color:'white'}} >Opinar</Button>
                                    
                                    
                                </div>
                            }
                            {localStorage.getItem("UserId")==0&&
                                <div className='Opinar'>
                                    <h4 style={{fontSize:'80%'}}>¿Ya lo leiste?, ingresa y dejanos saber tu opinion</h4>
                                    
                                    <Button variant="outlined" onClick={() => ButtonAct('/login')}  style={{backgroundColor:'purple',height:'40%',width:'40%',color:'white'}} >Entrar</Button>
                                    
                                    
                                </div>
                            }
                            <h2 style={{fontSize:'100%'}}>Opiniones</h2>
                            
                        </div>
                        <div className='opinionesRow' >


                                {opi&&
                                    opi.map((info) => {
                                        console.log(info)
                                        return(<>
                                            <Card Button={true} className='CardOpi'>
                                                
                                                <CardContent className='DescCardOpi'>
                                                    <div className='date'>
                                                        <Rating
                                                            style={{justifyContent:'center',fontSize:'2vw'}}
                                                            value={info.calificacion}
                                                            precision={0.5}
                                                            readOnly
                                                        />
                                                        <h3>{info.date}</h3>
                                                    </div>
                                                    
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {info.nombreUser}
                                                    </Typography>
                                                    <div className='DescpO'>
                                                        
                                                        {info.descripcion}
                                                        
                                                    </div>
                                                    
                                                    

                                                </CardContent>
                                            </Card>
                                        </>)
                                        
                                    })

                                }
                                

                                

                            
                            
                            
                        </div>
                    </div>
                }
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog
                    aria-labelledby="nested-modal-title"
                    aria-describedby="nested-modal-description"
                    sx={(theme) => ({
                        [theme.breakpoints.only('xs')]: {
                        top: 'unset',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: 0,
                        transform: 'none',
                        maxWidth: 'unset',
                        },
                    })}
                    >
                    <h1 id="nested-modal-title" level="h2">
                        Opinion
                    </h1>
                    <Rating
                        style={{justifyContent:'left'}}
                        value={formData.calificacion}
                        precision={1}
                        size="large"
                        onChange={handleChange}
                        name="calificacion"
                    />
                    <br></br>
                    <Textarea 
                        minRows={2}
                        maxRows={4} 
                        placeholder="Cuentanos..." 
                        value={formData.descripcion}
                        onChange={handleChange}
                        name="descripcion"
                    />
                    <br></br>

                    
                    <div
                        sx={{
                        mt: 1,
                        display: 'flex',
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row-reverse' },
                        }}
                    >
                        
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button onClick={handleSubmit}  style={{backgroundColor:'purple',height:'50%',width:'50%'}} variant="contained">Opinar</Button>
                            <Button onClick={() => setOpen(false)} style={{color:'black',backgroundColor:'white',height:'50%',width:'50%'}}  variant="outlined">Cancelar</Button>
                            
                        </ButtonGroup>
                    </div>
                    </ModalDialog>
                </Modal>
                


            </div>
        </div>
    );
}

export default Book;