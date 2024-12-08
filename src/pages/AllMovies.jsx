import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../components/movies/SearchBar";
import MovieCard from "../components/common/MovieCard";

const AllMovies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://movie-era-server.vercel.app/movies');
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

    const filteredMovies = movies.filter(movie => 
        movie.movieTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-11/12 mx-auto mt-10">
            <div className="my-10">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredMovies.map((movie, idx) => (
                    <MovieCard key={idx} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default AllMovies;
