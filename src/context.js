import {createContext, useContext, useEffect, useState} from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList") || ["GOOGL", "MSFT", "AMZN"]
    );
    
    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock]);
        }
    };

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el) => {
            return el !== stock;
        }))
    };
   return( 
    //passing an obj in value={}
    <AppContext.Provider value={{watchList, addStock, deleteStock}}>
        {children}
    </AppContext.Provider>
   )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}
export {AppContext, AppProvider, useGlobalContext}