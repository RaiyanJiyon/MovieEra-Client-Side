import { useEffect } from "react";
import Banner from "../components/home/Banner";
import Section1 from "../components/home/ExtraSections/Section1";
import Section2 from "../components/home/ExtraSections/Section2";
import FeaturedMovies from "../components/home/FeaturedMovies";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <div>
                <Banner />
            </div>
            <div className="pt-10 md:pt-20">
                <FeaturedMovies />
            </div>
            <div className="pt-10 md:pt-20">
                <Section1 />
            </div>
            <div className="pt-10 md:pt-20">
                <Section2 />
            </div>
        </div>
    );
};

export default Home;