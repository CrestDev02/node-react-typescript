import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/dev-collaborator')
.then(() => {console.log('DB Connected Successfully!!!')})
.catch(e => {console.log('Error in DB connection', e)})