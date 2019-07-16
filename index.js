metrics = require('./metrics')
express = require('express')
app = express()

app.set('port', 1337)
app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.listen(
  app.get('port'),
  () => console.log(`server listening on ${app.get('port')}`)
)

app.get(
  '/hello/Team9',
  (req, res) => res.render('intro.ejs')
)

app.get(
'/hello/:name',
(req, res) => res.render('hello.ejs', {name: req.params.name})
)

app.get('/',
(req, res) => res.render('use.ejs')
)

app.use(function(err, req, res, next){
  res.status(404).send('Wrong path')
})

app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
      res.status(200).json(data)
  })
})
path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
