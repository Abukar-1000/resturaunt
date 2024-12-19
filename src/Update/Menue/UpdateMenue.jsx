import { Box, Stack } from "@mui/material";
import Screen from "./Components/Screen";
import { ImageUploadProvider } from "../Contexts/ImageContext";
import { MenueOpperationProvider } from "../Contexts/MenueOpperation";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


function UpdateMenue() {
    
    const queryClient = new QueryClient()
    // use config later
    const screens = [1,2,3,4]
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
                        {
                            screens.map((screen, index) => (
                                <Screen 
                                    key={index}
                                    config={{
                                        key: screen
                                    }} 
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