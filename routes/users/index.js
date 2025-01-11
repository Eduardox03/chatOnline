const express = require('express');
const { createUsers } = require('../../Services/user/listUsers');
const router = express.Router();

router.post('/CreateUsers',async (req, res, next) => {
    const infoUser = req.body;
     try {
        const response =await  createUsers(infoUser)
        console.log(response)
        return res.status(200).json(response)
    } catch (error) {

    }


});

module.exports = router;
