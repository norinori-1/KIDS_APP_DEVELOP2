const express = require('express')
var db = require('./models/');
// const { sequelize } = require('./models')

const app = express()
const port = 3000

app.get('/courses', function(req, res, next) {
    
    // Sequelizeのモデルを使ってデータを取得する
    db.Course.findAll({
        
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        
    }).then(courses => {

        if (!courses) {
            console.log("クイズデータを取得できませんでした");
            res.send('Error');
        } else {
            res.json(courses);
        }
    });
});

app.get('/course/:courseId', function(req, res, next) {
    var courseId = req.params.courseId;

    // Sequelizeのモデルを使ってデータを取得する
    db.Quiz.findAll({
        where: {
            course_id: courseId
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: db.Answer,
            attributes: {exclude: ['createdAt', 'updatedAt']}, 
        }],       
    }).then(quizzes => {

        if (!quizzes) {
            console.log("クイズデータを取得できませんでした");
            res.send('Error');
        } else {
            res.json(quizzes);
        }
    });
});

// app.use(express.json())

// const port = process.env.port || 8000;

app.get('/', (req, res) => res.send('INDEX'));

app.listen(port, console.log(`Server start on ${port}`));

// app.get('/quizzes', async (req, res) => {
//     try {
//         const quizzes = await Quiz.findall()
        
//         return res.json(quizzes)
//     } catch(err){
//         console.log(err)
//         return res.status(500).json( {error: 'Something went wrong'})
//     }
// })


// app.listen({port: 8000}), async () => {
//     await sequelize.authenticate()
//     console.log('Server up on http//localhost:8000')
//     console.log('Database connected!')
