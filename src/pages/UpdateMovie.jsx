import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import { validateGreaterThan, validateMinLength, validateNotEmpty, validateURL } from '../utils/validations';

const UpdateMovie = () => {
    const loaderMovieData = useLoaderData();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [movie, setMovie] = useState({
        ...loaderMovieData,
        genre: loaderMovieData.genre || []
    });

    const [errors, setErrors] = useState({});

    const genres = [
        { label: "Comedy", value: "Comedy" },
        { label: "Drama", value: "Drama" },
        { label: "Horror", value: "Horror" },
        { label: "Fantasy", value: "Fantasy" },
        { label: "Action", value: "Action" },
        { label: "Thriller", value: "Thriller" },
        { label: "Sci-Fi", value: "Sci-Fi" }
    ];
    const years = [2024, 2023, 2022, 2021, 2020];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleGenreChange = (selectedOptions) => {
        const selectedGenres = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setMovie(prev => ({ ...prev, genre: selectedGenres }));
        if (errors.genre) {
            setErrors(prev => ({ ...prev, genre: null }));
        }
    };

    const handleRatingChange = (newRating) => {
        setMovie(prev => ({ ...prev, rating: newRating }));
        if (errors.rating) {
            setErrors(prev => ({ ...prev, rating: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateURL(movie.moviePoster)) {
            validationErrors.moviePoster = 'Please enter a valid URL';
        }
        if (!validateNotEmpty(movie.movieTitle) || !validateMinLength(movie.movieTitle, 2)) {
            validationErrors.movieTitle = 'Title must be at least 2 characters long';
        }
        if (!movie.genre || movie.genre.length === 0) {
            validationErrors.genre = 'At least one genre must be selected';
        }
        if (!validateNotEmpty(movie.duration) || !validateGreaterThan(movie.duration, 60)) {
            validationErrors.duration = 'Duration must be greater than 60 minutes';
        }
        if (!validateNotEmpty(movie.releaseYear)) {
            validationErrors.releaseYear = 'Release year is required';
        }
        if (!validateNotEmpty(movie.summary) || !validateMinLength(movie.summary, 10)) {
            validationErrors.summary = 'Summary must be at least 10 characters long';
        }
        if (!movie.rating || movie.rating === 0) {
            validationErrors.rating = 'Rating is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = await fetch(`https://movie-era-server.vercel.app/movies/${loaderMovieData._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movie)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.modifiedCount > 0) {
                    await Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Movie Details have been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/movies');
                } else {
                    throw new Error('Update was not successful');
                }
            } catch (error) {
                console.error('Update failed:', error);
                await Swal.fire({
                    icon: "error",
                    title: "Update Failed",
                    text: "Failed to update movie details. Please try again.",
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="mt-10">
                <h2 className="text-2xl font-medium text-center">Update Movie</h2>
                <p className="font-medium text-center">Use the form below to update the movie details</p>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    {/* Movie Poster URL */}
                    <div>
                        <label htmlFor="moviePoster" className="block text-sm font-medium text-gray-700">
                            Movie Poster URL
                        </label>
                        <input
                            type="url"
                            name="moviePoster"
                            id="moviePoster"
                            value={movie.moviePoster}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Movie Poster URL"
                        />
                        {errors.moviePoster && <p className="text-red-500 text-sm">{errors.moviePoster}</p>}
                    </div>

                    {/* Movie Title */}
                    <div>
                        <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-700">
                            Movie Title
                        </label>
                        <input
                            type="text"
                            name="movieTitle"
                            id="movieTitle"
                            value={movie.movieTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Movie Title"
                        />
                        {errors.movieTitle && <p className="text-red-500 text-sm">{errors.movieTitle}</p>}
                    </div>

                    {/* Genre Selection */}
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                            Genre
                        </label>
                        <Select
                            isMulti
                            name="genre"
                            options={genres}
                            value={genres.filter(g => movie.genre.includes(g.value))}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleGenreChange}
                        />
                        {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
                    </div>

                    {/* Duration */}
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration (minutes)
                        </label>
                        <input
                            type="number"
                            name="duration"
                            id="duration"
                            value={movie.duration}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Duration"
                            min="60"
                        />
                        {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                    </div>

                    {/* Release Year */}
                    <div>
                        <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
                            Release Year
                        </label>
                        <select
                            name="releaseYear"
                            id="releaseYear"
                            value={movie.releaseYear}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                        >
                            <option value="">Select Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
                    </div>

                    {/* Summary */}
                    <div>
                        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                            Summary
                        </label>
                        <textarea
                            name="summary"
                            id="summary"
                            value={movie.summary}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Summary"
                            rows="4"
                        ></textarea>
                        {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}
                    </div>

                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Rating
                        </label>
                        <ReactStars
                            count={5}
                            value={movie.rating}
                            onChange={handleRatingChange}
                            size={40}
                            isHalf={true}
                            activeColor="#ffd700"
                        />
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`btn bg-[#2ce6e6] font-bold w-full text-lg text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMovie;