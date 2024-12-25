import { Box, Paper, Skeleton } from "@mui/material";
import { useRef, useState } from "react";
import OptionsOverlay from "./OptionsOverlay";
import { useImageUpload } from "../../Contexts/MenueOpperation";
import useFetchMenue from "../../../CustomHooks/Update/useFetchMenue";

function Screen({
    config   
}) {
    
    const query = useFetchMenue(config)
    console.log("query data is:", query)
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

    const initialImgData = query?.data?.data?.content;
    return (
        <Paper
            elevation={elevation}
            sx={{
                height: displayDimensions.height,
                width: displayDimensions.width,
                borderRadius: "7px",
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
                {
                    image && (
                        <img 
                            alt=""
                            src={image}
                            style={imgStyle}
                            onLoad={e => fixImageOrientation(e)}
                        />
                    )
                }
                {
                    query.isLoading && (
                        <Skeleton 
                            width={"50dvh"}
                            height={"23dvw"}
                        />   
                    )
                }
                {
                    initialImgData && (
                        <img 
                            alt=""
                            src={"data:image/png;base64, " + initialImgData}
                            style={imgStyle}
                            onLoad={e => fixImageOrientation(e)}
                        />
                    )
                }
            </Box>
        </Paper>
    );
}

export default Screen;