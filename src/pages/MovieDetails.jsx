import { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MovieDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const MovieData = useLoaderData();
    const navigate = useNavigate();

    const handleDelete = (_id) => {
        console.log(_id)
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
                fetch(`http://localhost:5000/movies/${MovieData._id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Movie has been deleted.",
                                icon: "success"
                            });
                            navigate('/movies')
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting coffee:", error);
                        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
                    });

            } else {
                Swal.fire("Cancelled!", "Your movie is safe.");
            }
        });
    }

    const handleAddToFavorite = (_id) => {
        console.log('Added to favorite list', _id);
    }

    return (
        <div className="w-11/12 mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-4 text-center">{MovieData.movieTitle}</h1>
            <div className="hero w-full">
                <div className="hero-content flex-col lg:flex-row items-start">
                    <img
                        src={MovieData.moviePoster}
                        className="rounded-lg shadow-2xl w-full max-h-[500px] object-cover lg:object-fill" />
                    <div className="w-full lg:ml-10 mt-10 lg:mt-0">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg h-full">
                                <thead>
                                    <tr>
                                        <th className="text-2xl font-bold p-4 text-left bg-gray-100 text-gray-700">{MovieData.movieTitle}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-4 py-2 font-bold text-gray-600">Genre</td>
                                        <td className="px-4 py-2">{MovieData.genre}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-4 py-2 font-bold text-gray-600">Released</td>
                                        <td className="px-4 py-2">{MovieData.releaseYear}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-4 py-2 font-bold text-gray-600">Duration</td>
                                        <td className="px-4 py-2">{MovieData.duration}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-4 py-2 font-bold text-gray-600">Rating</td>
                                        <td className="px-4 py-2">{MovieData.rating}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-4 py-2 font-bold text-gray-600">Summary</td>
                                        <td className="px-4 py-2">{MovieData.summary}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-10 space-x-4">
                <button
                    className="btn bg-red-600 text-white font-bold"
                    onClick={() => handleDelete(MovieData._id)}
                >
                    Delete
                </button>
                <button
                    className="btn bg-green-600 text-white font-bold"
                    onClick={() => handleAddToFavorite(MovieData._id)}
                >
                    Add to Favorite
                </button>
                <Link to="/movies" className="btn bg-[#2ce6e6] font-bold">
                    See all movies
                </Link>
            </div>
        </div>
    );
};

export default MovieDetails;
