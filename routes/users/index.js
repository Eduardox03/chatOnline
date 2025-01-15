const express = require('express');
const { createUsers,listUsers } = require('../../Services/user/listUsers');
 const router = express.Router();

router.post('/CreateUsers',async (req, res, next) => {
    const infoUser = req.body;
     try {
        const response =await  createUsers(infoUser)
         
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }

});
router.get('/Users',async(req,res)=>{
    try {
        const users= await listUsers()

      return  res.status(200).json(users)
        
    } catch (error) {
        console.log(error.message)
    }
   

})
module.exports = router;
