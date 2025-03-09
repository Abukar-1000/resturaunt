import { Box, Stack } from "@mui/material";
import Screen from "./Components/Screen";
import ScreenV2 from "./Components/Remodeled/ScreenV2";
import { ImageUploadProvider } from "../Contexts/ImageContext";
import { MenueOpperationProvider } from "../Contexts/MenueOpperation";
import config from "../Config/config";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function UpdateMenue() {
    
    const queryClient = new QueryClient()
    // use config later
    const screens = [1,2,3,4]
    console.log("all configs:", config);
    return (
        // might be unnecissary
        <QueryClientProvider client={queryClient}>
          <MenueOpperationProvider>
            <ImageUploadProvider>      
                <Box
                    sx={{
                        width: "100dvw",
                        height: "100dvh",
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        flexDirection: "column"
                    }}
                >
                    {/* // screens */}
                    <Stack 
                        direction={"row"} 
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        flexDirection={"row"}
                        gap={4}
                    >
                        {/* {
                            screens.slice(0,3).map((screen, index) => (
                                <Screen 
                                    key={index}
                                    config={config[index]} 
                                />
                            ))
                        } */}
                        {
                            screens.slice(0,3).map((screen, index) => (
                                <ScreenV2 
                                    key={index}
                                    config={config[index]} 
                                />
                            ))
                        }
                    </Stack>
                </Box>
            </ImageUploadProvider>
          </MenueOpperationProvider>
      </QueryClientProvider>
    )
}

export default UpdateMenue;