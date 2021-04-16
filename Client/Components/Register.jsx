import React from "react"
import { Col, Row, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import "../style.css"


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            district: '',
            city: '',
            phone: ''

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        if (this.state.firstName != '' && this.state.lastName != '' && this.state.email != '' && this.state.password != '' && this.state.address != '' && this.state.district != '' && this.state.city != '' && this.state.phone != '') {

            const option = {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }

            }

            // if using wso2 esb ip 
            // http://wso2_ip:port/users/register
            fetch("http://localhost:3000/users/register", option).
                then(res => res.json()).
                then(res => {

                    if (res.userExist) {
                        window.alert('Email or Phone Number already Exist in the System');
                    } else {
                        window.alert('Registration Succesful');
                        this.props.history.push("/")
                    }
                });


        } else {
            window.alert('Fill all the Details in Form !!!!!');
        }


    }


    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    render() {

        return (
            <div >

                <Container style={{ width: "60%", marginTop: "1%" }}>

                    <Row>
                        <Col xs={{ size: 50, offset: 0 }} sm={{ size: 60, offset: 2 }} md={{ size: 70, offset: 0 }}>
                            <img className="centerImg2" src={require("./images/MainLogo.png")} alt="Main Logo" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ size: 2, offset: 2 }} sm={{ size: 3, offset: 4 }} md={{ size: 4, offset: 4 }} lg={{ size: 5, offset: 5 }}>
                            <div><h5 style={{ color: "#525855" }}>User&nbsp;Registration</h5></div>
                        </Col>
                    </Row>

                    <div className="formBackground" >

                        <Form onSubmit={this.handleSubmit}>

                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="fName">First Name</Label>
                                        <Input type="text" name="firstName" id="fName" placeholder="First Name...." onChange={this.handleChange} value={this.state.firstName} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="lName">Last Name</Label>
                                        <Input type="text" name="lastName" id="lName" placeholder="Last Name...." onChange={this.handleChange} value={this.state.lastName} />
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="userEmail">Email</Label>
                                        <Input type="email" name="email" id="userEmail" placeholder="example@gmail.com" onChange={this.handleChange} value={this.state.email} />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="userPassword">Password</Label>
                                        <Input type="password" name="password" id="userPassword" placeholder="Enter Password" onChange={this.handleChange} value={this.state.password} />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label for="userAddress">Address</Label>
                                <Input type="text" name="address" id="userAddress" placeholder="1234 Main St......" onChange={this.handleChange} value={this.state.address} />
                            </FormGroup>

                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="userDistrict">District</Label>
                                        <Input type="text" name="district" id="userDistrict" onChange={this.handleChange} value={this.state.district} />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="userCity">City</Label>
                                        <Input type="text" name="city" id="userCity" onChange={this.handleChange} value={this.state.city} />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="userPhone">Mobile Number</Label>
                                        <Input type="text" name="phone" id="userPhone" placeholder="+947XXXXXXXX" onChange={this.handleChange} value={this.state.phone} />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <br />

                            <Button color="primary">Register</Button>

                        </Form>
                    </div>
                </Container>

            </div>
        );
    }
}

export default Register