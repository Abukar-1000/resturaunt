import { Box, Button, Chip, Stack } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Overlay({ isVisible, lastUpdated, children }) {

    if (isVisible) {
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
                }}
            >
                <Stack spacing={2}>
                    <Button 
                        color="success" 
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button>
                    <Chip
                        label={lastUpdated}
                        icon={<HistoryIcon />}
                        color="success"
                    />
                </Stack>
            </Box>
        )
    }

    return <></>;
}