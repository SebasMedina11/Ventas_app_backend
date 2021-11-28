const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser: true, useUnifiedTopology: true 
})
.then(db=>console.log('db'))
.catch(e=>console.log(e))