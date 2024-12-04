import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const StarRating = () => {
    const [rating, setRating] = useState(0);

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate);
        // other logic
    };

    // Optional callback functions
    const onPointerEnter = () => console.log('Enter');
    const onPointerLeave = () => console.log('Leave');
    const onPointerMove = (value, index) => console.log(value, index);

    return (
        <div className='flex justify-start items-center'>
            <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                ratingValue={rating} // Assign the state value to ratingValue
                className='flex items-center'
            /* Available Props */
            />
        </div>
    );
};

export default StarRating;
