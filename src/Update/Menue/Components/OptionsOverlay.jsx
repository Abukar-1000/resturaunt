import { Box, Fade, Stack } from "@mui/material";
import { useState } from "react";
import UploadFile from "./Options/UploadFile";

function OptionsOverlay({ config }) {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const opacity = 25
    
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: isMouseOver? `#000000${opacity}`: "#00000000",
                borderRadius: "7px",
                position: "absolute",
                zIndex: 5,
                top: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column"
            }}
            onMouseEnter={e => setIsMouseOver(true)}
            onMouseLeave={e => setIsMouseOver(false)}
        >
            <Fade
                in={isMouseOver}
            >
                <Box>
                    <Stack
                        direction={"column"}
                        gap={4}
                        sx={{
                            alignItems: "center"
                        }}
                    >
                        <UploadFile config={config} isMouseOver={isMouseOver}/>
                    </Stack>
                </Box>
            </Fade>
        </Box>
    )
}

export default OptionsOverlay;