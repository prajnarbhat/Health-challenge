import { useContext, useEffect, useState } from "react";
import WorkoutContext from "./WorkoutContext";
const WorkoutTable = () => {

    const {data} = useContext(WorkoutContext)

    const [userData, setData] = useState([])
    const [page,setPage] = useState(1)

    // search and workoutValue
    const [searchValue, setsearchValue] = useState("");
    const [workoutValue, setWorkoutValue] = useState("")

    // Apply useEffect as searchValue,workoutValue changes
    useEffect(() => {

        const result = [...data]

        const ApplySearchByUserName = (users) => {
            return result.filter(user => {
                return user.userName.toLowerCase().includes(searchValue.toLowerCase())
            })
        }

        const ApplyFilterByWorkoutType = (users) => {
            return users.filter(user => 
                user.workouts.some(workout => 
                    workout.workoutType.toLowerCase().includes(workoutValue.toLowerCase())
                )
            )
        }

        const filteredUserNameData = ApplySearchByUserName(result)
        const filterByWorkoutType = ApplyFilterByWorkoutType(result)

        // combining both logic
        const filteredData = [...new Set([...filteredUserNameData, ...filterByWorkoutType])]

        console.log(filteredData)

        setData( searchValue || workoutValue ? filteredData : result);
        setPage(1)
    },[searchValue, workoutValue, data])

    const itemsPerPage = 4;

    let paginatedData = userData.slice((itemsPerPage*page) - itemsPerPage,itemsPerPage*page)

    console.log("Data in table:", data)

    useEffect(() => {
        setData(data);
    })

    const wtype = ["cycling","swimming","yoga","running"]

    const selectPageHandler = (selectedPage) => {
        if(selectedPage >= 1 && selectedPage <= Math.ceil(userData.length/itemsPerPage) && selectedPage != page)
        setPage(selectedPage)
    }

    return (
        <>
        <div className="bg-gray-300 min-h-screen">
        <div className="relative overflow-x-auto bg-gray-400 m-2">
            <input type="search" value={searchValue} onChange={(e) => setsearchValue(e.target.value)}/>
            <select value={workoutValue} onChange={(e) => setWorkoutValue(e.target.value)}>
                <option> Select a workoutType </option>
                {wtype.map(w => (
                    <option> {w} </option>
                ))}

            </select>
        </div>
        <div className="relative overflow-x-auto bg-gray-400 m-2">
        
        <table border="1" className="w-full text-sm text-left rtl:text-right bg-white">
            <thead className="uppercase dark:text-black-900">
                <tr>
                    <th scope="col" className="px-6 py-3"> User Name </th>
                    <th scope="col" className="px-6 py-3"> Workout Type </th>
                    <th scope="col" className="px-6 py-3"> Number of workouts</th>
                    <th scope="col" className="px-6 py-3"> Workout Min </th>
                </tr>
            </thead>
            <tbody className="relative overflow-x-auto w-100 divide-y devide-gray-300">
                {paginatedData.length > 0 ? (
                    paginatedData.map((user,index) => (
                        <tr key={index}>
                        <td className="px-6 py-3"> {user.userName} </td>
                        <td className="px-6 py-3"> {user.workouts.map(workout => workout.workoutType).join(",")}</td>
                        <td className="px-6 py-3">  {user.workouts.map(workout => workout.workoutType).length}</td>
                        <td className="px-6 py-3"> {user.workouts.reduce((acc,workout) => {
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
        </div>

        {userData.length > 0 && (
            <div className="pagination bg-white m-2">

                <span className={page > 1 ? "" : "page_disabled"} onClick={() => selectPageHandler(page-1)}> <button className="previous"> Previous</button></span> 
          
                {[...Array(Math.ceil(userData.length/itemsPerPage))].map((__dirname, index) => (
                    <span onClick={() => selectPageHandler(index+1)} className={page == index+1 ? "page_selected" : ""}> <button> {index + 1} </button></span> ))
                }

                <span className={page < Math.ceil(userData.length/itemsPerPage) ? "" : "page_disabled"} onClick={() => selectPageHandler(page+1)}><button className="next"> Next </button></span>

            </div>
        )}
        </div>
        </>

        
    )
}

export default WorkoutTable;