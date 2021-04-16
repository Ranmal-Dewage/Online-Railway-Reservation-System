import React from "react"
import { Card, Button, Row, Col, Container, Form, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';
import "../style.css"


class CardPayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.location.state.user._id,
            tid: this.props.location.state.train._id,
            paymentType: "",
            fullname: this.props.location.state.user.firstName + " " + this.props.location.state.user.lastName,
            email: this.props.location.state.user.email,
            trainName: this.props.location.state.train.name,
            departureStation: "",
            destinationStation: "",
            tickets: 1,
            date: "",
            initValue: 0,//
            finalValue: 0,//
            amount: 0,
            nic: "",
            ccNumber: "",
            cvcNumber: "",//
            cardHolderName: "",
            phoneNumber: "",
            phoneOwnerName: "",
            isLoading: false, //
            verified: false //


        }
        this.handleChange = this.handleChange.bind(this)
        this.handleTotalAmount = this.handleTotalAmount.bind(this)
        this.handleVerify = this.handleVerify.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleVerify(event) {
        event.preventDefault()

        if (this.state.nic != "") {
            // console.log(this.state.email);
            // console.log(this.state.password);

            const option = {
                method: "POST",
                body: JSON.stringify({ nic: this.state.nic }),
                headers: {
                    "Content-Type": "application/json"
                }

            }

            // if using wso2 esb ip 
            // http://wso2_ip:port/users/governmentOfficers
            fetch("http://localhost:3000/users/checkGovernmentOfficers", option).
                then(res => res.json()).
                then(res => {

                    if (res.length != 0) {
                        this.setState({
                            amount: (this.state.amount * 0.8),
                            verified: true
                        })
                    } else {
                        window.alert("Not a Government Officer !!!");
                    }
                });
        } else {
            window.alert("NIC can not be Empty !!!");
        }

    }


    handleSubmit(event) {
        event.preventDefault()

        if (this.state.paymentType != "" && this.state.date != "" && this.state.departureStation != "" && this.state.destinationStation != "" && this.state.ccNumber != "" && this.state.cvcNumber != "" && this.state.cardHolderName != "" && this.state.paymentType != "") {

            this.setState({ isLoading: true })
            var bookingDetail = this.state
            delete bookingDetail.finalValue
            delete bookingDetail.initValue
            delete bookingDetail.cvcNumber
            delete bookingDetail.verified
            //console.log(bookingDetail)


            const option = {
                method: "PUT",
                body: JSON.stringify(bookingDetail),
                headers: {
                    "Content-Type": "application/json"
                }

            }


            // if using wso2 esb ip 
            // http://wso2_ip:port/users/cardPayment
            fetch("http://localhost:3000/users/cardPayment", option).
                then(res => res.json()).
                then(res => {
                    if (res.status) {
                        this.setState({ isLoading: false })
                        window.alert("Payment Succesful \n Confirmation Details sent to Your Email");
                        this.props.history.push("/homepage", { res: this.props.location.state.user })
                    }
                });


        } else {
            window.alert('Fill all the Details in Payment Form !!!!!');
        }

    }


    handleTotalAmount(value) {

        return (this.props.location.state.train.destination.find(des => des.name === value).price)

    }

    handleChange(event) {
        this.setState({
            verified: false
        });
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
        if (name == "departureStation") {
            let init = this.handleTotalAmount(value)
            this.setState({ initValue: init })
            let x = this.state.finalValue
            let z = parseInt(this.state.tickets)
            this.setState({ amount: (x - init) * z })

        } else if (name == "destinationStation") {
            let final = this.handleTotalAmount(value)
            this.setState({ finalValue: final })
            let y = this.state.initValue
            let z = parseInt(this.state.tickets)
            this.setState({ amount: (final - y) * z })

        } else if (name == "tickets") {
            this.setState({ amount: (this.state.finalValue - this.state.initValue) * value })

        }
    }



    render() {

        //console.log(this.state)
        // console.log(this.props.location.state.train)

        var i = 0;

        const depStations = this.props.location.state.train.destination.map(des => {
            return <option key={i++} value={des.name}>{des.name}</option>
        });


        return (
            <div>

                {this.state.isLoading ? <div style={{ marginLeft: "5%" }}> <br /><br /> <Spinner color="primary" style={{ width: '8rem', height: '8rem' }} /> <h3>Processing Payment</h3> </div> :

                    <Container style={{ width: "90%", marginTop: "1%" }}>

                        <Row>
                            <Col xs={{ size: 50, offset: 0 }} sm={{ size: 60, offset: 2 }} md={{ size: 70, offset: 0 }}>
                                <img className="centerImg2" src={require("./images/MainLogo.png")} alt="Main Logo" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 2, offset: 2 }} sm={{ size: 3, offset: 4 }} md={{ size: 4, offset: 4 }} lg={{ size: 5, offset: 5 }}>
                                <div><h5 style={{ color: "#525855" }}>Card&nbsp;Payment&nbsp;Gateway</h5></div>
                            </Col>
                        </Row>

                        <br />

                        <Row style={{ marginBottom: "2%" }}>

                            <Col sm="6">
                                <Card body>

                                    <Form>
                                        <FormGroup>
                                            <Label for="name">Full Name</Label>
                                            <Input readOnly value={this.state.fullname} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">Email</Label>
                                            <Input readOnly value={this.state.email} />
                                            <FormText>Payment Confirmation email will be send to this E-mail address.</FormText>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="trainName">Train Name</Label>
                                            <Input readOnly value={this.state.trainName} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="bookDate">Travel Date</Label>
                                            <Input
                                                type="date"
                                                name="date"
                                                id="bookDate"
                                                value={this.state.date}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="depStation">Select Departure Station</Label>
                                            <Input type="select" name="departureStation" id="depStation" value={this.state.departureStation} onChange={this.handleChange}>
                                                <option value="">--- Select Station ---</option>
                                                {depStations}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="desStation">Select Destination Station</Label>
                                            <Input type="select" name="destinationStation" id="desStation" value={this.state.destinationStation} onChange={this.handleChange}>
                                                <option value="">--- Select Station ---</option>
                                                {depStations}
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="noOfTickets">No. of Tickets</Label>
                                            <Input type="number" min="1" name="tickets" id="noOfTickets" value={this.state.tickets} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="userNIC">NIC</Label>
                                            {(this.state.verified) ?
                                                <Input readOnly value={this.state.nic} /> :
                                                <Input type="text" name="nic" id="userNIC" placeholder="Enter NIC Number" value={this.state.nic} onChange={this.handleChange} />
                                            }
                                            <FormText>Enter your NIC Number and click Verify Button to get Discount if you're a Government Officer.</FormText>
                                        </FormGroup>
                                        <Button disabled={this.state.verified} color="info" onClick={this.handleVerify}>Verify</Button>

                                    </Form>

                                </Card>
                            </Col>


                            <Col sm="6">
                                <Card body>
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup>
                                            <Label for="ccNo">Credit/Debit Card Number</Label>
                                            <Input type="text" name="ccNumber" id="ccNo" placeholder="Enter Credit/Debit Card Number" value={this.state.ccNumber} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="radio" name="paymentType" value="Credit Card" onChange={this.handleChange} /> Credit Card
                                        </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="radio" name="paymentType" value="Debit Card" onChange={this.handleChange} /> Debit Card
                                        </Label>
                                        </FormGroup>
                                        <br />
                                        <br />

                                        <FormGroup>
                                            <Label for="amount">Total Amount</Label>
                                            <Input readOnly value={(this.state.amount > 0) ? this.state.amount : "0"} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="cvcNo">CVC Number</Label>
                                            <Input type="text" name="cvcNumber" id="cvcNo" placeholder="Enter CVC Number" value={this.state.cvcNumber} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="holderName">Card Holder's Name</Label>
                                            <Input type="text" name="cardHolderName" id="holderName" placeholder="Enter Card Holder's Name" value={this.state.cardHolderName} onChange={this.handleChange} />
                                        </FormGroup>
                                        <Button color="success" style={{ padding: "2% 5%" }}>Pay</Button>
                                    </Form>
                                </Card>
                            </Col>

                        </Row>

                    </Container>

                }

            </div>
        );
    }
}

export default CardPayment