


const getHomePage = (req, res) => {
    res.render('index', { title: 'Hospital' });
}



module.exports = {
    getHomePage
}