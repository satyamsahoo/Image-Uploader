let appConfig =  {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri : 'mongodb://127.0.0.1:27017/files',
}
appConfig.version = '/';

module.exports = {
    port : appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    env : appConfig.env,
    db : appConfig.db.uri,
    version : appConfig.version
}