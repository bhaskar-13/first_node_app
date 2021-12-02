// const express=require("express");//when type =common js
import  express from "express"; //when type is module.
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();//IT WILLSTORE THE KEY VALUE PAIR IN PROCESS.ENV
console.log(process.env);

const app=express();
const PORT=process.env.PORT;//HEROKU WILL AUTO ASSIGN THE PORT.

//MiddleWare.
app.use(express.json({limit:"50mb"}));//inbuilt json which converts every request to the app as Json


// const movies=[{
//     "id": "100",
//     "MovieName": "Oh Manapenne",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BZmI3MGE0NjAtOWU5NS00ZjM5LWI4NTEtMjJlNzEwYWI0Y2U2XkEyXkFqcGdeQXVyMTIwNDYzMjIz._V1_.jpg",
//     "rating": 8,
//     "summary": "Oh Manapenne! is a 2021 Indian Tamil-language romantic comedy film directed by Kaarthikk Sundar in his directorial debut and written by Deepak Sundarrajan. A remake of the Telugu film Pelli Choopulu, it stars Harish Kalyan and Priya Bhavani Shankar as a boy and girl who meet during a matchmaking event",
//     "trailer": "https://www.youtube.com/embed/G0E7UgF5csk",
//     "language":"tamil"
// },
// {
//     "id": "101",
//     "MovieName": "Shang-Chi",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
//     "rating": 8,
//     "summary": "Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
//     "trailer": "https://www.youtube.com/embed/giWIr7U1deA",
//     "language":"chinesee"
// },
// {
//     "id": "102",
//     "MovieName": "Iron Man 3",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_.jpg",
//     "rating": 8,
//     "summary": " When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
//     "trailer": "https://www.youtube.com/embed/Ke1Y3P9D0Bc",
//     "language":"english"
// },
// {
//     "id": "103",
//     "MovieName": "Jai Bhim",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_.jpg",
//     "rating": 9,
//     "summary": "When a tribal man is arrested for a case of alleged theft, his wife turns to a human-rights lawyer to help bring justice..",
//     "trailer": "https://www.youtube.com/embed/Gc6dEDnL8JA",
//     "language":"tamil"
// },
// {
//     "id": "104",
//     "MovieName": "sherni",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNjJmMzYyN2ItMzU0NS00MmYyLWI0ZDQtMjFmMWJkYWQ2YjYwXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
//     "rating": 8,
//     "summary": "An upright Forest Officer who strives for balance in a world of man-animal conflict while she also seeks her true calling in a hostile environment.",
//     "trailer": "https://www.youtube.com/embed/o2wg-11MWFU",
//     "language":"tamil"
// }
// ]

// const MONGO_URL="mongodb://localhost";//if it is running on the default port then dont mention the port number.//otherwise mention the port Number.//Local
const MONGO_URL=process.env.MONGO_URL;
// /myFirstDatabase?retryWrites=true&w=majority";//online



    async function  createConnection(){
    const  client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDbConnected");
    return client;
}

const client= await createConnection();

app.get("/",(request,response)=>{
    response.send("Hello ServerUpdated");
})


app.post("/movies",async(request,response)=>{
  const data=request.body;
  console.log(data);
  const result=await client.db("dummydata").collection("movie").insertMany(data);
  response.send(result); 
});

     app.get("/movies",async(request,response)=>
     { 
     const filter=(request.query); 
     console.log(filter); 
     if(filter.rating)
     {
         filter.rating=parseInt(filter.rating);
     }




     let  filteredMovies=await client.db("dummydata").collection("movie").find(filter).toArray();
//      if(language)
//      {
//     const filteredMovies1= await client.db("dummydata").collection("movie").find({language:language}).toArray();
//     filteredMovies1?
//     response.send(filteredMovies1)
//     :
//     response.send("Eror 404");
//     }

//     if(rating)
//     {
//    const filteredMovies2= await client.db("dummydata").collection("movie").find({rating:rating}).toArray();
//    filteredMovies2?
//    response.send(filteredMovies2)
//    :
//    response.send("Eror 404");
//   }
//   
   response.send(filteredMovies);

  })

  app.get("/movies/:id",async(request,response)=>{
    const {id}=request.params;
    console.log(request.params);
   const findMovies= await client.db("dummydata").collection("movie").findOne({id:id});
    // const findMovies=movies.filter((mv)=>mv.id==index)[0];
    findMovies?
    response.send(findMovies):response.send("Error 404");
})

app.delete("/movies/:id",async(request,response)=>{
    const {id}=request.params;
    console.log(request.params);
   const result= await client.db("dummydata").collection("movie").deleteOne({id:id});
    // const findMovies=movies.filter((mv)=>mv.id==index)[0];
    console.log(result);


    result.deleteCount>0?
    response.send(findMovies)
    :response.send("No matching id");
})

    app.put("/movies/:id",async(request,response)=>{
    const {id}=request.params;
    const data=request.body;

   console.log(request.params);
   const result= await client.db("dummydata").collection("movie").updateOne({id:id},{$set:data});
    // const findMovies=movies.filter((mv)=>mv.id==index)[0];
    console.log(result);
    result?
    response.send(result)
    :response.send("No matching id");
})

app.listen(PORT,()=>{
    console.log("App is starting at :",PORT);
})
// const sum=(a,b)=>{
//  return(a+b);
// }

// // console.log(sum(6,7));
// // console.log(parseInt(process.argv[2])+parseInt(process.argv[3]));
// // console.log(process.argv);
// // const [,,num1,num2]=process.argv;
// // console.log(sum(+num1,+num2));
// // console.log(global);

// const [,,num]=process.argv;
// const num1=JSON.parse(num);
// console.log(Math.min(...num1));






