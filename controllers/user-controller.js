


const getHomePage = (req, res) => {
    res.render('index', { title: 'Express' });
}



module.exports = {
    getHomePage
}