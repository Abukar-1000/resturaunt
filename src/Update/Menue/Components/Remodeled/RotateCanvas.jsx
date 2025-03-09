import { Box, Paper } from "@mui/material";
import { useState } from "react";
import Overlay from "./Overlay";

export default function RotateCanvas({ src }) {

    const [isMouseOver, setIsMouseOver] = useState(false);
    const borderRadius = "10px";
    const blur = isMouseOver? 30 : 0;
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
                    <Overlay isVisible={isMouseOver} lastUpdated={"March 8 2025"}/>
                    <img 
                        src={src} 
                        alt="menu"
                        style={{
                            maxWidth: "inherit",
                            maxHeight: "inherit",
                            filter: `blur(${blur}px)`,
                            "-webkit-filter": `blur(${blur}px)`
                        }}
                    />
            </Box>
        </Paper>
    )
}