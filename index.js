const express =require('express')
const app=express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors')
require('dotenv').config();
const port=process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.rzyh2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("coffeeDB");
    const usercollection = database.collection("coffeeData");

    app.get('/coffeeData',async(req,res)=>{
      const cursor = usercollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/coffeeData',async(req,res)=>{
      const data=req.body
      const result=await usercollection.insertOne(data)
      res.send(result)
      console.log(data);
      console.log('server is hitting');
    })

      // const result = await usercollection.insertOne(doc);
      // console.log(result);
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('hello world')
})

app.get('/name',(req,res)=>{
    res.send('my name is jahid hasan')
})
app.listen(port,(req,res)=>{
    console.log(`server is running ${port}`);
})