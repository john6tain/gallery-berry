import React from "react";
import { Gallery } from "./galerry";
import { cwd } from "process";

type ThumbnailProps = {
    name: string,
    imageDir: string,
    isDir: boolean,
    onPress: any,
    openGallery: any
};

export function Thumbnail({ name, imageDir, isDir, onPress, openGallery }: ThumbnailProps) {
    // const [imageURL, setImageUrl] = React.useState('')
    if (isDir) {
        return (
            <>
                <a href='#' onClick={onPress}>
                    <p>{name}</p>
                    {/* <img src={imageDir} alt={name} width="5%" height="5%" /> */}
                </a>
            </>
        )
    } else {
        // fetch(`/api/images?path=${imageDir}`)
        //     .then((response) => response.blob())
        //     .then((myBlob) => {
        //         const objectURL = URL.createObjectURL(myBlob);
        //         setImageUrl(objectURL);
        //     });
        // return (
        //     <>
        //         <img src={imageURL} alt={name} width="25%" height="25%" onClick={openGallery} />
        //         <p>{name}</p>
        //     </>
        // )
    }

}