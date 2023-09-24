module.exports = {
    modelBaseDirectory: 'app_server/models', 
    models: ['*.js', '!db.js'],
    data: 'data',
    db: 'mongodb://127.0.0.1:27017/travlr'
};