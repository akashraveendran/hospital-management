

const getHomePage = (req, res) => {
    res.render('index', { title: 'Clinic' });
}



module.exports = {
    getHomePage
}