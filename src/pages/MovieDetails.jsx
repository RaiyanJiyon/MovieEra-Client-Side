import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

const MovieDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const MovieData = useLoaderData();

    return (
        <div className="w-11/12 mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-4 text-center">{MovieData.movieTitle}</h1>
            <div className="hero w-full">
                <div className="hero-content flex-col lg:flex-row items-start">
                    <img
                        src={MovieData.moviePoster}
                        className="rounded-lg shadow-2xl max-h-[500px]" />
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
            <Link to={'/movies'} className="mt-10 flex justify-center">
            <button className="btn bg-[#2ce6e6] font-bold">See all movies</button>
            </Link>
        </div>
    );
};

export default MovieDetails;
