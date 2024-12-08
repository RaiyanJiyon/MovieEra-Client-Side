import { useLoaderData } from "react-router-dom";

const Blogs = () => {
    const blogs = useLoaderData();

    return (
        <div className="w-11/12 mx-auto mt-10">
            {
                blogs.map((blog, idx) => (
                    <div key={idx} className="relative flex flex-col md:flex-row w-full my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
                        <div className="relative p-2.5 md:w-2/5 shrink-0 overflow-hidden">
                            <img
                                src={blog.image}
                                alt="card-image"
                                className="h-full w-full rounded-md md:rounded-lg object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="mb-4 rounded-full bg-teal-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">Latest</div>
                            <h4 className="mb-2 text-slate-800 text-xl font-semibold">
                                {blog.title}
                            </h4>
                            <p className="mb-8 text-slate-600 leading-normal font-light">
                                {blog.description}
                            </p>
                            <div>
                                {blog.trailer && (
                                    <a
                                        href={blog.trailer}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-800 font-semibold text-sm hover:underline flex items-center"
                                    >
                                        Watch Trailer
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-2 h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Blogs;