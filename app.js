const express = require("express");
const morgan = require("morgan");
const app = express();
const { db } = require('./models');
const wiki = require('./routs/wiki')

//static folder
app.use(express.static(__dirname + "/public"));
// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use('/wiki', wiki)

app.use('/', (req, res) => {
    res.redirect('/wiki');
});



db.authenticate().
then(() => {
    console.log('connected to the database');
})

const PORT = 3000;


const init = async () => {
    // await User.sync()
    // await Page.sync()
    await db.sync();

    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
    });
};

init();

