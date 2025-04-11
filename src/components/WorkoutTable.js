import { useContext, useEffect, useState } from "react";
import WorkoutContext from "./WorkoutContext";
const WorkoutTable = () => {

    const {data} = useContext(WorkoutContext)

    const [userData, setData] = useState([])
    const [page,setPage] = useState(1)

    const itemsPerPage = 4;

    let paginatedData = userData.slice((itemsPerPage*page) - itemsPerPage,itemsPerPage*page)

    console.log("Data in table:", data)

    useEffect(() => {
        setData(data);
    })

    const selectPageHandler = (selectedPage) => {
        if(selectedPage >= 1 && selectedPage <= Math.ceil(userData.length/itemsPerPage) && selectedPage != page)
        setPage(selectedPage)
    }

    return (
        <>
        <table border="1">
            <thead>
                <tr>
                    <th> UserName </th>
                    <th> WorkoutType </th>
                    <th> WorkoutMin </th>
                </tr>
            </thead>
            <tbody>
                {paginatedData.length > 0 ? (
                    paginatedData.map((user,index) => (
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

        {userData.length > 0 && (
            <div className="pagination">

                <span className={page > 1 ? "" : "page_disabled"} onClick={() => selectPageHandler(page-1)}> <button> Previous</button></span> 
          
                {[...Array(Math.ceil(userData.length/itemsPerPage))].map((__dirname, index) => (
                    <span onClick={() => selectPageHandler(index+1)} className={page == index+1 ? "page_selected" : ""}> <button> {index + 1} </button></span> ))
                }

                <span className={page < Math.ceil(userData.length/itemsPerPage) ? "" : "page_disabled"} onClick={() => selectPageHandler(page+1)}><button> Next </button></span>

            </div>
        )}
        </>

        
    )
}

export default WorkoutTable;