import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import WorkoutForm from "./WorkoutForm";

const App = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WorkoutForm/>}></Route>
            </Routes>
        </Router>
    )
}

export default App;