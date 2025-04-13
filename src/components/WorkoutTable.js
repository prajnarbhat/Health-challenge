import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            if(!searchValue) return [];
            return result.filter(user => {
                return user.userName.toLowerCase().includes(searchValue.toLowerCase())
            })
        }

        const ApplyFilterByWorkoutType = (users) => {
            if(!workoutValue) return [];
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

        setData( searchValue || workoutValue ? filteredData : result);
        setPage(1);
    },[searchValue, workoutValue, data])

    const itemsPerPage = 4;
    let paginatedData = userData.slice((itemsPerPage*page) - itemsPerPage,itemsPerPage*page)
    const wtype = ["cycling","swimming","yoga","running"]

    const selectPageHandler = (selectedPage) => {
        if(selectedPage >= 1 && selectedPage <= Math.ceil(userData.length/itemsPerPage) && selectedPage != page)
        setPage(selectedPage)
    }

    return (
        <>
        <div className="bg-gray-300 min-h-screen">
            <div className="flex justify-around pt-5">
                <button> <Link to="/Table" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">User table</Link></button>
                <button> <Link to="/chart" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> User Progress  </Link></button>
            </div>
            <div className="block m-4 p-3 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="m-3">
                    <Link to="/" className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Add user </Link>    
                </div>
            </div>
            <div className="block m-4 p-3 bg-gray-200 border border-gray-100 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex flex-row gap-x-4 pt-5 ml-2 md:flex flex-col">
                    <input className="bg-white text-black-1000 p-2 text-black-1000 md:w-w/2 m-2" type="search" placeholder="Search by name" value={searchValue} onChange={(e) => setsearchValue(e.target.value)}/>
                    <select className="bg-white text-black-1000 p-2 text-black-1000 md:w-w/2 m-2" value={workoutValue} onChange={(e) => setWorkoutValue(e.target.value)}>
                        <option> Select a workoutType </option>
                        {wtype.map(w => (
                        <option> {w} </option>
                        ))}
                    </select>
                </div>
        
                <div className="block relative overflow-x-auto bg-gray-400 m-2">
        
                <table border="1" className="w-full text-sm text-left rtl:text-right bg-white">
                    <thead className="uppercase dark:text-black-900">
                    <tr>
                        <th scope="col" className="px-4 py-3"> User Name </th>
                        <th scope="col" className="px-4 py-3"> Workout Type </th>
                        <th scope="col" className="px-4 py-3"> Number of workouts</th>
                        <th scope="col" className="px-4 py-3"> Workout Min </th>
                    </tr>
                    </thead>
                    <tbody className="relative overflow-x-auto w-100 divide-y devide-gray-300">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((user,index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3"> {user.userName} </td>
                                    <td className="px-4 py-3"> {user.workouts.map(workout => workout.workoutType).join(",")}</td>
                                    <td className="px-4 py-3">  {user.workouts.map(workout => workout.workoutType).length}</td>
                                    <td className="px-4 py-3"> {user.workouts.reduce((acc,workout) => {
                                        return acc + Number(workout.workoutMin)
                                        },0)} </td>
                                </tr>   
                            ))
                        ) : (
                                <tr>
                                    <td className="px-4 py-3 text-lg"> No data found</td>
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
        </div>
        </>    
    )
}

export default WorkoutTable;