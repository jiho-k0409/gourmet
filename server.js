const express = require('express');
const app = express();
const ejs = require("ejs");

const fs = require("fs");
const port = 3020;

app.set('views',__dirname+'/views');
app.set("view engine","ejs");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


let objs = []


app.get('/', (req, res) => {
  res.render('index');
})

app.post('/create',(req,res)=>{
  console.log(req.body)
  fs.writeFileSync(`./public/data/${req.body.name}.txt`,`${req.body.name},${req.body.place},${req.body.evaluation}`,
  err=>{
    if(err){
      console.log('write file =>'+err);
    }else{
      console.log('Finished writing');
      res.json({msg:'success'});
    }
  });
})


app.get('/list',(req,res)=>{
  crawlingData();
  console.log(makeJSON())
  res.header('Acces-Conntrol-Allow-Origin','http://localhost:3000')
  res.json(makeJSON())
})

app.post('/del',(req,res)=>{
  //console.log(req.body)
  fs.unlinkSync(`./public/data/${req.body.name}.txt`)
  console.log(req.body.name+'delete success')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

function crawlingData(){
  objs=[];
  let articleObj;
  let files = fs.readdirSync('./public/data');
  console.log(files);
  files.forEach(x=>{
    let text = fs.readFileSync(`./public/data/${x}`,'utf-8');
    let splitedText = text.split(',');
    articleObj =[splitedText[0],splitedText[1],splitedText[2]];
    
    objs.push(articleObj);
    //console.log(objs)
  });
}

function makeJSON(){
  let willJSON = {}
  for(var i=0;i<objs.length;i++){
    willJSON[`restaurant${i}`] = objs[i];
  };
  //console.log(i)
  let alreadyJSON={};
  alreadyJSON = JSON.stringify(willJSON);
  return alreadyJSON
}