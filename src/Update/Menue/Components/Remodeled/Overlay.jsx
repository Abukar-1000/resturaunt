import { Box, Button, Chip, Stack } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFile from "../Options/UploadFile";

export default function Overlay({ isVisible, lastUpdated, config, children }) {

    return (
        <Box
            sx={{
                position: "absolute",
                rotate: "90deg",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 10,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                opacity: isVisible? 100 : 0
            }}
        >
            <Stack spacing={2}>
                <UploadFile variant="contained" isMouseOver={isVisible} config={config}/>
                {/* <Button 
                    color="success" 
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button> */}
                <Chip
                    label={lastUpdated}
                    icon={<HistoryIcon />}
                    color="success"
                />
            </Stack>
        </Box>
    )

    return <></>;
}