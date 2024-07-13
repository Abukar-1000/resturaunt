import { useEffect, useState } from "react";

/**
 * 
 * @param {Function} asyncFunc 
 * @returns {JSON}
 * 
 * - Client passes an asynchronous callback function, which makes an api call
 * - This hook passes setResponse hook into the callback so the client can store the API response
 * - Response from the server is stored in response
 */
export default function useAsyncRequest(asyncFunc){
    let [response, setResponse] = useState(null);
    
    useEffect(() => {
        asyncFunc(setResponse)
    }, []);
    
    return response;
}