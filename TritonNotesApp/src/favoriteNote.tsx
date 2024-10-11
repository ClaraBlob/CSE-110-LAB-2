import React, { useContext, useEffect, useState } from 'react';
import { dummyNotesList } from "./constants";
import { TitleFavorite } from './titleFavorite';
export function NoteFavorite(props: any) {
    const [like, setLike] = useState(false);
    const favorite = () => {
        setLike((prevState) => !prevState);
        props.addFav(props.message);
        {like && props.removeFav(props.message)};
    };
return (
    <div>
        <button onClick={favorite}
        >{like ? "❤️" : "♡"}</button>
    </div>
 );
  
}

