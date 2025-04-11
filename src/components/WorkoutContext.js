// Store and retrieve data from localStorage
// Provide global access using React Context

import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext } from "react";

// Create a context (CreateContext) to share data globally.
export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({children}) => {

    // Use the useLocalStorage hook to store all workout entries (as an array of objects).
    const [data, setData] =  useLocalStorage('data',[])

    return (
         <WorkoutContext.Provider value={{data,setData}}>
            {children}
 
        </WorkoutContext.Provider>
    )


    



}

export default WorkoutContext;