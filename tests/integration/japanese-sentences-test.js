const JapaneseSentences = require('../models/japanese_sentences');
const DatabaseHelper = require('../utils/DatabaseHelper');
const logger = require('../config/logger');

async function testJapaneseSentences() {
    try {
        // 先删除已存在的表
        try {
            await DatabaseHelper.query('DROP TABLE IF EXISTS japanese_sentences');
            logger.info('旧表删除成功');
        } catch (error) {
            logger.error('删除旧表失败：', error);
            throw error;
        }

        // 创建新表
        await JapaneseSentences.createTable();
        logger.info('新表创建成功，包含音频字段');
        
        // 插入初始数据
        await JapaneseSentences.insertInitialData();
        
        // 验证数据
        const sentences = await DatabaseHelper.findAll('japanese_sentences');
        logger.info(`成功查询到 ${sentences.length} 条日语句子`);
        
        // 测试查询单条数据并验证音频字段
        const firstSentence = await DatabaseHelper.findOne('japanese_sentences', { id: 1 });
        logger.info('第一条数据:', firstSentence);
        
        // 验证音频字段是否存在
        if (firstSentence.audio_url) {
            logger.info('音频字段验证成功:', firstSentence.audio_url);
        } else {
            throw new Error('音频字段不存在或为空');
        }

    } catch (error) {
        logger.error('测试过程中发生错误：', error);
        throw error;
    }
}

// 运行测试
testJapaneseSentences()
    .then(() => {
        logger.info('所有测试完成！');
        process.exit(0);
    })
    .catch((error) => {
        logger.error('测试失败：', error);
        process.exit(1);
    }); 