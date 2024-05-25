import express from 'express'
import cors from 'cors'
import multer from 'multer'
import csvToJson from 'convert-csv-to-json'

const app = express()
const port = process.env.PORT ?? 3000

app.use(cors()) // Enable CORS

app.post('/api/files', async (req, res) => {
  // 1. Extract file from request
  // 2. Validate that we have the file
  // 3. Validate mimetype (csv)
  // 4. Transform the file (buffer) to string
  // 5. Transform string to CSV
  // 6. Save the JSON to dv / memory
  // 7. Return 200 with message and JSON
  return res
    .status(200)
    .json({ data: [], message: 'File was uploaded successfully' })
})

app.get('/api/users', async (req, res) => {
  // 1. Extract the query param `q` from request
  // 2. Validate that we have the query param
  // 3. Filter the data from the db / memory using the query param
  // 4. Return 200 with the filtered data
  return res.status(200).json({ data: [] })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
