import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useContext, useState } from "react";
import { Bar } from "react-chartjs-2";
import WorkoutContext from "./WorkoutContext";
  
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
    const arrayOfUserData = [...data];

    return (
        <>
            <div className="bg-gray-300 min-h-screen w-full p-4 sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 space-y-2 p-4 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Select a User</h3>
                            {arrayOfUserData.map((user) => (
                            <button key={user.userName} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-700" 
                                onClick={() => setUser(user)}> {user.userName} </button>
                        ))}
                    </div>

                {selectedUser && (
                    <div className="w-full md:w-2/3 p-4 bg-white border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Workout Chart for {selectedUser.userName}
                        </h3>
                        <div className="relative h-64 w-full">
                            <Bar
                            data={{
                                labels: selectedUser.workouts.map((workout) => workout.workoutType),
                                datasets: [
                                {
                                    label: "Workout Min",
                                    data: selectedUser.workouts.map((workout) => workout.workoutMin),
                                    backgroundColor: "rgba(59, 130, 246, 0.7)",
                                    borderRadius: 6,
                                },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                legend: {
                                    display: true,
                                    labels: { color: "#374151" },
                                },
                                title: {
                                    display: true,
                                    text: "Workout Progress",
                                    color: "#1f2937",
                                    font: { size: 18 },
                                },
                                },
                                scales: {
                                    x: {
                                    ticks: { color: "#374151" },
                                    grid: { color: "#e5e7eb" },
                                },
                                y: {
                                    ticks: { color: "#374151" },
                                    grid: { color: "#e5e7eb" },
                                },
                                },
                            }}
                            />
                        </div>
                    </div>
                )}
                </div>
                </div>
            </div>
        </>
    )
}

export default WorkoutGraph;