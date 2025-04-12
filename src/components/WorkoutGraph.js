import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
    BarElement,        
    CategoryScale,     
    LinearScale,       
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
                <div className="m-3">
                        <Link to="/Table" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> &#8249; Back to table </Link>
                                
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start justify-around bg-gray-100 dark:bg-gray-900 p-10 m-20">
                
                <div className="block w-full space-y-2 p-6 w-100 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Select a User</h3>    
                {arrayOfUserData.map(user =>
                    <button key={user.userName} className="w-full  block  p-3 bg-gray-200 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 hover:bg-gray-500" onClick = {() => setUser(user)} > {user.userName} </button>
                )}
                </div>
                

                {selectedUser &&
                <div className="block h-full w-full space-y-2 p-6 w-100 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                     
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Workout Chart for {selectedUser.userName}
                        </h3>
                    {<Bar
                        data = {{
                            labels: selectedUser.workouts.map(workout => workout.workoutType),
                            
                            datasets: [{
                                label: "Workout Min",
                                data: selectedUser.workouts.map(workout => workout.workoutMin),
                                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                                borderRadius: 6,
                        }]
                        }}
                        options={{
                            responsive: true,
                            
                            plugins: {
                                legend: {
                                    display: true,
                                    labels: { color: '#374151' }
                                },
                                title: {
                                    display: true,
                                    text: 'Workout Progress',
                                    color: '#1f2937',
                                    font: { size: 18 }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: { color: '#374151' },
                                    grid: { color: '#e5e7eb' }
                                },
                                y: {
                                    ticks: { color: '#374151' },
                                    grid: { color: '#e5e7eb' }
                                }
                            }
                        }}
                         
                    />}
                </div>
                }
                </div>

                </div>
                

            </div>
        </>
    )
}

export default WorkoutGraph;