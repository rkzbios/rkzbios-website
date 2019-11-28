import React from 'react';

import Coverflow from 'react-coverflow';

const fn = () => {}

const MovieSelector = (props) => {
  return(<Coverflow
    width={660}
    height={240}
    displayQuantityOfSide={2}
    navigation={false}
    enableHeading={false}
  >
    <div
      onClick={() => fn()}
      onKeyDown={() => fn()}
      role="menuitem"
      tabIndex="0"
      style={{width: 100}}
    >
      <img
        src='https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg'
        alt='title or description'
        style={{ display: 'block', height: 200 }}
      />
    </div>
    <img src='https://image.tmdb.org/t/p/w500/vfzE3pjE5G7G7kcZWrA3fnbZo7V.jpg' alt='title or description' data-action="" />
    <img src='https://image.tmdb.org/t/p/w500/aAW4W8x41TwWQUQpLQqkWNQbtlv.jpg' alt='title or description' data-action="" />
  </Coverflow>);
}

export default MovieSelector;
