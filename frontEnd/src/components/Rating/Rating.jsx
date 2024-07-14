
import { Fragment } from 'react';
import './Rating.css'
const Rating = ({ratingsAverage,handleRatings}) => {



const showRating= [1,2,3,4,5,].reverse().map((rating)=>{
  return (
    <Fragment key={rating}>
      <input 
      // defaultChecked={parseInt(ratingsAverage)|| null }
        checked={parseInt(ratingsAverage) === rating} 
        value={rating} 
        className='d-none rating-input' 
        type="radio" 
        name="stars" 
        id={`star-${rating}`} 
         onChange={handleRatings  }
      />
      <label className='w-25  ' htmlFor={`star-${rating}`}>
        <div className="star-stroke">
          <div className="star-fill" />
        </div>
      </label>
    </Fragment>
  );
});





    return (
        <div className="stars m-auto pt-3">
        <div className="container__items w-100 h-100 d-flex align-items-center justify-content-center  gap-0 column-gap-2">
          {showRating}
    
        </div>
  </div>
    );
}

export default Rating;
