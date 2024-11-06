const DatabaseHelper = require('../utils/DatabaseHelper');
const logger = require('../config/logger');

class JapaneseSentences {
    static async createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS japanese_sentences (
                id INT AUTO_INCREMENT PRIMARY KEY,
                japanese VARCHAR(255) NOT NULL COMMENT '日语原文',
                chinese VARCHAR(255) NOT NULL COMMENT '中文翻译',
                romaji VARCHAR(255) NOT NULL COMMENT '罗马音',
                audio_url VARCHAR(512) DEFAULT NULL COMMENT '音频文件URL',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='日语学习句子表';
        `;

        try {
            await DatabaseHelper.query(sql);
            logger.info('japanese_sentences表创建成功');
        } catch (error) {
            logger.error('创建japanese_sentences表失败：', error);
            throw error;
        }
    }

    static async insertInitialData() {
        const initialData = [
            {
                japanese: "ありがとうございます。",
                chinese: "非常感谢。",
                romaji: "Arigatou gozaimasu",
                audio_url: "/audios/arigatou_gozaimasu.mp3"
            },
            {
                japanese: "あの山が高いです。",
                chinese: "那座山很高。",
                romaji: "Ano yama ga takai desu",
                audio_url: "/audios/ano_yama_ga_takai_desu.mp3"
            },
            {
                japanese: "あなたはどうですか。",
                chinese: "你怎么样？",
                romaji: "Anata wa dou desu ka",
                audio_url: "/audios/anata_wa_dou_desu_ka.mp3"
            },
            {
                japanese: "あしたは晴れるでしょう。",
                chinese: "明天会晴吧。",
                romaji: "Ashita wa hare ru deshou",
                audio_url: "/audios/ashita_wa_hare_ru_deshou.mp3"
            },
            {
                japanese: "あの本は面白いです。",
                chinese: "那本书很有趣。",
                romaji: "Ano hon wa omoshiroi desu",
                audio_url: "/audios/ano_hon_wa_omoshiroi_desu.mp3"
            },
            {
                japanese: "あの人はとても親切です。",
                chinese: "那个人很亲切。",
                romaji: "Ano hito wa totemo shinseki desu",
                audio_url: "/audios/ano_hito_wa_totemo_shinseki_desu.mp3"
            },
            {
                japanese: "あの店の料理がおいしいです。",
                chinese: "那家店的料理很好吃。",
                romaji: "Ano mise no ryouri ga oishii desu",
                audio_url: "/audios/ano_mise_no_ryouri_ga_oishii_desu.mp3"
            },
            {
                japanese: "あの花はきれいです。",
                chinese: "那朵花很漂亮。",
                romaji: "Ano hana wa kirei desu",
                audio_url: "/audios/ano_hana_wa_kirei_desu.mp3"
            },
            {
                japanese: "あと少し待ってください。",
                chinese: "请再等一下。",
                romaji: "Ato sukoshi matte kudasai",
                audio_url: "/audios/ato_sukoshi_matte_kudasai.mp3"
            }
        ];

        try {
            for (const data of initialData) {
                await DatabaseHelper.insert('japanese_sentences', data);
            }
            logger.info('初始数据插入成功');
        } catch (error) {
            logger.error('插入初始数据失败：', error);
            throw error;
        }
    }
}

module.exports = JapaneseSentences; 