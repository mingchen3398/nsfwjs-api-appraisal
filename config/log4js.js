module.exports =  {
    appenders: {
        infoLogs: {
            type: 'dateFile',
            filename: 'logs/info/info.log',
            backups: 48, 
            pattern: ".yyyy-MM-dd-hh",
            alwaysIncludePattern: true,
            //compress: true
        },
        errorLogs: {
            type: 'dateFile',
            filename: 'logs/error/error.log',
            pattern: ".yyyy-MM-dd-hh",
            backups: 48,
            //compress: true
        }
    },
    categories: {
        default: { appenders: ['infoLogs'], level: 'INFO' },
        err: { appenders: ['errorLogs'], level: 'ERROR' },
    }
}