
import React, { createContext, useContext, useState } from 'react';

const ImageUploadContext = createContext();

const defaultValues = {
    content: "",
    url: "",
};

const ImageUploadProvider = ({ children }) => {
    const [file, setFile] = useState(defaultValues);

    return (
        <ImageUploadContext.Provider value={{
            state: file,
            dispatch: setFile
        }} >
            {children}
        </ImageUploadContext.Provider>
    )
}


const useImageUploadDepricated = () => {
    return useContext(ImageUploadContext)
}

export {
    ImageUploadProvider,
    useImageUploadDepricated
}