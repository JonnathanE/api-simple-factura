import "dotenv/config"
import express from "express";
import routes from "./src/routes"

const app = express()

app.use("/api", routes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("App escuchando en puerto: ", PORT)
})