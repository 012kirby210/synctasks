import {useContext, createContext, useState, useEffect} from "react";
import { useReducer } from "react";

const SyncContext = createContext();




const SyncProvider = ({children}) => {

    const [ tasksList, setTasksList ] = useState([]);
    const [ synchronizeTask, setSynchronizeTask ] = useState(false);

    const addTask = (task) => {
        if ( tasksList.length === 0){
            setTasksList([task]);
        }else{
            setTasksList( [...tasksList,task]);
        }

    }

    useEffect(() => {
        if ( synchronizeTask ) {
            console.log('valeur synchronizeTask : ' + synchronizeTask);
            if ( tasksList.length > 0){
                let task  = tasksList[0];
                task().then( (val) => {
                    console.log("tache synchronisée");
                    let tasks:Array<any> = tasksList.slice(1);
                    setTasksList(tasks);
                })
            }else{
                setSynchronizeTask(false);
            }
        }
    }, [synchronizeTask,tasksList]);

    return (
      <SyncContext.Provider value={{addTask, setSynchronizeTask, tasksList}} >
          {children}
      </SyncContext.Provider>

    );
}

const useSyncContext = () => {
    return useContext(SyncContext);
}

export { SyncProvider, useSyncContext };