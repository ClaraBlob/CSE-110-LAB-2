import React, { useContext, useEffect, useState } from 'react';
import { dummyNotesList } from "./constants";
import { TitleFavorite } from './titleFavorite';

{/*prop for storing favorite notes*/}
export function NoteFavorite(props: any) {
    const [like, setLike] = useState(false);
    {/*function to check if to remove or add title*/}
    const favorite = () => {
        setLike((prevState) => !prevState);
        props.addFav(props.message);
        {like && props.removeFav(props.message)};
    };
return (
    <div>
        {/*if "❤️" add to list, if "♡" remove*/}
        <button onClick={favorite}
        >{like ? "❤️" : "♡"}</button>
    </div>
 );
  
}

