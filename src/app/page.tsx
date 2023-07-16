'use client'
import { Gallery } from '@/components/galerry';
import { Thumbnail } from '@/components/thumbnail';
import { fetchImage } from '@/utils/loadImage';
import React from 'react';
import Image from 'next/image'
import { cwd } from 'process';
import { InfinitySpin } from 'react-loader-spinner';

export default function Home() {
  const [images, setImages] = React.useState<Blob[]>([]);
  const [folders, setFolders] = React.useState([]);
  const [showGallery, setShowgallery] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  
  function goHome() {
    setShowgallery(false);
    setIsLoading(true);
    fetcher('/api/images').then((res: any) => {
      setImages(res.filter((image: any) => !image.isDir));
      setFolders(res.filter((image: any) => image.isDir));
      setIsLoading(false);
    }, error =>
      console.log(error)
    )
  }
  React.useEffect(() => {
    goHome();
  }, [setImages, setFolders]);


  function handleClick(dir: string, isDir: boolean) {
    if (isDir) {
      setShowgallery(false);
      setIsLoading(true);
      fetcher(`/api/images?path=${dir}`).then((res: any) => {
        setFolders(res.filter((image: any) => image.isDir));
        const images = res.filter((image: any) => !image.isDir)
        setIsLoading(false);
        const fetchImages = async () => {
          setIsLoading(true);
          const promises: Promise<Blob>[] = images.map((image: any) => fetchImage(`/api/images?path=${image.imageDir}`));
          try {
            const images: Blob[] = await Promise.all(promises);
            setImages(images);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching images:', error);
          }
        };

        fetchImages();
      }, error =>
        console.log(error)
      )
    } else {
      debugger
    }
  }
  function openGallery() {
    setShowgallery(true);
  }
  if (showGallery) {
    return (
      <>
        <Gallery images={images.map(image => ({ src: URL.createObjectURL(image) }))} handleClick={() => goHome()}></Gallery >
      </>
    )

  } else {
    return (
      <>
        <div className='flex justify-between'>
          <a href='#' className='grow'>
            <h1 className="text-center mb-2" onClick={() => handleClick('', true)}>Gallery berry 2</h1>
          </a>
          {isLoading && <div className='float-right'>
            <InfinitySpin
              width='150'
              color="#4fa94d"
            />
          </div>}

        </div>

        {!images.length && folders.map((image: any) => (
          <Thumbnail
            key={image.key}
            name={image.name}
            imageDir={image.imageDir}
            isDir={image.isDir}
            onPress={() => handleClick(image.imageDir, image.isDir)}
            openGallery={() => openGallery()}></Thumbnail>
        )) || images.map((image: any, index) => {
          return (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
              onClick={() => { openGallery() }}
              width={250}
              height={250}
            />
          );
        })}
      </>
    )
  }
}
