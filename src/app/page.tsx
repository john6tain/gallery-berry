'use client'
import { Gallery } from '@/components/galerry';
import { Thumbnail } from '@/components/thumbnail';
import React from 'react';
import useSWR from 'swr';

export default function Home() {
  const [images, setImages] = React.useState([]);
  const [showGallery, setShowgallery] = React.useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(`/api/images`, fetcher); //?path=${path}

  React.useEffect(() => {
    fetcher('/api/images').then((res: any) => {
      setImages(res);
    }, error =>
      console.log(error)
    )
  }, [setImages]);

  function handleClick(dir: string, isDir: boolean) {
    if (isDir) {
      setShowgallery(false);
      fetcher(`/api/images?path=${dir}`).then((res: any) => {
        setImages(res);
      }, error =>
        console.log(error)
      )
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

        {images.map((image: any) => (
          <Thumbnail
            key={image.key}
            name={image.name}
            imageDir={image.imageDir}
            isDir={image.isDir}
            onPress={() => handleClick(image.imageDir, image.isDir)}
            openGallery={() => openGallery(image.imageDir, image.isDir)}></Thumbnail>
        ))}
      </>
    )
  }
}
