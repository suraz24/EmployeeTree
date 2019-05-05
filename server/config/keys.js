const  mongoUsername =  process.env.mongoUsername || 'admin';
const mongoPW = process.env.mongoPW || 'Test123!';
const mongoDB = process.env.mongoDB || 'employeedb';


const mongoURL = `mongodb+srv://${mongoUsername}:${mongoPW}@employeecluster-dmaqq.gcp.mongodb.net/${mongoDB}?retryWrites=true`;


console.log(mongoURL);
module.exports = {
    mongoURL
}