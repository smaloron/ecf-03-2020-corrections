import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {

    state = {
        concertList: []
    };

    constructor(props) {
        super(props);

        axios.get('http://localhost:3000/')
            .then(
                (response) => {
                    this.setState({concertList: response.data})
                })
    }

    render() {

        const rows = this.state.concertList
            .map((item) => {
                return (
                    <tr>
                        <td>{item.band_name}</td>
                        <td>{item.location_name}</td>
                        <td>{item.rating}</td>
                        <td>{item.performance_date}</td>
                    </tr>
                )
            });

        return (
            <div>
                <table>
                    {rows}
                </table>
            </div>
        )
    }

}

export default App;
