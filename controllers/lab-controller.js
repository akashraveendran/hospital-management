

const getHomePage = (req, res) => {
    res.render('index', { title: 'Laboratory' });
}



module.exports = {
    getHomePage
}