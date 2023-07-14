import React from "react";
import { Gallery } from "./galerry";

type ThumbnailProps = {
    name: string,
    imageDir: string,
    isDir: boolean,
    onPress: any,
    openGallery: any
};

export function Thumbnail({ name, imageDir, isDir, onPress, openGallery }: ThumbnailProps) {
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
        return (
            <>
                <img src={imageDir} alt={name} width="25%" height="25%" onClick={openGallery} />
                <p>{name}</p>
            </>
        )
    }

}