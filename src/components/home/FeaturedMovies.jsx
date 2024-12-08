import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import MovieCard from "../common/MovieCard";

const FeaturedMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://movie-era-server.vercel.app/featured-movies');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="w-11/12 mx-auto">
            <h2 className="text-2xl text-[#1f9797] font-bold text-left">Featured Movies</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {
                    movies.map((movie, idx) => (
                        <MovieCard key={idx} movie={movie} />
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedMovies;
