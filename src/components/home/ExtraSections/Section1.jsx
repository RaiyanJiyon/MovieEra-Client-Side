import phoneImg from '../../../assets/images/phone.png'

const Section1 = () => {
    return (
        <div className="hero min-h-screen bg-white">
            <div className="hero-content flex-col lg:flex-row gap-10 md:gap-20">
                <img
                    src={phoneImg}
                    className="md:w-2/5 rounded-lg" />
                <div className='md:w-1/2'>
                    <h1 className="text-5xl font-bold">It has never been easier to watch free movies online.</h1>
                    <p className="py-6">
                        Once you register for a free account with Plex, we’ll keep your place from screen to screen as long as you’re signed in. No matter what device you choose, your free movies will pick up where you left off with ease.
                    </p>
                    <button className="btn bg-[#2ce6e6] font-bold">Watch Free</button>
                </div>
            </div>
        </div>
    );
};

export default Section1;