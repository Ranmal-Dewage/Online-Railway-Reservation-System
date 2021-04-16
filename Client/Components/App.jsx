import React from "react"
import LogIn from "./LogIn"
import UserView from "./UserView"
import Register from "./Register"
import CardPayment from "./CardPayment"
import MobilePayment from "./MobilePayment"
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom"



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {

        return (
            <div>

                <Router>

                    <Route path="/" exact strict render={() => {

                        return (<Redirect push to="/login" />);

                    }} />

                    <Route path="/homepage" exact strict render={(props) => {

                        return (<UserView  {...props} />);

                    }} />


                    <Route path="/login" exact strict render={(props) => {

                        return (<LogIn {...props} />);

                    }} />

                    <Route path="/register" exact strict render={(props) => {

                        return (<Register {...props} />);


                    }} />

                    <Route path="/cardPayment" exact strict render={(props) => {

                        return (<CardPayment {...props} />);


                    }} />


                    <Route path="/mobilePayment" exact strict render={(props) => {

                        return (<MobilePayment {...props} />);


                    }} />


                </Router>


            </div>


        );
    }

}

export default App;