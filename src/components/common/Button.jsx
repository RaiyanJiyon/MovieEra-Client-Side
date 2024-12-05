import PropTypes from 'prop-types'; // ES6

const Button = ({ text }) => {
    return (
        <button type="submit" className="btn w-full bg-[#2ce6e6] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center">{text}</button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired
}

export default Button;