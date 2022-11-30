//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

const apiRoutes = require('./routesAPI')

const ConstructorMethod = (app) => {
    app.use('/', apiRoutes);

    app.use('*', (req, res) => {
        return res.status(404).json("Not Found");
    })
}

module.exports = ConstructorMethod;