

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
    console.log(db)
    const navigate = useNavigate();
    const urlImg="http://127.0.0.1:8000/media/" 

    const [open, setOpen] = React.useState(false);
    const [book, setBook] = useState('Informacion');
    const [opi, setOpi] = useState([]);

    useEffect(() => {
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
            <div style={{height:'90%',width:'100%'}} >
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
                        style={{ width: '100%',height:'90%', color: '#ab47bc' }} // purple400
                    />
                </div>
                {book=='Informacion'&&
                    <div>
                        <h2 style={{fontSize:'2vw'}}>Autor: {db.db[0].Autor}</h2>
                        <h3 style={{fontSize:'1.3vw'}}>Categoria: {db.nameCat}</h3>

                        <div>
                            <p style={{fontSize:'1.3vw'}}>
                                {db.db[0].resumen}
                            </p>
                        </div>

                    </div>
                }
                {book=='Opiniones'&&
                    <div>
                        <div className='titleOpi'>
                            {localStorage.getItem("UserId")>0&&
                                <div className='Opinar'>
                                    <h4>¿Ya lo leiste?, dejanos saber tu opinion</h4>
                                    
                                    <Button variant="outlined" onClick={() => setOpen(true)}  style={{backgroundColor:'purple',height:'40%',width:'40%',color:'white'}} >Opinar</Button>
                                    
                                    
                                </div>
                            }
                            {localStorage.getItem("UserId")==0&&
                                <div className='Opinar'>
                                    <h4>¿Ya lo leiste?, ingresa y dejanos saber tu opinion</h4>
                                    
                                    <Button variant="outlined" onClick={() => ButtonAct('/login')}  style={{backgroundColor:'purple',height:'40%',width:'40%',color:'white'}} >Entrar</Button>
                                    
                                    
                                </div>
                            }
                            <h2 style={{fontSize:'2vw'}}>Opiniones</h2>
                            
                        </div>
                        <div className='opinionesRow' style={{height:'100%'}}>

                            <div style={{height:'100%'}}>
                                {opi&&
                                    opi.map((info) => {
                                        console.log(info)
                                        return(<>
                                            <Card Button={true} className='CardOpi'>
                                                
                                                <CardContent className='DescCardOpi'>
                                                    <Rating
                                                        style={{justifyContent:'center'}}
                                                        value={info.calificacion}
                                                        precision={0.5}
                                                        readOnly
                                                    />
                                                    
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {info.nombreUser}
                                                    </Typography>
                                                    <div className='Descp'>
                                                        
                                                        {info.descripcion}
                                                        
                                                    </div>
                                                    <div className='data'>
                                                        <h3>{info.date}</h3>
                                                    </div>
                                                    

                                                </CardContent>
                                            </Card>
                                        </>)
                                        
                                    })

                                }
                                

                                

                            </div>
                            
                            
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
                        value={5}
                        precision={0.5}
                        
                        size="large"
                    />
                    <br></br>
                    <Textarea 
                        minRows={2}
                        maxRows={4} 
                        placeholder="Type anything…" 
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
                            <Button onClick={() => setOpen(false)}  style={{backgroundColor:'purple',height:'50%',width:'50%'}} variant="contained">Opinar</Button>
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