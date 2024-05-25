import { useState } from 'react'
import './App.css'

const APP_STATUS = {
  IDLE: 'idle', // Right after starting the app
  ERROR: 'error', // Error
  UPLOADING: 'uploading', // When choosing the file
  READY_UPLOAD: 'uploading', // While uploading the file
  READY_USAGE: 'ready_usage', // After uploading the file
} as const

type AppStatusType = typeof APP_STATUS[keyof typeof APP_STATUS]

function App() {
  const [appStatus, setAppStatus] = useState<AppStatusType>(APP_STATUS.IDLE)
  const [file, setFile] = useState<File | null>(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? []
    if (file) {
      setFile(file)
      setAppStatus(APP_STATUS.READY_UPLOAD)
      console.log(file)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('TODO')
  }

  return (
    <>
      <h4>Upload CSV + Search</h4>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            onChange={handleInputChange}
            name='file'
            type='file'
            accept='.csv'
          />
        </label>
      </form>
      {
        appStatus === APP_STATUS.READY_UPLOAD && (
        <button>Upload File</button>)

      }
    </>
  )
}

export default App
