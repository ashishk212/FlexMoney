const express=require("express");
const app= express();
const port=process.env.PORT || 5000;
const path=require('path');
app.use(express.json());
app.set({"Content-type":"application/json"});
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"/")));
const services=require("./services/services")
app.get('/',(req,resp)=> 
{
   resp.sendFile(path.join(__dirname,"/index.html"))
})
 
app.post('/',(req,resp)=>
{
      
      let {name,email,phnum,dob,timing}=req.body;
     
     let d=new Date(); 
     dob=new Date(dob);
    let checkdob65=1000*60*60*24*365*65;
    let checkdob18=1000*60*60*24*365*18;
     let age=d-dob;
     if(age<checkdob65 && age>=checkdob18 )
    {
      const data= services.insertValues({name,email,phnum,dob,timing});
      console.log(data);
     return resp.send(data);
    }
     else{
          return resp.send({message:"You are not eligible"})
     }
      // resp.sendFile(path.join(__dirname,"/index.html"))
})
  app.listen(port,(err)=>{
    if(!err) 
    {
        console.log("Server is listening on port "+port);
    }
})