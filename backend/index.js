const express=require("express")
const axios=require("axios")
const cors=require("cors")
require("dotenv").config()

const app=express()
const news=require("./routes/news")
const PORT=process.env.PORT


app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/news",news)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

