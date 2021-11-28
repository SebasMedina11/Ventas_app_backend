const express = require('express')
const app = express()
if(process.env.NODE_ENV !== 'production'){
	const morgan = require('morgan')
	require('dotenv').config()
	app.use(morgan('dev'))
}
//database connection
require('./database')
//settings
app.set('port',3000)
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(require('./routes/user.routes'))
app.use(require('./routes/sales.routes'))
//server
app.listen(app.get('port'),()=>{
	console.log('app in port',app.get('port'))
})