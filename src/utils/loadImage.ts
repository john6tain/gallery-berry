// type GalleryImage = {
//     name: string,
//     imageDir: string,
//     isDir: boolean,
// };

export const loadImage = (currentImage: any) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (err) => reject(err);
        image.src = `/api/images?path=${currentImage.imageDir}`;
        image.name= currentImage.name;
    });
};