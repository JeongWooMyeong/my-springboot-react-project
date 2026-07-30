import {
    createContext,
    useContext,
    useState
} from "react";


const NotificationContext =
    createContext(null);



export const NotificationProvider = ({
                                         children
                                     }) => {


    const [message, setMessage] =
        useState("");



    const showMessage = (msg)=>{

        setMessage(msg);


        setTimeout(()=>{

            setMessage("");

        },3000);

    };



    return (

        <NotificationContext.Provider
            value={{
                message,
                showMessage
            }}
        >

            {children}

        </NotificationContext.Provider>

    );

};



export const useNotification = ()=>{

    return useContext(
        NotificationContext
    );

};