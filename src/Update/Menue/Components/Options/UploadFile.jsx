import { UploadFileRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from "react"
import useReadFile from './Overlay/useReadFile';
import { useImageUpload } from '../../../Contexts/MenueOpperation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  
// add config to a dispatch
function UploadFile({
    config,
    isMouseOver,
    variant = "outlined"
}) {

    // use context here
    // const { state, dispatch } = useImageUpload();
    // const [values, setValues] = useState({
    //     isLoading: false,
    //     error: undefined,
    //     data: undefined
    // })    
    const [filePayload, setFilePayload] = useState(null);
    const file = useReadFile(filePayload);
    const { opperation, setOpperation } = useImageUpload()

    // const query = useFileContentData(filePayload);

    // if (query.isLoading) {
    //     return <p>Data is loading</p>
    // }

    
    // if (query.isError) {
    //     return <p>Error: {query.error?.message || "Somehow failed"}</p>
    // }

    // console.log("Data is", query);
    if (file !== null && file?.length && file !== opperation?.payload?.image) {
        console.log("File:", file)
        setOpperation({
            target: config?.display,
            payload: {
                image: file
            }
        })
    }

    return (
        <Button
            key={12}
            component="label"
            role={undefined}
            variant={variant}
            color='success'
            tabIndex={-1}
            startIcon={<CloudUploadIcon/>}
            sx={{
                // width: "80%",
                // display: true? "": "none",
                opacity: isMouseOver? 100: 0,
            }}
        >
            Upload
            <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                    console.log("file options", e)
                    const isValid = e.target?.files[0] !== undefined;
                    setFilePayload(isValid? e.target?.files[0]: undefined);
                }}
            />
        </Button>
    )
}

export default UploadFile;