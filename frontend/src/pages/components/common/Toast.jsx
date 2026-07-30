import {
    useNotification
} from "../../../context/NotificationContext";


export default function Toast(){


    const {
        message
    } = useNotification();



    if(!message){
        return null;
    }



    return (

        <div className="toast">

            {message}

        </div>

    );

}