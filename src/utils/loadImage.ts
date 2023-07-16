// type GalleryImage = {
//     name: string,
//     imageDir: string,
//     isDir: boolean,
// };

export const loadImage = (currentImage: any) => {
    return fetch(`/api/images?path=${currentImage.imageDir}`, {
        method: 'GET',
        headers: {
            "Content-Type": "image/jpeg",
        }
    })
    // .then((response) => {
    //     return covertBlobToImage(response.blob());
    // });
};


export const covertBlobToImage = (imageBlob: any) => {
    // return new Promise((resolve, reject) => {
    const image = new Image();
    // image.onload = () => resolve(image);
    // image.onerror = (err) => reject(err);
    image.src = URL.createObjectURL(imageBlob)

    return image;
    // });
};