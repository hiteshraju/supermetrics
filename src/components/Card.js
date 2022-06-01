import React from 'react';
import '../css/Card.css';

// Incons

import TagIcon from '@mui/icons-material/Tag';

function Card(props) {
    return (
        <div className="flex-row items-center justify-center p-2 card w-100 h-40 bg-white rounded-md drop-shadow-md mr-5">
            <p className="font-bold text-lg tracking-wider mb-2">{props.icon}{props.title}</p>
            <p className="card-title text-xs tracking-wider mb-2"><TagIcon /> {props.messages} Messages</p>
            <p className="card-title text-xs tracking-wider mb-2"><TagIcon /> {props.average} Average Character / Post</p>
           
        </div>
    )
}

export default Card;
