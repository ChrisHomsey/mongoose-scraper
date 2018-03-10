module.exports = (app) => {

    app.get('/', (req,res) => {
        res.render("home", { activeHome: true });
    })

    app.get('/saved', (req,res)=> {
        res.render("saved", { activeSaved: true });
    })

}