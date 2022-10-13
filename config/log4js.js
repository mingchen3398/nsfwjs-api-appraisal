module.exports =  {
    appenders: {
        infoLogs: {
            type: 'dateFile',
            filename: 'logs/info/info.log',
            backups: 4800, 
            pattern: ".yyyy-MM-dd-hh",
            alwaysIncludePattern: true,
            //compress: true
        },
        errorLogs: {
            type: 'dateFile',
            filename: 'logs/error/error.log',
            pattern: ".yyyy-MM-dd-hh",
            backups: 4800,
            //compress: true
        }
    },
    categories: {
        default: { appenders: ['infoLogs'], level: 'INFO' },
        err: { appenders: ['errorLogs'], level: 'ERROR' },
    }
}