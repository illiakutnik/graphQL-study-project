const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')

const db =
	'mongodb+srv://illiakutnik:bagdad1258@cluster0-ztp3p.mongodb.net/test?retryWrites=true&w=majority'

const app = express()

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
			// useCreateIndex: true,
			// useFindAndModify: false
		})
		console.log('mongo connected')
	} catch (err) {
		console.error(err.message)
		process.exit(1)
	}
}

connectDB()

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

app.listen(4000, () => {
	console.log('listening on port 4000')
})
