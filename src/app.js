const express = require('express');
const cors = require('cors');
const logger = require('./config/logger');
const japaneseSentencesRouter = require('./routes/japanese-sentences');

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 路由
app.use('/api/japanese-sentences', japaneseSentencesRouter);

// 错误处理
app.use((err, req, res, next) => {
    logger.error('服务器错误：', err);
    res.status(500).json({
        code: 500,
        message: '服务器内部错误'
    });
});

// 启动服务器
app.listen(port, () => {
    logger.info(`服务器启动成功，监听端口 ${port}`);
});

module.exports = app; 