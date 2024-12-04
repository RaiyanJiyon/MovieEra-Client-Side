import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../contexts/AuthProvider";
import logo from '../../assets/icons/logo.png'

const Navbar = () => {
    const { user } = useContext(authContext);

    const links = <>
        <NavLink to={"/"} className={({ isActive }) => isActive ? 'font-bold underline' : 'font-normal'}>Home</NavLink>
        <NavLink to={"/movies"} className={({ isActive }) => isActive ? 'font-bold underline' : 'font-normal'}>All Movies</NavLink>
        <NavLink to={"/add-movie"} className={({ isActive }) => isActive ? 'font-bold underline' : 'font-normal'}>Add Movie</NavLink>
        <NavLink to={"/favorites"} className={({ isActive }) => isActive ? 'font-bold underline' : 'font-normal'}>My Favorites</NavLink>
        {
            user &&
            <NavLink to={"/profile"} className={({ isActive }) => isActive ? 'font-bold underline' : 'font-normal'}>My Profile</NavLink>
        }
    </>

    return (
        <div className="navbar bg-[#1b1b1c] text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={"/"} className="btn btn-ghost text-xl">
                    <img className="w-8" src={logo} alt="website logo" />
                    <span>Lingo Bingo</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Profile image"
                                        src={user ? user.photoURL : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fblank-profile-pic&psig=AOvVaw3A7ocg8Ov4kMh92B2MEolH&ust=1732366004923000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLDH7rf874kDFQAAAAAdAAAAABAE"} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-[#1e0e5c] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to={"/profile"} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link to={"/profile/update"}>Update Profile</Link></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <Link to={"/login"} className="px-4 py-1 rounded-3xl bg-[#1e0e5c] text-white font-semibold border-2 border-[#7461be] hover:bg-white hover:text-black">Login</Link>
                }
            </div>
        </div >
    );
};

export default Navbar;