import { Box, Paper } from "@mui/material";
import { useRef, useState } from "react";
import OptionsOverlay from "./OptionsOverlay";
import { useImageUpload } from "../../Contexts/MenueOpperation";


function Screen({
    config   
}) {
    
    const displayDimensions = {
        height: "50dvh",
        width: "23dvw",
        border: "none"
    }
    const displayRef = useRef(null);
    const [elevation, setElevation] = useState(2);
    const { opperation } = useImageUpload()
    const [image, setImage] = useState("");
    const [imgStyle, setImgStyle] = useState({
        border: "none",
        maxWidth: "100%",
        minHeight: "100%",
    })

    const isMouseOverr = elevation > 4;

    const fixImageOrientation = (e) => {
        const { naturalHeight: curHeight, naturalWidth: curWidth } = e.target;
        const imgNotLoaded = !curHeight || !curWidth;
        if (imgNotLoaded) {
            return;
        }

        const isRightLeaning = (curWidth / curHeight) > 1;
        const isLeftLeaning = (curWidth / curHeight) < 1;

        console.log(`is right: ${isRightLeaning} | is left: ${isLeftLeaning}, dimensions: ${curWidth} x ${curHeight} | ratio: ${curWidth/curHeight}`)
        if (isRightLeaning) {
            setImgStyle(prev => ({
                rotate: "270deg",
                ...prev
            }));
        }
    }


    if (opperation && opperation?.target === config?.key && opperation?.payload?.image) {
        if (image !== opperation?.payload?.image) {
            console.log("in card: ", opperation)
            setImage(opperation?.payload?.image)
        }
    }

    const imgNotPositioned = (
        (
            !imgStyle?.width ||
            !imgStyle?.height
        ) &&
        displayRef?.current?.offsetWidth &&
        displayRef?.current?.offsetHeight
    )

    const imgWasResized = (
        !imgNotPositioned &&
        `${displayRef.current?.offsetWidth}px` !== imgStyle.width ||
        `${displayRef.current?.offsetHeight}px` !== imgStyle.height
    )

    console.log("img positioned:", imgNotPositioned || imgWasResized);
    // if (imgNotPositioned || imgWasResized) {
    //     setImgStyle(prev => ({
    //         ...prev,
    //         width: `${displayRef.current?.offsetWidth}px`,
    //         height: `${displayRef.current?.offsetHeight}px`
    //     }));
    // }


    console.log("img styles: ", imgStyle)
    console.log("display styles: ", displayRef?.current?.offsetWidth, displayRef?.current?.offsetHeight)
    return (
        <Paper
            elevation={elevation}
            sx={{
                height: displayDimensions.height,
                width: displayDimensions.width,
                borderRadius: "7px",
                border: "1px solid black",
                position: "relative",
                overflow: "hidden"
            }}
            ref={displayRef}
            onMouseEnter={e => setElevation(24)}
            onMouseLeave={e => setElevation(4)}
        >
            {/* options */}
            <OptionsOverlay config={config}/>
            {/* Show menue here */}
            <Box
                sx={{
                    minWidth: "50dvh",
                    maxHeight: "23dvw",
                    borderRadius: "inherit",
                    position: "absolute",
                    top: 78,
                    left: -78,
                    zIndex: 3,
                    filter: `blur(${elevation - 4}px)`,
                    "-webkit-filter": `blur(${elevation - 4}px)`,
                }}  
            >

                <img 
                    alt=""
                    src={image}
                    style={imgStyle}
                    onLoad={e => fixImageOrientation(e)}
                />
            </Box>
        </Paper>
    );
}

export default Screen;