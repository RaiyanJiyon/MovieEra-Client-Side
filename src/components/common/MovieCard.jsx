import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; // ES6

const MovieCard = ({ movie }) => {
    return (
            <div className="card card-compact text-white shadow-lg rounded-lg overflow-hidden">
                <figure>
                    <img
                        className="w-full h-[300px] object-cover lg:object-fill transition-transform duration-500 ease-in-out transform hover:scale-110"
                        src={movie.moviePoster}
                        alt={`${movie.movieTitle} poster`}
                    />
                </figure>
                <div className="card-body p-4 text-black">
                    <h2 className="card-title text-black text-2xl font-bold mb-2 ">{movie.movieTitle}</h2>
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
    );
};

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MovieCard;