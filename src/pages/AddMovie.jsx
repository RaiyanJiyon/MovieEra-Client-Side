import { useContext, useEffect, useState } from 'react';
import { validateGreaterThan, validateMinLength, validateNotEmpty, validateURL } from '../utils/validations';
import Swal from 'sweetalert2';
import ReactStars from 'react-rating-stars-component';
import { authContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddMovie = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { user } = useContext(authContext);
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        moviePoster: '',
        movieTitle: '',
        genre: [],
        duration: '',
        releaseYear: '',
        summary: '',
        rating: 0
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
        setMovie({ ...movie, [name]: value });
    };

    const handleGenreChange = (selectedOptions) => {
        setMovie({ ...movie, genre: selectedOptions.map(option => option.value) });
    };

    const handleRatingChange = (newRating) => {
        setMovie({ ...movie, email: user.email, rating: newRating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!validateURL(movie.moviePoster)) {
            validationErrors.moviePoster = 'Please enter a valid URL';
        }
        if (!validateNotEmpty(movie.movieTitle) || !validateMinLength(movie.movieTitle, 2)) {
            validationErrors.movieTitle = 'Title must be at least 2 characters long';
        }
        if (!validateNotEmpty(movie.genre)) {
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
            fetch('http://localhost:5000/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Movie Details have been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/movies');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="mt-10">
                <h2 className="text-2xl font-medium text-center">Add Movie</h2>
                <p className="font-medium text-center">Use the form below to add a new movie</p>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
                            required
                        />
                        {errors.moviePoster && <p className="text-red-500 text-sm">{errors.moviePoster}</p>}
                    </div>
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
                            required
                        />
                        {errors.movieTitle && <p className="text-red-500 text-sm">{errors.movieTitle}</p>}
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                            Genre
                        </label>
                        <Select
                            isMulti
                            name="genre"
                            options={genres}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleGenreChange}
                        />
                        {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
                    </div>
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
                            required
                        />
                        {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                    </div>
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
                            required
                        >
                            <option value="">Select Year</option>
                            {years.map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                        {errors.releaseYear && <p className="text-red-500 text-sm">{errors.releaseYear}</p>}
                    </div>
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
                            required
                        ></textarea>
                        {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}
                    </div>
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
                            required
                        />
                        {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                    </div>
                    <button className="btn bg-[#2ce6e6] font-bold w-full text-lg text-white">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddMovie;
