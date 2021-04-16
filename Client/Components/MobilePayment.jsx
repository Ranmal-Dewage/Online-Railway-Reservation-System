import React from "react"
import { Card, Button, Row, Col, Container, Form, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap';
import "../style.css"


class MobilePayment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.location.state.user._id,
            tid: this.props.location.state.train._id,
            paymentType: "Mobile Payment",
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
            phoneNumber: this.props.location.state.user.phone,
            realPinNumber: "",//
            typedPinNumber: "",//
            phoneOwnerName: "",
            ccNumber: "",
            cardHolderName: "",
            isLoading: false, //
            verified: false //


        }

        this.handleChange = this.handleChange.bind(this)
        this.handleTotalAmount = this.handleTotalAmount.bind(this)
        this.handleVerify = this.handleVerify.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    componentDidMount() {

        //since no Database CRUD operation did not call through WSO2 ESB
        fetch("http://localhost:3000/mobiles/smsVerify/" + this.state.phoneNumber).
            then(res => res.json()).
            then(res => {
                if (res.status) {
                    this.setState({ realPinNumber: res.pin })
                }
            });



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

        if (parseInt(this.state.typedPinNumber) == this.state.realPinNumber) {

            if (this.state.date != "" && this.state.departureStation != "" && this.state.destinationStation != "" && this.state.phoneOwnerName != "") {

                this.setState({ isLoading: true })
                var bookingDetail = this.state
                delete bookingDetail.finalValue
                delete bookingDetail.initValue
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
                // http://wso2_ip:port/users/mobilePayment
                fetch("http://localhost:3000/users/mobilePayment", option).
                    then(res => res.json()).
                    then(res => {
                        if (res.status) {
                            this.setState({ isLoading: false })
                            window.alert("Payment Successful \n Confirmation Details sent to Mobile Phone via SMS");
                            this.props.history.push("/homepage", { res: this.props.location.state.user })
                        }
                    });

            } else {
                window.alert('Fill all the Details in Payment Form !!!!!');
            }

        } else {
            window.alert("Invalid PIN Number")
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

        //since Twilio API won't work without verifying your phone number on my created twilio acoount.I have console.log
        //server generated random PIN number  
        console.log(this.state.realPinNumber)

        var i = 0;

        const depStations = this.props.location.state.train.destination.map(des => {
            return <option key={i++} value={des.name}>{des.name}</option>
        });

        return (
            <div >

                {this.state.isLoading ? <div style={{ marginLeft: "5%" }}> <br /><br /> <Spinner color="primary" style={{ width: '8rem', height: '8rem' }} /> <h3>Processing Payment</h3> </div> :

                    <Container style={{ width: "90%", marginTop: "1%" }}>

                        <Row>
                            <Col xs={{ size: 50, offset: 0 }} sm={{ size: 60, offset: 2 }} md={{ size: 70, offset: 0 }}>
                                <img className="centerImg2" src={require("./images/MainLogo.png")} alt="Main Logo" />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ size: 2, offset: 2 }} sm={{ size: 3, offset: 4 }} md={{ size: 4, offset: 4 }} lg={{ size: 5, offset: 5 }}>
                                <div><h5 style={{ color: "#525855" }}>Mobile&nbsp;Payment&nbsp;Gateway</h5></div>
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
                                            <Label for="phoneNo">Phone Number</Label>
                                            <Input readOnly value={this.state.phoneNumber} />
                                            <FormText>Payment Confirmation SMS and PIN Number will be send to  this Phone Number.</FormText>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="amount">Total Amount</Label>
                                            <Input readOnly value={(this.state.amount > 0) ? this.state.amount : "0"} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="pinNo">PIN Number</Label>
                                            <Input type="text" name="typedPinNumber" id="pinNo" placeholder="Enter PIN Number" value={this.state.typedPinNumber} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="phoneOwner">Phone Owner's Name</Label>
                                            <Input type="text" name="phoneOwnerName" id="phoneOwner" placeholder="Enter Phone Owner's Name" value={this.state.phoneOwnerName} onChange={this.handleChange} />
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

export default MobilePayment