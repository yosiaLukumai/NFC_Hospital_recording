const wardController = require("../controllers/ward")
const router = require('express').Router()
const wardRoutes = (app) => {
    router.get("/all", wardController.allBeds)
    router.post("/register", wardController.register)
    return app.use("/ward", router)
}

module.exports = {
    wardRoutes
}