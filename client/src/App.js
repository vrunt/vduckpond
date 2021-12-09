import React from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const ENDPOINT = 'https://vduckpond.herokuapp.com/';
const ENDPOINT_FALLBACK = 'http://127.0.0.1:3001';

const POLL_MINS = 1;

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {

        let trysocket = socketIOClient(ENDPOINT);
        if (!this.trysocket){
            trysocket = socketIOClient(ENDPOINT_FALLBACK);
        }
        const socket = trysocket;
        socket.on('message', data => {
            console.log(data);
        });

        const fetchTime= () => {
            fetch('api')
                .then((res) => res.json())
                .then((data) => setData(data.message));
        }

        fetchTime();
        const interval = setInterval(() => {
            fetchTime();
                    }, POLL_MINS * (60 * 1000));
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>{!data ? "Loading..." : data}</p>
            </header>
        </div>
    );
}

export default App;
