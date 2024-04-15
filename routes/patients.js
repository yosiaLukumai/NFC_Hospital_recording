const patientController = require("../controllers/patients")
const router = require('express').Router()
const patientRoutes = (app) => {
    router.get("/all", patientController.allPatients)
    router.get("/:id", patientController.getPatientById)
    router.post("/register", patientController.register)
    router.patch("/:id", patientController.updateUser)
    router.get("/count/api", patientController.countPatients)
    return app.use("/user", router)
}

module.exports = {
    patientRoutes
}