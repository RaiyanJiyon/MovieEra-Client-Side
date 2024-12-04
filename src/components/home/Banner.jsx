// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles and modules
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

const Banner = () => {
    const images = [
        "https://www.torrentbd.net/posters/IZ4gvxPUuKBIbANzu19YTgYY27403986.jpg",
        "https://www.torrentbd.net/posters/hxdkLEJIsWAJf7Wu1h66nQYY27540542.jpg",
        "https://m.media-amazon.com/images/M/MV5BOGJmNmRjMDUtMzM1OS00ZTVlLTkzZjUtZjA2NGI4ODI0MjEzXkEyXkFqcGc@._V1_SX300.jpg",
        "https://www.torrentbd.net/posters/u7yVMZAwJoYtzfuo3QaYXAYY16358384.jpg",
        "https://www.torrentbd.net/uploads/images/ce32450de2d61c43392c.jpg",
        "https://www.torrentbd.net/posters/tb9qYfhNJovH3xpWJGEsUQYY26670955.jpg",
        "https://www.torrentbd.net/posters/cnv296kP24dnuVxgxO70GQYY15980138.jpg",
        "https://www.torrentbd.net/posters/dz53Rg7eboyi8yO1GSLuTAYY20215234.jpg",
        "https://www.torrentbd.net/posters/pWK9IfkuYgHa5MMOkD5wewYY9813792.jpg",
        "https://www.torrentbd.net/posters/iWZ3BJae5aPIym4UZrOC4AYY10243672.jpg",
        "https://www.torrentbd.net/posters/LyWt4cANhOTanbecjb5NHQYY27131358.jpg",
        "https://www.torrentbd.net/posters/TrZmZEGDrk5pRVZm1KfXKQYY29268110.jpg",
    ];

    return (
        <div className='bg-[#161616] py-20'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={5}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <img className='w-[250px] h-[243px] md:h-[250px]' src={src} alt={`Slide ${index + 1}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
