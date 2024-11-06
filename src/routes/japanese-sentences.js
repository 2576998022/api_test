const express = require('express');
const router = express.Router();
const DatabaseHelper = require('../utils/DatabaseHelper');
const logger = require('../config/logger');

// 批量添加日语句子
router.post('/batch', async (req, res) => {
    try {
        const { sentences } = req.body;
        
        if (!Array.isArray(sentences)) {
            return res.status(400).json({
                code: 400,
                message: '数据格式错误，sentences必须是数组'
            });
        }

        const results = {
            total: sentences.length,
            success: 0,
            failed: 0,
            items: []
        };

        for (const sentence of sentences) {
            try {
                const result = await DatabaseHelper.insert('japanese_sentences', sentence);
                results.success++;
                results.items.push({
                    id: result.insertId,
                    ...sentence,
                    created_at: new Date().toISOString()
                });
            } catch (error) {
                results.failed++;
                logger.error(`插入���据失败: ${error.message}`, sentence);
            }
        }

        res.json({
            code: 200,
            message: '批量添加成功',
            data: results
        });

    } catch (error) {
        logger.error('批量添加数据失败：', error);
        res.status(500).json({
            code: 500,
            message: '服务器内部错误'
        });
    }
});

module.exports = router; 