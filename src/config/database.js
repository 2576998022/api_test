const mysql = require('mysql2');           // MySQL数据库驱动
const dbConfig = require('./db.config');   // 数据库配置参数
const logger = require('./logger');        // 日志工具

// 创建数据库连接池
// 连接池可以重用数据库连接，提高性能
const pool = mysql.createPool({
    host: dbConfig.host,                  // 数据库服务器地址
    port: dbConfig.port,                  // 数据库端口
    user: dbConfig.user,                  // 数据库用户名
    password: dbConfig.password,          // 数据库密码
    database: dbConfig.database,          // 数据库名
    waitForConnections: true,             // 当没有可用连接时等待
    connectionLimit: 10,                  // 最大连接数
    queueLimit: 0                         // 队列限制（0表示不限制）
});

// 导出 promise 版本的连接池
// 这样可以使用 async/await 语法进行数据库操作
module.exports = pool.promise(); 