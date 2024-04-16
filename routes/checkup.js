const router = require("express").Router()
const checkUPcontroller = require("../controllers/checkup")

const checkUpRoutes = (app) => {
    router.post("/save", checkUPcontroller.saveCheckUp)
    router.get("/findlast/:patientID", checkUPcontroller.findLastCheckUP)

    return app.use(router, "/checkup")
}