import React from "react"
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import "../style.css"


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departure: "",
            destination: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })

    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.departure != "" && this.state.destination != "") {
            // console.log(this.state.email);
            // console.log(this.state.password);

            const option = {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json"
                }

            }

            //if using wso2 esb ip 
            //http://wso2_ip:port/trains/search
            fetch("http://localhost:3000/trains/trainSearch", option).
                then(res => res.json()).
                then(res => {

                    if (res.length != 0) {
                        // console.log(res[0]);
                        this.props.updateTrains(res)
                    } else {
                        window.alert('No Matching Results Found !!!');
                    }
                });
        } else {
            window.alert("Fill in the Destination and Departure Stations !!!");
        }




    }


    render() {
        return (
            <div>

                <div className="coverImg">

                    <Form className="search" onSubmit={this.handleSubmit}>
                        <Row>
                            <Col sm={{ size: 'auto', offset: 4 }} xs={{ size: 'auto', offset: 3 }} md={{ size: 'auto', offset: 5 }}>
                                <Label for="search" style={{ color: "white", fontWeight: "bold" }}>SEARCH</Label>
                            </Col>
                            <Col sm={{ size: 'auto', offset: 4 }} xs={{ size: 'auto', offset: 3 }} md={{ size: 'auto', offset: 5 }}>
                                <FormGroup>
                                    <Input type="text" name="departure" id="depStation" placeholder="Departure Station..." onChange={this.handleChange} value={this.state.departure} />
                                </FormGroup>
                            </Col>
                            <Col sm={{ size: 'auto', offset: 4 }} xs={{ size: 'auto', offset: 3 }} md={{ size: 'auto', offset: 5 }}>
                                <FormGroup>
                                    <Input type="text" name="destination" id="desStation" placeholder="Destination Station..." onChange={this.handleChange} value={this.state.destination} />
                                </FormGroup>
                            </Col>
                            <Col sm={{ size: 'auto', offset: 4 }} xs={{ size: 'auto', offset: 3 }} md={{ size: 'auto', offset: 5 }}>
                                <Button color="primary">Submit</Button>
                            </Col>
                        </Row>

                    </Form>

                </div>


            </div>
        );
    }
}

export default Search