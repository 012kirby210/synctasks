import {useContext, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSyncContext } from './contexts/SyncProvider.tsx'

function App() {
  const [count, setCount] = useState(0)

  const { addTask, setSynchronizeTask, tasksList} = useSyncContext();

  const addATask = () => {
      addTask(
          () => {
              return new Promise((resolve, reject) => {
                  setTimeout(() => {
                      console.log("tache résolue");
                      resolve(true);
                  }, 1000);
              });
          });
      console.log("tache ajoutée");
  };

  const syncTask = () => {
      setSynchronizeTask(true);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={addATask}>
          Ajouter tache [ {tasksList.length} ]
        </button>
        <button onClick={syncTask}>
          Synchroniser taches
        </button>
      </div>
        <p>
            Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
