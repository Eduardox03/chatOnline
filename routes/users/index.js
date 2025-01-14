const express = require('express');
const { createUsers, listUsers, seachtUser, updateUsers } = require('../../Services/user/Users');
const router = express.Router();

router.post('/CreateUsers', async (req, res, next) => {
  const infoUser = req.body;
  try {
    const response = await createUsers(infoUser);
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/Users', async (req, res) => {
  try {
    const AllUsers = await listUsers();
    return res.status(200).json(AllUsers);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving users' });
  }
});
router.get('/User/:id', async (req, res) => {
  const id = req.params.id;
  try {
    if (!id) {
      throw new Error('User no foud');
    }
    const respose = await seachtUser(id);
    return res.status(200).json(respose);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
});

router.put('/updateUser/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const response = await updateUsers(id);
    console.log(response);

    return res.status(200).json(response);
  } catch (error) {
    console.log('--------', error.message);
    return res.status(500).json(error.message);
  }
});

seachtUser;
module.exports = router;
