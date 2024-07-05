const express= require('express')
const app= express()
const port=4000
app.get('/',function(req,res){
    res.send("hello esha")
})
app.listen(port);