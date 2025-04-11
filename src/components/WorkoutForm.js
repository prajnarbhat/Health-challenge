import { useContext, useState } from "react";
import WorkoutContext from "./WorkoutContext";

const WorkoutForm = () => {

    const {data, setData} = useContext(WorkoutContext)

    // using useState initialise userName,workoutType,workoutMin
    
    const [ userName, setName] = useState("");
    const [ workoutType, setWorkoutType] = useState("")
    const [ workoutMin, setWorkoutMin] = useState("")

    const mergeWorkoutMin = (workouts) => {
        return workouts.reduce((acc,workout) => {

            // Check if the acc array contains any workout where the workoutType already exists, matching the one we're trying to add.
            let existingWorkoutType = acc.find(w => w.workoutType == workout.workoutType)
            // If a workout with the specified workoutType exists, it returns that specific workout array. If not, it returns null, and we need to create a new workout array.
            
            // if there is any existingWorkoutType returns an array of that workout array
            if(existingWorkoutType) {
                // Add the new workoutMin to the specific workoutMin array within this workout
                existingWorkoutType.workoutMin += Number(workout.workoutMin)
            }
            else {
                acc.push({...workout, workoutMin: Number(workout.workoutMin)})
            }
            return acc;
        },[])
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");

        // Everytime user add a new Workout data to a same user or a different user

        const newWorkoutData = {
            workoutType: workoutType,
            workoutMin: Number(workoutMin)
        }

        console.log(userName,workoutType,workoutMin)

        // [{userName, workouts: [ {workoutType,workoutMin}]}]

        // check if userName already present or not
        // If yes → merge the new workout with existing ones.
      
        let updatedData = data.map(user => {
            if( user.userName === userName) {

                // if there are sameworkoutType
                
                const updatedworkouts = mergeWorkoutMin([...user.workouts, newWorkoutData])
                return {...user, workouts: updatedworkouts}
                
            } 
            return user;
        })

        // If no → adds a new user with this workout.
        if(!data.some(user => user.userName == userName)) {
           updatedData = [{userName, workouts: [newWorkoutData]}]
        }
        console.log("Updated Data:", updatedData)
        setData(updatedData)

        setName("")
        setWorkoutType(" ")
        setWorkoutMin("")

        

    }
    return (
        <>

        <div className="flex items-center justify-center align-middle min-h-screen bg-gray-100 dark-bg-gray-900">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white"> Add User </h5>
                    <div className="form-element">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> UserName </label>
                        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" name={userName} type="text" value={userName} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Workout Type </label>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                        <option> Select a workout type </option>
                        <option> Yoga </option>
                        <option> Running </option>
                        <option> Swimming </option>
                        <option> Cycling </option>
                    </select>
                    </div>
                    <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Workout Min </label>
                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" type="number" value={workoutMin} onChange={(e) => setWorkoutMin(e.target.value)}/>
                    </div>

                    <button className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="Submit"> Submit </button>

                </form>
            </div>
        </div>
        </>
    )
}

export default WorkoutForm;