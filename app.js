const express = require('express')
const bodyParser = require('body-parser')


const app = express()
let items = []
let workList = []
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.get('/',(req,res) =>{

    let today = new Date()
    let options = {
        weekday:'long',
        day:'numeric',
        month:'long'
    }
    let day = today.toLocaleDateString('en-US',options)
    res.render('list',{listTitle: day,Todos:items})
})

app.post('/',(req,res) =>{
    let item = req.body.todo
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
    let item = req.body.todo
    workList.push(item)
    res.redirect('/work')
})

app.get('/about',(req,res) => {
    res.render('about')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('3000 listening');
})