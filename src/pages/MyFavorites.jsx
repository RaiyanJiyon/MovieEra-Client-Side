import { useContext, useEffect, useState } from "react";
import { authContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const MyFavorites = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const { user } = useContext(authContext);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await fetch(`http://localhost:5000/favorite/${user.email}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setFavorites(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            }
        };
        fetchFavorites();
    }, [user.email]);

    if (error) {
        return <div className="text-center text-red-600">Error: {error}</div>;
    }

    const handleDeleteFavorite = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/favorite/${_id}`, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        setFavorites(favorites.filter(movie => movie._id !== _id));
                        Swal.fire({
                            title: "Deleted!",
                            text: "Movie has been removed from your favorites.",
                            icon: "success"
                        });
                    }
                })
                .catch(error => {
                    console.error("Error deleting favorite movie:", error); 
                    Swal.fire("Error!", "Something went wrong. Please try again.", "error");
                });
            }
        });
    }

    return (
        <div className="w-11/12 mx-auto mt-10">
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((movie, idx) => (
                        movie && (
                            <div key={idx} className="card card-compact text-white shadow-lg rounded-lg overflow-hidden">
                                <figure>
                                    <img
                                        className="w-full h-[300px] object-cover lg:object-fill transition-transform duration-500 ease-in-out transform hover:scale-110"
                                        src={movie.moviePoster || "placeholder-image-url.jpg"} // Use a placeholder image if moviePoster is missing
                                        alt={`${movie.movieTitle || "No Title"} poster`} // Fallback for missing title
                                    />
                                </figure>
                                <div className="card-body p-4 text-black">
                                    <h2 className="card-title text-black text-2xl font-bold mb-2">{movie.movieTitle || "No Title"}</h2>
                                    <div className="flex justify-start items-center">
                                        <div className="flex items-center gap-2">
                                            <FaStar className="text-orange-400" />
                                            <p className="text-gray-400">{`${movie.rating || 0}/5`}</p>
                                        </div>
                                        <div className="text-sm text-gray-400 ml-14">
                                            {
                                                Array.isArray(movie.genre) 
                                                ? movie.genre.join(', ')
                                                : movie.genre
                                            }

                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-gray-400 mb-2">Duration: {movie.duration || "Unknown"} mins</p>
                                        <p className="text-sm text-gray-400 mb-2">Release Year: {movie.releaseYear || "Unknown"}</p>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-2">{movie.summary || "No Summary Available"}</p>
                                    <div className="card-actions justify-start mt-4">
                                        <button onClick={() => handleDeleteFavorite(movie._id)} className="btn bg-red-600 text-white font-bold">Delete Favorite</button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 text-xl font-bold">
                    Your favorite list is empty.
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
