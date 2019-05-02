const  mongoUsername =  process.env.mongoUsername;
const mongoPW = process.env.mongoPW;
const mongoDB = process.env.mongoDB;


const mongoURL = `mongodb+srv://${mongoUsername}:${mongoPW}@employeecluster-dmaqq.gcp.mongodb.net/${mongoDB}?retryWrites=true`;


console.log(mongoURL);
module.exports = {
    mongoURL
}