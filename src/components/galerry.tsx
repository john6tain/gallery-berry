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

export function Gallery({ images, handleClick, goBack }: any) {

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
                            <h1 className="text-center" onClick={handleClick}>Gallery berry 2</h1>
                        </a>
                        <button className="float-left" onClick={goBack}>
                            <svg className="w-full pl-2 w-6 h-6 text-slate-300 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" version="1.1" id="Capa_1" viewBox="0 0 384.965 384.965">
                                <g>
                                    <path id="Arrow_Left" d="M3.544,201.041L3.544,201.041L3.544,201.041l119.942,120.195c7.627,7.94,21.029,1.949,20.728-8.83v-59.863   c0.048,0,0.096,0.024,0.144,0.024h228.576c6.617,0,12.03-5.414,12.03-12.03v-96.242c0-6.617-5.414-12.03-12.03-12.03H144.359   c-0.048,0-0.096,0.024-0.144,0.024V72.485c0.289-10.731-13.017-16.554-20.632-8.926L3.556,183.849   C-1.183,188.601-1.183,196.301,3.544,201.041z M120.094,101.43v54.906h0.205h12.03h11.886v-0.024c0.048,0,0.096,0.024,0.144,0.024   h12.03h204.515v72.182H156.389h-12.03c-0.048,0-0.096,0.024-0.144,0.024v-0.024h-11.886h-12.03h-0.205v54.954l-90.829-91.021   L120.094,101.43z" />
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button className="float-right" onClick={togleFullScreen}>
                            <svg className="w-3/4 pr-2 w-6 h-6 text-slate-300" fill="#FFFFFF" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
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
