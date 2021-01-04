import React from 'react';
import solidStar from '../img/star-solid.svg';
import halfStar from '../img/star-half.svg';
import emptyStar from '../img/star-empty.svg';

const Stars = (props) => {

    const { ranking, fontSize } = props;
    let full = Math.floor(ranking); //5
    let check = parseFloat((ranking - full).toFixed(1)); //0.0
    let starList = [];
    for (let i = 0; i < full; i++) {
        starList.push(solidStar);
    }
    if (starList.length < 5) {
        if (check >= 0.8) {
            starList.push(solidStar);
        } else if (check >= 0.3) {
            starList.push(halfStar);
        } else {
            starList.push(emptyStar);
        }
    }
    while (starList.length < 5) {
        starList.push(emptyStar);
    }

    // console.log(starList);

    return (
        <React.Fragment>
            {starList.map((item, index) => <img key={index} src={item} alt="" height={fontSize} />)}
        </React.Fragment>
    );

}

export default Stars;