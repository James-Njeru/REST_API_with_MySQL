const {createUser, getUserByUserId, getUsers, 
    updateUser, deleteUser, login} = require("./usercontroller");
const router = require("express").Router();
const {checkToken} = require("../auth/token_validation");

router.post("/", checkToken, createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
//login API
router.post("/login", login);

module.exports = router;