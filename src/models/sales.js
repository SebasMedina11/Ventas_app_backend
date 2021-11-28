const {model, Schema} = require('mongoose')

const sale = new Schema({
	name:{type:String,},
	value:{type:Number,},
	userId:{
		type: Schema.Types.ObjectId,
		ref: 'Users'
	}
})

module.exports = model('Sales',sale)