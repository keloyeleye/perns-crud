const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv').config();
const { sequelize, Movie } = require('./models');


// middleware
app.use(express.json()); // req.body
app.use(cors());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../client/public/', 'uploads'),
    filename: function (req, file, cb) {   
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )  
    }
})




app.post('/create', async (req, res) => {	
    try {
        // 'avatar' is the name of our file input field in the HTML form

        let upload = multer({ storage: storage}).single('avatar');

        await upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const {movieName, movieReview} = req.body
            const avatar = req.file.filename

            const movies =  Movie.create({ movieName, movieReview, avatar})

            return res.json({success: 1})
            
        }); 

    }catch (err) {console.log(err)}
})


// Read All
app.get('/view', async(req, res) => {
    try {
      const movies = await Movie.findAll()
      return res.json(movies)
    } catch (err) {
      return res.status(500).json({error:'Server could not fetch movie'})
    }
  })


  // Update
app.put('/view/:id', async(req, res) => {
    const id = req.params.id
    try {
        // 'avatar' is the name of our file input field in the HTML form

        let upload = multer({ storage: storage}).single('avatar');

        await upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields

            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

        const {movieName, movieReview} = req.body
        const avatar = req.file.filename

        const update =  Movie.update({ movieName: movieName,movieReview: movieReview, avatar: avatar},{
            where:{id: id}
        }) 
       

            
        }); 

    }catch (err) {
        
      return res.status(500).json({error:'Server could not update this movie'})
    }
});



  // Delete a Movie
app.delete('/view/:id', async(req, res) => {
    const id = req.params.id
    try {
      const movie = await Movie.findOne({ where: {id} })
      await movie.destroy()
      return res.json({message: 'Movie Deleted!'})
    } catch (err) {
      return res.status(500).json({error:'Server could not fetch this movie'})
    }
  })





app.listen({ port:5000 }, async () =>{
    console.log('Server is running on localhost')
    // This will always create tables when we run node app.js or node index.js
    // await sequelize.sync({force: true}) 
    // you can use alter:true to sync

    await sequelize.authenticate({force: true}) 
    console.log('Database is valid')
})
