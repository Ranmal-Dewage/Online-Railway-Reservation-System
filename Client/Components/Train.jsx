import React from "react"
import {
    Card, Row, Col, CardBody, CardTitle, CardSubtitle,
    Button, CardText, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import "../style.css"



class Train extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            train: this.props.train,
            user: this.props.user,
            modal: false
        }

        this.toggle = this.toggle.bind(this);
        this.handleCardPayment = this.handleCardPayment.bind(this);
        this.handleMobilePayment = this.handleMobilePayment.bind(this);
    }

    
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    handleCardPayment() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.history.push("/cardPayment", { train: this.state.train, user: this.state.user })

    }


    handleMobilePayment() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.history.push("/mobilePayment", { train: this.state.train, user: this.state.user })

    }

    render() {

        var trainDest = '';
        this.props.train.destination.forEach(des => {

            trainDest += des.name + ", "

        });

        trainDest = trainDest.substring(trainDest.indexOf(",") + 1, trainDest.lastIndexOf(","));

        return (
            <div>

                <Card className="train">
                    <CardBody>
                        <CardTitle><h4>{this.props.train.name}</h4></CardTitle>
                        <CardSubtitle><h6>{this.props.train.day}</h6></CardSubtitle>
                    </CardBody>

                    <Row style={{ margin: "2% 1%", }}>
                        <Col sm="6">
                            <img width="100%" src={this.props.train.imgUrl} alt="Train Image" />
                        </Col>
                        <Col sm="6">
                            <Card body>
                                <CardText>Departure :- {this.props.train.departure.name} ({this.props.train.departure.time})</CardText>
                                <CardText>Arrival :- {this.props.train.arrival.name} ({this.props.train.arrival.time})</CardText>
                                <CardText>Destination Stops :-</CardText>
                                <CardText>{trainDest}</CardText>
                                <Button onClick={this.toggle} >Reserve Ticket</Button>
                            </Card>
                        </Col>
                    </Row>
                </Card>


                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Payment Method</ModalHeader>
                    <ModalBody>
                        Select the Payment Method you wish to proceed with. If you are using Mobile Payment Method you will receive a pin code for your provided Phone Number during registration process, to verify your Phone Number.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleCardPayment}>Card Payment</Button>{' '}
                        <Button color="secondary" onClick={this.handleMobilePayment}>Mobile Payment</Button>
                    </ModalFooter>
                </Modal>


            </div>
        );
    }


}

export default Train;