var monngoURL = 'mongodb://mongo-service/database'

mongoose.connect(monngoURL, { useNewUrlParser: true })
    .then(
        () => {
            console.log("connected to mongo");
        }
    ).catch((error) => {
        console.log("unable to connect to mongoDB");
    });

app.listen(3000, function() {
    console.log('listening on 3000')
});

app.get('/api', (req, res) => {     
    res.send('Hello World') 
  })