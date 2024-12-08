import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';
import {
    validateGreaterThan,
    validateMinLength,
    validateNotEmpty,
    validateURL,
} from '../utils/validations';

const UpdateMovie = () => {
    const loaderMovieData = useLoaderData();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            ...loaderMovieData,
            genre: loaderMovieData.genre || [],
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const genres = [
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Drama', value: 'Drama' },
        { label: 'Horror', value: 'Horror' },
        { label: 'Fantasy', value: 'Fantasy' },
        { label: 'Action', value: 'Action' },
        { label: 'Thriller', value: 'Thriller' },
        { label: 'Sci-Fi', value: 'Sci-Fi' },
    ];
    const years = [2024, 2023, 2022, 2021, 2020];

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                `https://movie-era-server.vercel.app/movies/${loaderMovieData._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) throw new Error('Network response was not ok');

            const result = await response.json();
            if (result.modifiedCount > 0) {
                await Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Movie Details have been updated',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/movies');
            } else {
                throw new Error('Update was not successful');
            }
        } catch (error) {
            console.error('Update failed:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'Failed to update movie details. Please try again.',
            });
        }
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="mt-10">
                <h2 className="text-2xl font-medium text-center">Update Movie</h2>
                <p className="font-medium text-center">
                    Use the form below to update the movie details
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-6"
                >
                    {/* Movie Poster URL */}
                    <div>
                        <label
                            htmlFor="moviePoster"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Movie Poster URL
                        </label>
                        <input
                            {...register('moviePoster', {
                                validate: (value) =>
                                    validateURL(value) || 'Please enter a valid URL',
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Movie Poster URL"
                        />
                        {errors.moviePoster && (
                            <p className="text-red-500 text-sm">
                                {errors.moviePoster.message}
                            </p>
                        )}
                    </div>

                    {/* Movie Title */}
                    <div>
                        <label
                            htmlFor="movieTitle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Movie Title
                        </label>
                        <input
                            {...register('movieTitle', {
                                validate: (value) =>
                                    validateNotEmpty(value) &&
                                    validateMinLength(value, 2) || 'Title must be at least 2 characters long',
                            })}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Movie Title"
                        />
                        {errors.movieTitle && (
                            <p className="text-red-500 text-sm">
                                {errors.movieTitle.message}
                            </p>
                        )}
                    </div>

                    {/* Genre Selection */}
                    <div>
                        <label
                            htmlFor="genre"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Genre
                        </label>
                        <Controller
                            name="genre"
                            control={control}
                            rules={{
                                validate: (value) =>
                                    value && value.length > 0 || 'At least one genre must be selected',
                            }}
                            render={({ field }) => (
                                <Select
                                    isMulti
                                    options={genres}
                                    {...field}
                                    value={genres.filter((g) =>
                                        field.value.includes(g.value)
                                    )}
                                    onChange={(selectedOptions) =>
                                        field.onChange(
                                            selectedOptions.map((option) => option.value)
                                        )
                                    }
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            )}
                        />
                        {errors.genre && (
                            <p className="text-red-500 text-sm">{errors.genre.message}</p>
                        )}
                    </div>

                    {/* Duration Field */}
                    <div>
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Duration (in minutes)
                        </label>
                        <input
                            {...register('duration', {
                                validate: (value) =>
                                    validateGreaterThan(value, 60) || 'Duration must be greater than 60 minutes',
                            })}
                            type="number"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Duration"
                        />
                        {errors.duration && (
                            <p className="text-red-500 text-sm">{errors.duration.message}</p>
                        )}
                    </div>

{/* Release Year Field */}
<div>
    <label
        htmlFor="releaseYear"
        className="block text-sm font-medium text-gray-700"
    >
        Release Year
    </label>
    <Controller
        name="releaseYear"
        control={control}
        rules={{
            required: 'Release Year is required',
        }}
        render={({ field }) => (
            <select
                {...field}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                onChange={(e) => field.onChange(Number(e.target.value))} // Ensures the value is a number
            >
                <option value="">Select Year</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        )}
    />
    {errors.releaseYear && (
        <p className="text-red-500 text-sm">{errors.releaseYear.message}</p>
    )}
</div>


                    {/* Summary Field */}
                    <div>
                        <label
                            htmlFor="summary"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Summary
                        </label>
                        <textarea
                            {...register('summary', {
                                validate: (value) =>
                                    validateNotEmpty(value) &&
                                    validateMinLength(value, 10) || 'Summary must be at least 10 characters long',
                            })}
                            rows="4"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 focus:ring focus:ring-[#2ce6e6] focus:outline-none"
                            placeholder="Enter Summary"
                        ></textarea>
                        {errors.summary && (
                            <p className="text-red-500 text-sm">{errors.summary.message}</p>
                        )}
                    </div>

                    {/* Rating Field */}
                    <div>
                        <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Rating
                        </label>
                        <Controller
                            name="rating"
                            control={control}
                            rules={{
                                validate: (value) =>
                                    value > 0 || 'Rating must be greater than 0',
                            }}
                            render={({ field }) => (
                                <ReactStars
                                    {...field}
                                    count={5}
                                    onChange={(newValue) => field.onChange(newValue)}
                                    size={30}
                                    isHalf={true}
                                    value={field.value}
                                    activeColor="#ffd700"
                                />
                            )}
                        />
                        {errors.rating && (
                            <p className="text-red-500 text-sm">{errors.rating.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn bg-[#2ce6e6] font-bold w-full text-lg text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isSubmitting ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMovie;
