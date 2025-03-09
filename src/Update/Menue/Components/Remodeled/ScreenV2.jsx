import { Box, Paper, Skeleton } from "@mui/material";
import { useState } from "react";
import Overlay from "./Overlay";
import useFetchMenue from "../../../../CustomHooks/Update/useFetchMenue";
import useUploadMenue from "../../../../CustomHooks/Update/useUploadMenue";
import { useImageUpload } from "../../../Contexts/MenueOpperation";
import useFetchUpdateDate from "../../../../CustomHooks/Update/useFetchUpdateDate";

export default function ScreenV2({ config, src }) {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const borderRadius = "10px";
    const blur = isMouseOver? 30 : 0;

    const query = useFetchMenue(config);
    const initialImgData = query?.data?.data?.content
    const shaHashCode = query?.data?.data?.sha;

    const lastUpdateQuery = useFetchUpdateDate(config);
    console.log("commit query",lastUpdateQuery?.data?.data);
    const { opperation } = useImageUpload()
    const [image, setImage] = useState("");
    const uploadQuery = useUploadMenue(
        config,
        image,
        shaHashCode,
        image === initialImgData
    );

    const imageNotChanged = initialImgData && !image;
    if (opperation && opperation?.target === config?.display && opperation?.payload?.image) {
        if (image !== opperation?.payload?.image) {
            console.log("in card: ", opperation)
            setImage(opperation?.payload?.image)
        }
    }

    return (
        <Paper
            elevation={isMouseOver ? 24 : 4}
            sx={{
                maxWidth: "40dvw",
                maxHeight: "30dvh",
                rotate: "270deg",
                borderRadius: borderRadius,
            }}
        >
            <Box
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
                sx={{
                    maxWidth: "inherit",
                    maxHeight: "inherit",
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    position: "relative"
                }} 
            >
                    <Overlay isVisible={isMouseOver} config={config} lastUpdated={"March 8 2025"}/>
                    {
                        (query.isLoading && !image) && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    zIndex: 11,
                                    top: -130,
                                    left: 0
                                }}
                            >
                                <Skeleton 
                                    width={"80dvw"}
                                    height={"70dvh"}
                                />   
                            </Box>
                        )
                    }
                    {
                        (imageNotChanged)? (
                            <img 
                                alt="menu"
                                src={"data:image/png;base64, " + initialImgData}
                                style={{
                                    maxWidth: "inherit",
                                    maxHeight: "inherit",
                                    filter: `blur(${blur}px)`,
                                    "-webkit-filter": `blur(${blur}px)`
                                }}
                            />
                        ) : (
                            <img 
                                alt="menu"
                                src={image}
                                style={{
                                    maxWidth: "inherit",
                                    maxHeight: "inherit",
                                    filter: `blur(${blur}px)`,
                                    "-webkit-filter": `blur(${blur}px)`
                                }}
                            />
                        )
                    }
                    {/* <img 
                        src={src} 
                        alt="menu"
                        style={{
                            maxWidth: "inherit",
                            maxHeight: "inherit",
                            filter: `blur(${blur}px)`,
                            "-webkit-filter": `blur(${blur}px)`
                        }}
                    /> */}
            </Box>
        </Paper>
    )
}