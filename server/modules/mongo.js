const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://admin:${process.env.DB_PWORD}@userdata.ftapv.mongodb.net/userInfo_db?retryWrites=true&w=majority`;

const runDB = async () => {
  const client = await MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db('userInfo_db');

  db.on('close', () => { process.stdout.write('lost connection'); });
  db.on('reconnect', () => { process.stdout.write('reconnected'); });

  const mycol = db.collection('users');

  return mycol;
};

runDB();

module.exports = { runDB };
