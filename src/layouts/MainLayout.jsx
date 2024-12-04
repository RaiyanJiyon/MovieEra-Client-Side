import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div>
                <Navbar />
            </div>
            <Outlet />
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;