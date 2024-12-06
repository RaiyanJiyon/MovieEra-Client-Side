import { useEffect, useState } from "react";

const FeaturedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('/data/banner.json');
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
                        <div key={idx} className='relative md:transition-transform md:duration-500 md:ease-in-out md:transform md:hover:scale-110'>
                            <img className='w-full md:h-[320px] rounded-md' src={movie.posterImage} alt={movie.posterName} />
                            <div className='absolute bottom-0 left-0 font-bold z-10 bg-[#E6E6E6] bg-opacity-50 px-2 py-6 w-full truncate'>
                                <div className="flex items-center justify-start gap-2 text-sm text-[#800000]">
                                    <p>
                                        {`${movie.releaseDay} days ago`}
                                    </p>
                                    <p>
                                        {`${movie.hits} Hits`}
                                    </p>
                                </div>
                                <p>{movie.posterName}</p>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturedMovies;
