 const fs=require("fs");
// fs.readFile("./welcome.txt","UTF-8",(err,data)=>{
//     console.log(data);
// })

const quote1="Hi the betiful";
const quote2="Live more worry less";

// fs.writeFile("./awesome.txt",quote1,(err)=>{
//     console.log("file write completed");
// })
//  for(i=1;i<=20;i++)
//  {
//     fs.writeFile(`./backup/test-${i}.txt`,quote2,(err)=>{
//         console.log("file write completed");
//     }) 
//  }

 function createQutes(noOffiles,quote){
     for(i=1;i<=noOffiles;i++)
     {
    fs.writeFile(`./backup/test-${i}.txt`,quote,(err)=>{
        console.log("file write completed");
    })
    
  }
 }

//  const [,,n1]=process.argv
//  createQutes(n1,quote2);

//  fs.appendFile("./awesome.txt",quote2,(err)=>{
//     console.log("file append completed");
// })

for(i=2;i<=200;i++)
{
    fs.unlink(`./backup/test-${i}.txt`,(err)=>{
        console.log("Deleted");
    })
}




