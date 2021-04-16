import React from "react"
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import "../style.css"


class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);

    }



    handleSubmit(event) {
        event.preventDefault();
        if (this.state.email != '' && this.state.password != '') {
            // console.log(this.state.email);
            // console.log(this.state.password);

            const option = {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }

            }
            
            // if using wso2 esb ip 
            // http://wso2_ip:port/users/login
            fetch("http://localhost:3000/users/login", option).
                then(res => res.json()).
                then(res => {

                    if (res.length != 0) {
                        // console.log(res[0]);
                        this.props.history.push("/homepage", { res: res[0] })
                    } else {
                        window.alert('Invalid Email or Password');
                    }
                });
        } else {
            window.alert("Email and Password can not be Empty!!!");
        }

    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleReset(event) {
        event.preventDefault();
        this.setState({
            email: '',
            password: ''
        });
    }

    handleRegistration(event) {
        event.preventDefault();
        this.props.history.push("/register")
    }





    render() {

        return (
            <div className="loginBackground">


                <Container style={{ width: "60%", paddingTop: "6%" }} >


                    <Row>
                        <Col xs={{ size: 70, offset: 0 }} sm={{ size: 70, offset: 1 }} md={{ size: 70, offset: 0 }}>
                            <img className="centerImg" src={require("./images/MainLogo.png")} alt="Main Logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 'auto', offset: 3 }} sm={{ size: 'auto', offset: 4 }} md={{ size: 6, offset: 4 }} lg={{ size: 6, offset: 5 }}>
                            <Button onClick={this.handleRegistration} color="primary" size="sm">Register Yourself</Button>
                        </Col>
                    </Row>


                    <br />
                    <br />
                    <br />

                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label style={{ color: "white" }} for="userEmail">Email</Label>
                            <Input type="email" name="email" id="userEmail" placeholder="exapamle@gmail.com" onChange={this.handleChange} value={this.state.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label style={{ color: "white" }} for="userPassword">Password</Label>
                            <Input type="password" name="password" id="userPassword" placeholder="Enter Password" onChange={this.handleChange} value={this.state.password} />
                        </FormGroup>

                        <br />

                        <Button color="success" size="lg">Log In</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button onClick={this.handleReset} color="danger" size="lg">Reset</Button>

                    </Form>

                </Container>


            </div>
        );
    }

}

export default LogIn;