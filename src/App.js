import React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'
import './App.css';

import "react-datepicker/dist/react-datepicker.css";

import Main from "./components/Main";

// If localStorage is empty, set it equal to an empty array
if (!localStorage.length) {
    localStorage.setItem('trips', "[]");
}

function App() {
    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;