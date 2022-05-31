

const getHomePage = (req, res) => {
    res.render('index', { title: 'Admin' });
}



module.exports = {
    getHomePage
}