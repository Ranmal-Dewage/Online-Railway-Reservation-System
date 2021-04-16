import React from "react"
import TopBar from "./TopBar"
import Search from "./Search"
import Train from "./Train"
import "../style.css"



class UserView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.location.state.res,
            trains: []
        }
        this.updateTrains = this.updateTrains.bind(this)
    }

    componentDidMount() {

        // console.log(this.state.user)

        //if using wso2 esb ip 
        //http://wso2_ip:port/trains/getAll
        fetch("http://localhost:3000/trains/getAll").
            then(res => res.json()).
            then(res => {
                this.setState({
                    trains: res
                })
            });

    }

    updateTrains(search) {
        this.setState({ trains: search })
    }


    render() {

        const trainsDispaly = this.state.trains.map(train => {
            return <Train key={train._id} train={train} user={this.state.user} {...this.props} />
        });

        return (
            <div>

                <TopBar user={this.state.user} {...this.props} />
                <Search updateTrains={this.updateTrains} {...this.props} />
                <br />
                {trainsDispaly}

            </div>
        );
    }


}

export default UserView;