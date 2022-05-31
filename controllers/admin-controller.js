

const getHomePage = (req, res) => {
    res.render('index', { title: 'Admin' });
}
const getLoginPage = (req, res) => {
    res.send("Login page get request");
}
const doLogin = (req, res) => {
    res.send("Login page post request");
}
const getAllHopitals = (req, res) => {
    res.send("all hospitals request");
}
const deleteHospital = (req, res) => {
    res.send("delete hospital request");
}
const addHospitalPage = (req, res) => {
    res.send("add hospital page get request");
}
const createHospital = (req, res) => {
    res.send("add hospital page post request");
}
const getAllClinics = (req, res) => {
    res.send("all hospitals request");
}
const addClinicPage = (req, res) => {
    res.send("add clinic page get request");
}
const createClinic = (req, res) => {
    res.send("add clinic page post request");
}
const deleteClinic = (req, res) => {
    res.send("delete clinic page  request");
}
const viewAllMessages = (req, res) => {
    res.send("view clinic messages")
}
const sendMessagePage = (req, res) => {
    res.send("send message get request")
}
const sendMessage = (req, res) => {
    res.send("send message to admin")
}

const viewCheckupDatesPage = (req, res) => {
    res.send("checkup dates")
}
const viewAllUsersPage = (req, res) => {
    res.send("view all users")
}
const deleteUser = (req, res) => {
    res.send("delete user")
}




module.exports = {
    getHomePage,
    getLoginPage,
    doLogin,
    getAllHopitals,
    addHospitalPage,
    createHospital,
    deleteHospital,
    getAllClinics,
    addClinicPage,
    createClinic,
    deleteClinic,
    viewAllMessages,
    sendMessagePage,
    sendMessage,
    viewCheckupDatesPage,
    viewAllUsersPage,
    deleteUser
}