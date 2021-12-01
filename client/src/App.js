import React from 'react';
import logo from './logo.svg';
import './App.css';

const POLL_MINS = 1;

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
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
