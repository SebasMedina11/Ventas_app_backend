const {model,Schema}= require('mongoose')

const userSchema = new Schema({
	name:{type:String,},
	email:{type:String,},
	exp:{type:String},
	hashPassword:{type:String},
	sales:[{
		type: Schema.Types.ObjectId,
		ref: 'Sales'
	}]
})

module.exports = model('Users',userSchema)