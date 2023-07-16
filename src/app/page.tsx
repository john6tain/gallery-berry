'use client'
import { Gallery } from '@/components/galerry';
import { Thumbnail } from '@/components/thumbnail';
import { fetchImage } from '@/utils/loadImage';
import React from 'react';
import Image from 'next/image'
import { cwd } from 'process';
import { InfinitySpin } from 'react-loader-spinner';

export default function Home() {
  const [images, setImages] = React.useState<any[]>([]);
  const [videos, setVideos] = React.useState<any[]>([]);
  const [folders, setFolders] = React.useState([]);
  const [showGallery, setShowgallery] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  React.useEffect(() => {
    goHome();
  }, [setImages, setFolders]);

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

  function handleClick(dir: string, isDir: boolean) {
    if (isDir) {
      setShowgallery(false);
      setIsLoading(true);
      fetcher(`/api/images?path=${dir}`).then((res: any) => {
        setFolders(res.filter((image: any) => image.isDir));
        const filePaths = res.filter((image: any) => !image.isDir)
        setVideos(filePaths.filter((video: any) => video.imageDir.toLocaleLowerCase().split('.').pop() === 'mp4'));
        setIsLoading(false);
        const fetchImages = async () => {
          setIsLoading(true);
          const promises: Promise<Blob>[] = filePaths
            .filter((image: any) =>
              image.imageDir.toLocaleLowerCase().split('.').pop() === 'jpg' ||
              image.imageDir.toLocaleLowerCase().split('.').pop() === 'png')
            .map((image: any) => fetchImage(`/api/images?path=${image.imageDir}`, image.name));
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
        {videos.length &&
          videos.map((video: any, index) => {
            return (
              <div key={index}>
                <video
                  src={`/api/images?path=${video.imageDir}`}
                  width="800px"
                  height="auto"
                  controls
                  // autoPlay
                  id="video-player"
                />
                <p>{video.name}</p>
              </div>
            );
          }) || ''}

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
            <div key={index}>
              <Image
                src={URL.createObjectURL(image.src)}
                alt={`Image ${index}`}
                onClick={() => { openGallery() }}
                width={250}
                height={250}
              />
              <p>{image.name}</p>
            </div>
          );
        })}
      </>
    )
  }
}
