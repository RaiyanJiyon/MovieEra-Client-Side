import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "../components/movies/SearchBar";

const AllMovies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:5000/movies');
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
                    <div key={idx} className="card card-compact text-white shadow-lg rounded-lg overflow-hidden">
                        <figure>
                            <img
                                className="w-full h-[300px] object-cover lg:object-fill transition-transform duration-500 ease-in-out transform hover:scale-110"
                                src={movie.moviePoster}
                                alt={`${movie.movieTitle} poster`}
                            />
                        </figure>
                        <div className="card-body p-4 text-black">
                            <h2 className="card-title text-black text-2xl font-bold mb-2">{movie.movieTitle}</h2>
                            <div className="flex justify-start items-center">
                                <div className="flex items-center gap-2">
                                    <FaStar className="text-orange-400" />
                                    <p className="text-gray-400">{`${movie.rating}/5`}</p>
                                </div>
                                <div className="text-sm text-gray-400 ml-14">
                                    {Array.isArray(movie.genre) 
                                        ? movie.genre.join(', ')
                                        : movie.genre
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-400 mb-2">Duration: {movie.duration} mins</p>
                                <p className="text-sm text-gray-400 mb-2">Release Year: {movie.releaseYear}</p>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{movie.summary}</p>
                            <Link to={`/movies/${movie._id}`} className="card-actions justify-start mt-4">
                                <button className="btn bg-[#2ce6e6] text-black font-semibold">See Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllMovies;
