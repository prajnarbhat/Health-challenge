import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { WorkoutContextProvider } from "./WorkoutContext";
import WorkoutForm from "./WorkoutForm";
import WorkoutGraph from "./WorkoutGraph";
import WorkoutTable from "./WorkoutTable";

const App = () =>{
    // Wrap the app’s component tree using a WorkoutContextProvider so all children can access the context.
    return (
        <WorkoutContextProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<WorkoutForm/>}></Route>
                    <Route path="/Table" element={<WorkoutTable/>}> </Route>
                    <Route path="/chart" element={<WorkoutGraph/>}> </Route>
                </Routes>
            </Router>
        </WorkoutContextProvider>
    )
}

export default App;