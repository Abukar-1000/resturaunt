import { createContext, useContext, useState } from 'react';

const MenueOpperationContext = createContext();

export const MenueOpperationProvider = ({ children }) => {
    const [opperation, setOpperation] = useState({
        target: null,
        payload: null,
    });

    return (
        <MenueOpperationContext.Provider value={{
            opperation: opperation, 
            setOpperation: setOpperation
        }} >
            {children}
        </MenueOpperationContext.Provider>
    )
}


export const useImageUpload = () => {
    return useContext(MenueOpperationContext)
}