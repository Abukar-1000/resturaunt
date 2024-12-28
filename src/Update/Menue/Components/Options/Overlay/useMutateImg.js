import { useEffect, useState } from "react";
import pica from "pica";

async function mutateImg(
    imgPayload, 
    angle, 
    width, 
    height
) 
{
    return await new pica(imgPayload)
    .rotate(angle)
    .resize(width, height)
    .toBuffer()    
}

function useMutateImg(imgPayload, angle, width, height) {
    const [img, setImg] = useState("");

    useEffect(() => {
        if (!imgPayload) {
            return 
        }
        mutateImg(imgPayload, angle, width, height)
        .then(data => setImg(data))
    }, [
        angle,
        width,
        height,
        imgPayload
    ])

    return img;
}

export default useMutateImg;