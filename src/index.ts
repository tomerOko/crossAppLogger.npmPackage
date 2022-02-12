import express from 'express'
import './enjoi/test'
// import { axiosTest } from './treec/forAxios/deleteMe'
const app = express()
const port = 3000


app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  // axiosTest()
})

