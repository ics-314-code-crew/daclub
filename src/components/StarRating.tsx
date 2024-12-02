'use client';

import ReactStars from 'react-stars';

// const Rating = () => (
// export default Rating

export default function StarRating() {
  return (
    // eslint-disable-next-line max-len
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', paddingBottom: '100' }}>
      <ReactStars count={5} size={24} color2="#ffd700" />
    </div>
  );
}

// npm i -S react-stars
