module.exports =  {
    appenders: {
        infoLogs: {
            type: 'dateFile',
            filename: 'logs/info/info.log',
            backups: 10,  // 仅保留最新的五个日志文件
            pattern: ".yyyy-MM-dd-hh", // 用于确定何时滚动日志的模式
            alwaysIncludePattern: true,
            compress: true
        },
        errorLogs: {
            type: 'file',
            filename: 'logs/error/error.log',
            maxLogSize: 10485760,
            pattern: ".yyyy-MM-dd-hh", // 用于确定何时滚动日志的模式
            backups: 20,
            compress: true
        }
    },
    categories: {
        default: { appenders: ['infoLogs'], level: 'INFO' },
        err: { appenders: ['errorLogs'], level: 'ERROR' },
    }
}