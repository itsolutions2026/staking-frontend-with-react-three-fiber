// node_modules
import React, { useState, useEffect } from "react";
import LoadingComponent from "../components/Loading";

interface LoadingContextObj {
    isLoading: () => boolean;
}

const LoadingContext = React.createContext<LoadingContextObj>({
    isLoading: () => true,
});


export const LoadingProvider: React.FC = (props) => {
    const [loading, setLoading] = useState<boolean>(props.hasOwnProperty("isLoading") ? props.isLoading : true);

    const handleLoading = () => {
        setLoading(false);
    }

    useEffect(()=>{
        window.addEventListener("load",handleLoading);
        // return () => window.removeEventListener("load",handleLoading);
    },[])

    return (
        <LoadingContext.Provider value={{
            isLoading: () => loading
        }}>
            { loading? <LoadingComponent/> : props.children}
        </LoadingContext.Provider>
    );
};

export default LoadingProvider;
