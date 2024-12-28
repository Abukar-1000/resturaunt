import { Box, Paper, Skeleton } from "@mui/material";
import { useRef, useState } from "react";
import OptionsOverlay from "./OptionsOverlay";
import { useImageUpload } from "../../Contexts/MenueOpperation";
import useFetchMenue from "../../../CustomHooks/Update/useFetchMenue";
import useMutateImg from "./Options/Overlay/useMutateImg";
import useUploadMenue from "../../../CustomHooks/Update/useUploadMenue";

function Screen({
    config   
}) {
    
    const query = useFetchMenue(config)
    const initialImgData = query?.data?.data?.content
    const shaHashCode = query?.data?.data?.sha;
    // const initialImgData = useMutateImg(
    //     query?.data?.data?.content,
    //     270,
    //     300,
    //     500
    // );

    const displayDimensions = {
        height: "50dvh",
        width: "30dvw",
        border: "none"
    }
    const displayRef = useRef(null);
    const [elevation, setElevation] = useState(2);
    const { opperation } = useImageUpload()
    const [image, setImage] = useState("");
    const uploadQuery = useUploadMenue(
        config,
        image,
        shaHashCode,
        image === initialImgData
    );

    const [imgStyle, setImgStyle] = useState({
        border: "none",
        objectFit: "cover",
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


    if (opperation && opperation?.target === config?.display && opperation?.payload?.image) {
        if (image !== opperation?.payload?.image) {
            console.log("in card: ", opperation)
            setImage(opperation?.payload?.image)
        }
    }

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
            {
                query.isLoading && (
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: 10,
                            top: -400,
                            left: 0
                        }}
                    >
                        <Skeleton 
                            width={"100dvw"}
                            height={"100dvh"}
                        />   
                    </Box>
                )
            }
            
            {/* options */}
            <OptionsOverlay config={config}/>
            {/* Show menue here */}
            <Box
                sx={{
                    position: "relative",
                    left: -100,
                    width: "fit-content",
                    height: "85%",
                    borderRadius: "inherit",
                    filter: `blur(${elevation - 4}px)`,
                    "-webkit-filter": `blur(${elevation - 4}px)`,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
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