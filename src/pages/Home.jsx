import Banner from "../components/home/Banner";
import FeaturedMovies from "../components/home/FeaturedMovies";

const Home = () => {
    return (
        <div>
            <div>
                <Banner />
            </div>
            <div className="pt-20">
                <FeaturedMovies />
            </div>
        </div>
    );
};

export default Home;