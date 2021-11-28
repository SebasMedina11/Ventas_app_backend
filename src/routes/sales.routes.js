const {Router} = require('express')
const { findByIdAndUpdate } = require('../models/sales')
const router = Router()
const Sale = require('../models/sales')
const User = require('../models/user')

router.get('/api/sales',async(req,res)=>{
	const allSales = await Sale.find({}).populate('userId',{
		name:1,
		email:1
	})
	res.json(allSales)
})
	
router.post('/api/newSale',async(req,res)=>{
	const {name,value,userId} = req.body
	const user = await User.findById(userId)
	const newSale = new Sale(
		{
			name,
			value,
			userId:user._id
		})
	const saveSale = await newSale.save()
	user.sales = await user.sales.concat(saveSale.id)
	await user.save()
	res.json({msg:'Sale registred'})
})

router.put('/api/updateSale/:id',async(req,res)=>{
	const {name,value} = req.body
	console.log(req.params.id)
	await Sale.findByIdAndUpdate(req.params.id,{name,value},{new:true})
	
	res.json({msg:'Sale updated'})
})

router.delete('/api/deleteSale/:id',async(req,res)=>{
	// const salesUsers = await User.findById(req.params.user)
	// console.log(req.params.id)
	// await Sale.findByIdAndDelete(req.params.id)
	// const saleIndex=salesUsers.sales.indexOf(req.params.id)
	// salesUsers.sales.splice(saleIndex,1)
	// salesUsers.save()
	const sale = await Sale.findByIdAndDelete(req.params.id)
	const userSale = await User.findOne({sales:req.params.id})
	const saleIndex=userSale.sales.indexOf(req.params.id)
	userSale.sales.splice(saleIndex,1)
	await userSale.save()
	res.json({msg:'Sale deleted'})
})

module.exports = router