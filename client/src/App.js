import React from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

//const ENDPOINT_FALLBACK = 'https://vduckpond.herokuapp.com/';
//const ENDPOINT = 'http://127.0.0.1:3001';

const POLL_MINS = 1;

function App() {
    const [data, setData] = React.useState(null);
    const [visitorCount, setVisitorCount] = React.useState(0);

    React.useEffect(() => {

  //      let trysocket = socketIOClient(ENDPOINT);
  //      if (!trysocket){
  //          trysocket = socketIOClient(ENDPOINT_FALLBACK);
  //      }
        let trysocket = socketIOClient(process.env.SERVER_URL);
        const socket = trysocket;
        socket.on('message', data => {
            console.log(data);
        });
        socket.on('visitors', data => {
            setVisitorCount(data);
        })

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
                <p>{!visitorCount ? "Loading..." : visitorCount}</p>
            </header>
        </div>
    );
}

export default App;
