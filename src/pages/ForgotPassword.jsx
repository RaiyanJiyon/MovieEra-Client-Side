import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { authContext } from "../contexts/AuthProvider";
import SuccessToaster from "../components/Toaster/SuccessToaster";
import ErrorToaster from "../components/Toaster/ErrorToaster";

const ForgotPassword = () => {
    const location = useLocation();

    const [email, setEmail] = useState(location.state?.email || '');

    const { passwordReset } = useContext(authContext);

    const handleForgetPasswordForm = e => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const email = formData.get('email');
        const newPassword = formData.get('password');
        console.log(newPassword);

        passwordReset(email)
            .then(() => {
                SuccessToaster("A password change email has been sent to your inbox. Please check your email to reset your password.");
                window.open('https://mail.google.com', '_blank');
            })
            .catch(error => {
                console.error(error.message);
                ErrorToaster(error.message);
            });
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Forgot password?
                        </h1>
                        <p className="text-sm font-light text-gray-500">
                            Remember your password? <Link to={"/login"} className="font-medium text-[#E50916] hover:underline">Login here</Link>
                        </p>
                        <form onSubmit={handleForgetPasswordForm} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={e => e.target.value}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full text-white bg-[#E50916] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;