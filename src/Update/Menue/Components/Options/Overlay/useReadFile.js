import { useEffect, useState } from "react";


function useReadFile(payload) {
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (payload === null || !payload) {
            return;
        }
        
        const promise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result?.toString() || "");
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(payload);
        })

        promise
            .then(res => {
                setFile(res);
            })
            .catch(err => {
                setFile(null);
                console.error(err);
            });
    }, [payload])

    return file;
}

export default useReadFile;