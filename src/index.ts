import express from 'express'
import { axiosTest } from './treec/forAxios/forAxios/deleteMe'
const app = express()
const port = 3000

app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  axiosTest()
})

