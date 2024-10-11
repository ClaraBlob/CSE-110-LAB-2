import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";

export function TitleFavorite(props: { text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {
    return (
    <div>
      {props.text} 
    </div>
  );
}
