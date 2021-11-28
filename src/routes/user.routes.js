const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/api/users',async(req,res)=>{
	const users = await User.find({}).populate('sales',{
		 name:1,
		 value:1
	})
	res.json(users)
})
router.post('/api/newUser',async (req,res)=>{
	const {name,email,hashPassword,exp} = req.body
	const newUser = new User({name,email,hashPassword,exp})
	await newUser.save()
	res.json({msg:'new user added'})
})
router.put('/api/editUser/:id',async(req,res)=>{
	const {exp} = req.body
	const updatedUser=await User.findByIdAndUpdate(req.params.id,{exp})
	updatedUser.save()
	res.json({msg:'User updated'})
})
router.delete('/api/deleteUser/:id',async(req,res)=>{
	await User.findByIdAndDelete(req.params.id)
})

module.exports = router