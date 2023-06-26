const express = require('express')
const bodyParser = require('body-parser')
const date = require(__dirname+'/date.js')

const app = express()
const items = []
const workList = []
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.get('/',(req,res) =>{
    const day = date.getDate()
    res.render('list',{listTitle: day,Todos:items})
})

app.post('/',(req,res) =>{
    const item = req.body.todo
    if(req.body.list === 'Work'){
        workList.push(item)
        res.redirect('/work')
    }else{
        items.push(item)
        res.redirect('/')
    }
    
})

app.get('/work',(req,res) => {
    res.render('list',{listTitle: "Work List", Todos: workList})
})

app.post('/work',(req,res) => {
    const item = req.body.todo
    workList.push(item)
    res.redirect('/work')
})

app.get('/about',(req,res) => {
    res.render('about')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('3000 listening');
})