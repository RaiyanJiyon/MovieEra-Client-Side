import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import logo from '../assets/icons/logo.png'
import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthProvider";
import ErrorToaster from "../components/Toaster/ErrorToaster";
import SuccessToaster from "../components/Toaster/SuccessToaster";

const Register = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const { createUserWithEmail } = useContext(authContext)

    const [passwordToggle, setPasswordToggle] = useState(false);

    const handlePasswordToggle = () => {
        setPasswordToggle(prev => !prev);
    }

    const handleRegisterForm = e => {
        e.preventDefault();

        // Handle form submission
        const form = e.currentTarget;
        const formData = new FormData(form);

        const name = formData.get('name');
        const email = formData.get('email');
        const photoURL = formData.get('photoURL');
        const password = formData.get('password');

        const userInformation = { name, email, photoURL, password }

        console.log(userInformation);

        const validPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!validPassword.test(password)) {
            ErrorToaster('Password must be at least 6 characters long and contain at least 1 uppercase and 1 lowercase letter.');
            return;
        }

        createUserWithEmail(email, password)
            .then(userCredential => {
                console.log(userCredential.user);
                SuccessToaster('Successfully Signed In');
                form.reset();
                navigate('/');
            })
            .catch(error => {
                console.error(error.message);
                ErrorToaster(error.message);
            });
    };

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-6 lg:py-0">
                <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    Discount Pro
                </Link>
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form onSubmit={handleRegisterForm} className="space-y-4 md:space-y-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                                <div className="flex items-center md:justify-center gap-2 w-full hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer">
                                    <FaGoogle className="text-xl" />
                                    <span className="text-base font-medium">Sign up with Google</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                    placeholder="name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="photoURL" className="block mb-2 text-sm font-medium text-gray-900">Your photo url</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    id="photoURL"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                    placeholder="photo url"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input
                                    type={passwordToggle ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 pr-10"
                                    required
                                />
                                <div onClick={handlePasswordToggle} className='absolute inset-y-0 right-0 flex items-center pr-3 pt-7 cursor-pointer'>
                                    {passwordToggle ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <Button text={"Create an account"} />
                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link to={"/login"} className="font-medium text-[#E50916] hover:underline">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
