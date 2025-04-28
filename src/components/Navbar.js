import { Link } from "react-router-dom";
import logo from "../images/HealthyHabits_Logo.webp";

const Navbar = () => {
    return (
        <>
            <nav className="bg-gray-700 text-white shadow-md">
                <div className="container mx-auto flex items-center justify-between px-6 py-3 ml-20">
                    <Link to="/" className="flex items-center space-x-3">
                        <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
                        <h3 className="text-xl font-bold hover:text-blue-300 transition-colors duration-200 text-base font-medium"> Crypto Hunter</h3> 
                     
                    </Link>
                    <div className="flex space-x-6 mr-20"> 
                    <ul className="p-2 flex space-x-6 mr-20">
                        <li>
                        <Link to="/"
                        className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                        Add User
                        </Link>
                        </li>
                        <li>
                        <Link to="/Table"
                        className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                        User Table
                        </Link>
                        </li>
                        <li>
                        <Link to="/chart"
                        className="hover:text-blue-300 transition-colors duration-200 text-base font-medium">
                        User Progress
                        </Link>
                        </li>
                    </ul>
                    
                    </div> 
                </div>
            </nav>
        </>
    )
}

export default Navbar;