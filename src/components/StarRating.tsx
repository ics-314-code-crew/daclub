'use client';

import ReactStars from 'react-stars';

// const Rating = () => (
// export default Rating

export default function StarRating() {
  return (
    <div>
      <h2>NextJs Star Ratings - GeeksforGeeks</h2>
      <ReactStars count={5} size={24} color2="#ffd700" />
    </div>
  );
}

// npm i -S react-stars
