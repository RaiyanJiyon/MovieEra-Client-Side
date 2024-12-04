import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="sticky top-0 z-10">
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