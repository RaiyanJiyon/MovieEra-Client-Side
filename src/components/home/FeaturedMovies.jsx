import { useEffect, useState } from "react";

const FeaturedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/data/movies.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-11/12 mx-auto">
                {
                    movies.map((movie, idx) => (
                        <div key={idx} className="card card-compact bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    className="w-full h-[300px] transition-transform duration-500 ease-in-out transform hover:scale-110"
                                    src={movie.MoviePoster}
                                    alt={`${movie.MovieTitle} poster`} />
                            </figure>
                            <div className="card-body bg-black text-white">
                                <h2 className="card-title">{movie.MovieTitle}</h2>
                                <p>{movie.Genre}</p>
                                <p>{movie.Duration}</p>
                                <p>{movie.ReleaseYear}</p>
                                <p>{movie.Rating}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">See Details</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedMovies;
