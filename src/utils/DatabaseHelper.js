const db = require('../config/database');
const logger = require('../config/logger');

class DatabaseHelper {
    /**
     * 执行SQL查询并返回结果
     * @param {string} sql - SQL语句
     * @param {Array} params - SQL参数
     * @returns {Promise} - 查询结果
     */
    static async query(sql, params = []) {
        try {
            const [results] = await db.execute(sql, params);
            return results;
        } catch (error) {
            logger.error(`SQL执行错误: ${error.message}`);
            logger.error(`SQL语句: ${sql}`);
            logger.error(`参数: ${JSON.stringify(params)}`);
            throw error;
        }
    }

    /**
     * 插入数据
     * @param {string} table - 表名
     * @param {Object} data - 要插入的数据对象
     * @returns {Promise} - 插入结果
     */
    static async insert(table, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`;
        
        try {
            const result = await this.query(sql, values);
            logger.info(`成功插入数据到 ${table}, ID: ${result.insertId}`);
            return result;
        } catch (error) {
            logger.error(`插入数据失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 更新数据
     * @param {string} table - 表名
     * @param {Object} data - 要更新的数据对象
     * @param {Object} where - 更新条件
     * @returns {Promise} - 更新结果
     */
    static async update(table, data, where) {
        const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const sql = `UPDATE ${table} SET ${updates} WHERE ${conditions}`;
        const values = [...Object.values(data), ...Object.values(where)];

        try {
            const result = await this.query(sql, values);
            logger.info(`成功更新 ${table} 表中的 ${result.affectedRows} 条记录`);
            return result;
        } catch (error) {
            logger.error(`更新数据失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 删除数据
     * @param {string} table - 表名
     * @param {Object} where - 删除条件
     * @returns {Promise} - 删除结果
     */
    static async delete(table, where) {
        const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const sql = `DELETE FROM ${table} WHERE ${conditions}`;
        const values = Object.values(where);

        try {
            const result = await this.query(sql, values);
            logger.info(`成功从 ${table} 删除 ${result.affectedRows} 条记录`);
            return result;
        } catch (error) {
            logger.error(`删除数据失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 查找单条记录
     * @param {string} table - 表名
     * @param {Object} where - 查询条件
     * @returns {Promise} - 查询结果
     */
    static async findOne(table, where) {
        const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const sql = `SELECT * FROM ${table} WHERE ${conditions} LIMIT 1`;
        const values = Object.values(where);

        try {
            const results = await this.query(sql, values);
            return results[0] || null;
        } catch (error) {
            logger.error(`查询数据失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * 查找多条记录
     * @param {string} table - 表名
     * @param {Object} where - 查询条件
     * @returns {Promise} - 查询结果
     */
    static async findAll(table, where = {}) {
        let sql = `SELECT * FROM ${table}`;
        const values = [];

        if (Object.keys(where).length > 0) {
            const conditions = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
            sql += ` WHERE ${conditions}`;
            values.push(...Object.values(where));
        }

        try {
            return await this.query(sql, values);
        } catch (error) {
            logger.error(`查询数据失败: ${error.message}`);
            throw error;
        }
    }
}

module.exports = DatabaseHelper; 