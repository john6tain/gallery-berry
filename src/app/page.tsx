'use client'
import { Gallery } from '@/components/galerry';
import { Thumbnail } from '@/components/thumbnail';
import { covertBlobToImage, loadImage, readFiles } from '@/utils/loadImage';
import React from 'react';
import Image from 'next/image'
import { cwd } from 'process';

export default function Home() {
  const [images, setImages] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [showGallery, setShowgallery] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  React.useEffect(() => {
    fetcher('/api/images').then((res: any) => {
      setImages(res.filter((image: any) => !image.isDir));
      setFolders(res.filter((image: any) => image.isDir));
    }, error =>
      console.log(error)
    )
  }, [setImages, setFolders]);


  function handleClick(dir: string, isDir: boolean) {
    if (isDir) {
      setShowgallery(false);
      fetcher(`/api/images?path=${dir}`).then((res: any) => {
        const images = res.filter((image: any) => !image.isDir)
        console.log(images);
        setImages(images);
        setFolders(res.filter((image: any) => image.isDir));
      }, error =>
        console.log(error)
      )
    } else {
      debugger
    }
  }
  function openGallery(dir: string, isDir: boolean) {
    if (!isDir) {
      setShowgallery(true);
    }
  }
  if (showGallery) {
    return (
      <>
        <Gallery rawImages={images} handleClick={() => handleClick('', true)}></Gallery>
      </>
    )

  } else {
    return (
      <>
        <a href='#'>
          <h1 className="text-center mb-2" onClick={() => handleClick('', true)}>Gallery berry 2</h1>
        </a>
        {!images.length && folders.map((image: any) => (
          <Thumbnail
            key={image.key}
            name={image.name}
            imageDir={image.imageDir}
            isDir={image.isDir}
            onPress={() => handleClick(image.imageDir, image.isDir)}
            openGallery={() => openGallery(image.imageDir, image.isDir)}></Thumbnail>
        )) || images.map((image: any) => {
          return (
            <div>
              <img
                key={image.key}
                src={`/api/images?path=${image.imageDir}`}
                alt="Your Image"
                onLoad={handleImageLoad}
                width="25%" height="25%"
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onClick={() => openGallery(image.imageDir, image.isDir)}
              />
              {!imageLoaded && <p>Loading image...</p>}
              {imageLoaded && (
                <div>
                  {/* Your components that you want to render after the image is loaded */}
                </div>
              )}
            </div>
          );
        })}
      </>
    )
  }
}
