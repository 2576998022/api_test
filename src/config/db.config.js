// 数据库配置
module.exports = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'lxbx12345.',
    database: process.env.DB_NAME || 'api_test_db'
}; 