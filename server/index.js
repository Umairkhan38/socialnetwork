import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import router from './routes/auth.js';
import './models/user.js';


/*mongoDB Link:
mongodb+srv://socialnetwork:<password>@cluster0.vnsbf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority  */


const app=express();
const PORT=5000;

app.use(express.json());
app.use(router);

const coustumMiddleWare=()=>{
console.log("Middleware Executed !!");

} 


app.use(coustumMiddleWare);


app.get('/',(req,res)=>{
        console.log("From Home Page")
        res.send("Response From Server -> Hello world "); //visible on browser
})

app.get('/Login',coustumMiddleWare,(req,res)=>{
        console.log("Hello From Login page");        
        res.send("Response From About-> Hello world "); //visible on browser
})


app.listen(PORT,()=>{
        console.log("Server is Running On : ",PORT)    //visibles in Terminal 
})



app.use(bodyParser.json({limit:"30mb" , extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const CONNECTION_URL='mongodb+srv://socialnetwork:socialnetwork@cluster0.vnsbf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL).then(()=>{
        console.log(`server is Connected TO Database Through Port  : ${PORT}`);
})



