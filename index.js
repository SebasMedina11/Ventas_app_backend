const express = require('express')
const app = express()
if(process.env.NODE_ENV !== 'production'){
	const morgan = require('morgan')
	require('dotenv').config()
	app.use(morgan('dev'))
}
//database connection
require('./src/database')
//settings
app.set('port',3000)
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(require('./src/routes/user.routes'))
app.use(require('./src/routes/sales.routes'))
//server
app.listen(app.get('port'),()=>{
	console.log('app in port',app.get('port'))
})