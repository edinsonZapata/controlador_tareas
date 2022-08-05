import { connect } from 'mongoose'
// import { serverPort, mongodbConnectionString } from "../configurations";

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

export function connectToMongo(){
    connect('mongodb://localhost:27017/app', options)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
}
