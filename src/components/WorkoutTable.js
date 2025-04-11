import { useContext, useEffect, useState } from "react";
import WorkoutContext from "./WorkoutContext";
const WorkoutTable = () => {

    const {data} = useContext(WorkoutContext)

    const [userData, setData] = useState([])

    console.log("Data in table:", data)

    useEffect(() => {
        setData(data);
    })

    return (
        <table border="1">
            <thead>
                <tr>
                    <th> UserName </th>
                    <th> WorkoutType </th>
                    <th> WorkoutMin </th>
                </tr>
            </thead>
            <tbody>
                {userData.length > 0 ? (
                    userData.map((user,index) => (
                        <tr key={index}>
                        <td> {user.userName} </td>
                        <td> {user.workouts.map(workout => workout.workoutType).join(",")}</td>
                        <td> {user.workouts.reduce((acc,workout) => {
                            return acc + Number(workout.workoutMin)
                        },0)} </td>
                        </tr>   
                    ))
                ) : (
                    <tr>
                        <td> No data found</td>
                    </tr>
                )}
               
            </tbody>

        </table>
    )
}

export default WorkoutTable;