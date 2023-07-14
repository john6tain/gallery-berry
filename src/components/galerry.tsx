import { useState } from "react";
import Lightbox, { ImagesListType } from "react-spring-lightbox";

// const images: ImagesListType = [
//     {
//         src: 'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
//         loading: 'lazy',
//         alt: 'Windows 10 Dark Mode Setting',
//     },
//     {
//         src: 'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
//         loading: 'lazy',
//         alt: 'macOS Mojave Dark Mode Setting',
//     },
//     {
//         src: 'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
//         loading: 'lazy',
//         alt: 'Android 9.0 Dark Mode Setting',
//     },
// ];

export function Gallery({ rawImages, handleClick }: any) {

    const images = rawImages.map((image: any) => ({ src: image.imageDir }));

    const [currentImageIndex, setCurrentIndex] = useState(0);

    const gotoPrevious = () =>
        currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

    const gotoNext = () =>
        currentImageIndex + 1 < images.length &&
        setCurrentIndex(currentImageIndex + 1);

    function togleFullScreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }

    }

    return (
        <>
            <Lightbox
                isOpen={true}
                onPrev={gotoPrevious}
                onNext={gotoNext}
                images={images}
                currentIndex={currentImageIndex}
                /* Add your own UI */
                renderHeader={() => (
                    <div>
                        <a href='#'>
                            <h1 className="text-center mt-4" onClick={handleClick}>Gallery berry 2</h1>
                        </a>
                        <button className="m-4 float-right" onClick={togleFullScreen}>
                            <svg className="w-6 h-6 text-slate-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"></path>
                                <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"></path>
                            </svg>
                        </button>
                    </div >

                )
                }
            // renderFooter={() => (<CustomFooter />)}
            // renderPrevButton={() => (<CustomLeftArrowButton />)}
            // renderNextButton={() => (<CustomRightArrowButton />)}
            // renderImageOverlay={() => (<ImageOverlayComponent >)}

            /* Add styling */
            // className="cool-class"
            // style={{ background: "grey" }}

            /* Handle closing */
            // onClose={handleClose}

            /* Use single or double click to zoom */
            // singleClickToZoom

            /* react-spring config for open/close animation */
            // pageTransitionConfig={{
            //   from: { transform: "scale(0.75)", opacity: 0 },
            //   enter: { transform: "scale(1)", opacity: 1 },
            //   leave: { transform: "scale(0.75)", opacity: 0 },
            //   config: { mass: 1, tension: 320, friction: 32 }
            // }}
            />
        </>
    );
};
