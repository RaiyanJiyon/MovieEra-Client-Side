import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import logo from '../assets/icons/logo.png'
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthProvider";
import ErrorToaster from "../components/Toaster/ErrorToaster";
import SuccessToaster from "../components/Toaster/SuccessToaster";

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const [passwordToggle, setPasswordToggle] = useState(false);

    const { setUser, signInUser, createUserWithGoogle } = useContext(authContext);

    const handleToggle = () => {
        setPasswordToggle(prev => !prev);
    };

    const handleLoginForm = e => {
        e.preventDefault();

        // Handle form submission
        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email');
        const password = formData.get('password');

        const userLoginInformation = { email, password };

        signInUser(email, password)
            .then(userCredential => {
                SuccessToaster('Successfully Logged In');
                form.reset();
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.error(error);
                ErrorToaster('Incorrect username or password. Please try again.');
            });
    };

    const handleGoogleSignIn = () => {
        createUserWithGoogle()
            .then(result => {
                const user = result.user;
                SuccessToaster("Successfully Sign In with Google");
                setUser(user);
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                ErrorToaster(error.message);
            });
    };

    const navigateToForgetPassword = () => {
        const emailInput = document.getElementById('email');
        navigate('/forgot-password', {
            state: {
                email: emailInput.value,
            },
        });
    };

    return (
        <section className="mt-6">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <Link to={"/"} className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    Discount Pro
                </Link>
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="relative p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleLoginForm} className="space-y-4 md:space-y-6" action="#">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                                <div onClick={handleGoogleSignIn} className="flex items-center md:justify-center gap-2 w-full hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg cursor-pointer">
                                    <FaGoogle className="text-xl" />
                                    <span className="text-base font-medium">Log in with Google</span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type={passwordToggle ? "text" : "password"} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10" required />
                                <div onClick={handleToggle} className='absolute inset-y-0 right-0 flex items-center pr-3 pt-7 cursor-pointer'>
                                    {passwordToggle ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                    </div>
                                </div>
                                <span onClick={navigateToForgetPassword} className="text-sm font-medium text-[#2ce6e6] hover:underline cursor-pointer">Forgot password?</span>
                            </div>
                            <Button text='Login' />
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <Link to={"/register"} className="font-medium text-[#2ce6e6] hover:underline">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;