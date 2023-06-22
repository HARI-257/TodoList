const express = require('express')
const bodyParser = require('body-parser')


const app = express()
var items = []
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.get('/',(req,res) =>{

    var today = new Date()
    var options = {
        weekday:'long',
        day:'numeric',
        month:'long'
    }
    var day = today.toLocaleDateString('en-US',options)
    res.render('list',{currentDate: day,Todos:items})
})

app.post('/',(req,res) =>{

    var item = req.body.todo
    items.push(item)
    res.redirect('/')
})

app.listen(process.env.PORT || 3000,()=>{
    console.log('3000 listening');
})