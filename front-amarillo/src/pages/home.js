import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import {  useHistory } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/home.css';

function Home() {
    const history = useHistory();
    

    const onSubmit = async () => { 
        let wrongAcces = false;
        const people = [["CHRISTIAN","123cxz#"],
                        ["NATALIA","123cxz#"],
                        ["DANIEL","123cxz#"],
                        ["JUAN","123cxz#"],
                        ["DAVID","123cxz#"]];
        for(let user in people){
            wrongAcces = false;
            let formElement = document.getElementById("formData");
            try {
                let formData = new FormData(formElement);  
                const inputUser = formData.get("user");
                const inputPassword = formData.get("password");
                let currentUser = people[user];               
                console.log("usuario ingresado",inputUser);
                console.log("password ingresado",inputPassword);
                console.log(currentUser);     
                await currentUser[0] === inputUser && currentUser[1] === inputPassword ? history.push('/inventarioDisponible') : wrongAcces = true;              
            } catch (error) {
                console.log(error)
            }
            
        }
        if(wrongAcces){
            alert("Acceso Inválido")
        }
        
    }
    
    const onKeyPress = (event) => {       
        if (event.which === 13) {
            event.preventDefault();
            onSubmit();
        }  
    }
    return (          
            <Container className="home-container">
                <Row className="justify-content-md-center inline">
                    <Col className="left-container" sm={12} md={5} lg={6} xl={6}>              
                        <img className="lefty-image-home" src="home-background-vegetables.jpeg" alt="left-back"/>             
                    </Col>
                    <Col className="right-container" sm={12} md={5} lg={6} xl={6}>
                        <div className="logo-container">
                            <img className="logo-image-home" src="amarilloLogo.png" alt="logo amarillo"/>
                        </div>
                        <Form noValidate id="formData" onKeyPress={(event)=>onKeyPress(event)}>
                            <Form.Group className="form-group" size="xl">
                                <Form.Label size="lg" htmlFor="user">Usuario</Form.Label>
                                <Form.Control size="xl" type="text" placeholder="Escribe tu usuario" id="user" name="user" required />
                                <br/>
                                <Form.Label htmlFor="password">Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Escribe tu contraseña" id="password" name="password" required />                            
                            </Form.Group>
                            
                        </Form>   
                        <Button type="submit" className="login-button" variant="warning" size="lg" onClick={()=>onSubmit()}>Entrar</Button>       
                    </Col>
                </Row>
            </Container>   
    );
}

export default Home;
