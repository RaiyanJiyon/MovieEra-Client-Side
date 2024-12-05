// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles and modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

const Banner = () => {
    const [movies, setMovies] = useState([]);

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
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className='w-11/12 mx-auto mt-10'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 15
                    }
                }}
            >
                {movies.map((movie, index) => (
                    <SwiperSlide className='relative' key={index}>
                        <img className='w-full md:h-[320px] rounded-md transition-transform duration-500 ease-in-out transform hover:scale-110' src={movie.posterImage} alt={movie.posterName} />
                        <h2 className='absolute bottom-0 left-0 text-white text-xl font-bold z-10 bg-black bg-opacity-50 p-2 w-full truncate'>
                            {movie.posterName.length > 20 ? `${movie.posterName.substring(0, 20)}...` : movie.posterName}
                        </h2>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
