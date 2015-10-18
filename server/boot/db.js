module.exports = function(app) {
    //MongoDB automigration and collection initialization
    app.dataSources.Eventstore.autoupdate('event', function(err) {
        if (err) throw err;
    });
};