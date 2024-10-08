import { Box, Fade, Slide } from "@mui/material";
import { CustomImg } from "./CustomImg";
import useCarousel from "./CustomHooks/useCarousel";
import { useState, useEffect } from "react";
export function Carousel() {
 
    /**
     * Add the file inside public => SlideShow folder
     * Make sure the name of the file is the number in which it should appear
     * All slide show images should be jpeg format
     * Example: 1.jpeg
     *      First image that shows up
     * 
     * If you add a new image to the slideshow folder update this file
     * and add the image number inside the allImages array between the brackets []
     * at the end.
     * 
     * Example:
     *  if you added a new image called 420.jpeg inside the slide show folder,
     *  then the allImages array should look like:
     * 
            let allImages = [
                1, 2, 3, 4, 5,
                6, 7, 8, 9, 10,
                11, 12, 13, 14,
                420
            ]
        ^^ 420 was added to the end ^^
     * 
     */

    let allImages = [
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
        11, 12, 13, 14
    ]

    let images = allImages
    .map((imageName, index) => {
        return <Slide
                    key={index}
                    in={true}
                    timeout={500}
                    direction="up"
                >
                    <Box
                        key={index}
                    >
                        <CustomImg key={index} imgName={`SlideShow/${imageName}.jpeg`} />
                    </Box>
        </Slide>
    })
    console.log("all", images);
    
    const ONE_SECOND = 1000;
    const INTERVAL_TIME = 5 * ONE_SECOND;


    let [currentState, setCurrentState] = useState({
        index: 0,
        value: images[0]
    });
    
    useEffect(() => {
        let intervalId = setInterval(() => {
            
            setCurrentState(prevState => {
                console.log( prevState.index++ % images.length );
                return {
                    index: prevState.index++ % images.length,
                    value: images[ prevState.index++ % images.length ]
                };
            })
        }, INTERVAL_TIME)

        return () => { clearInterval(intervalId); }
    }, [images, INTERVAL_TIME]);
    
    console.log(currentState.value, INTERVAL_TIME);
    return (<>
        <Box
            sx={{
                backgroundColor: "#000000"
            }}
        >
            {currentState.value}
        </Box>
    </>)
}