import { useContext, useState } from "react";
import WorkoutContext from "./WorkoutContext";

import React from "react";
import { Bar } from "react-chartjs-2";
  
    
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
  
  ChartJS.register(
    BarElement,        // 👈 this is required for "bar" charts
    CategoryScale,     // 👈 X-axis
    LinearScale,       // 👈 Y-axis
    Tooltip,
    Legend,
    Title
  );

const WorkoutGraph = () => {

    const {data} = useContext(WorkoutContext)
    const [selectedUser, setUser] = useState(null)
    console.log(data);

    const arrayOfUserData = [...data];

    return (
        <>
            <div className="bg-gray-300 min-h-screen w-full p-4  shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            
                <div className="block  p-3 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="block">
                {arrayOfUserData.map(user =>
                    <button onClick = {() => setUser(user)} className="block"> {user.userName} </button>
                )}
                </div>

                {selectedUser &&
                <div>
                    {<Bar
                        data = {{
                            labels: selectedUser.workouts.map(workout => workout.workoutType)
                            ,
                            
                            datasets: [{
                                label: "Workout Min",
                                data: selectedUser.workouts.map(workout => workout.workoutMin)
                                
                        }]
                        }}
                         
                    />}
                </div>
                }

                </div>
                

            </div>
        </>
    )
}

export default WorkoutGraph;