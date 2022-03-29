module.exports =  {
    appenders: {
        infoLogs: {
            type: 'dateFile',
            filename: 'logs/info/info.log',
            backups: 200,  // 仅保留最新的五个日志文件
            pattern: ".yyyy-MM-dd-hh",
            alwaysIncludePattern: true,
            compress: true
        },
        errorLogs: {
            type: 'dateFile',
            filename: 'logs/error/error.log',
            pattern: ".yyyy-MM-dd-hh",
            backups: 200,
            compress: true
        }
    },
    categories: {
        default: { appenders: ['infoLogs'], level: 'INFO' },
        err: { appenders: ['errorLogs'], level: 'ERROR' },
    }
}