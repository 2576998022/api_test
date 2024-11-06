# AI日语学习API服务

## 项目说明
本项目是一个日语学习API服务，提供日语句子的存储和查询功能，包含日语原文、中文翻译、罗马音和音频文件。

## 项目结构
project/
├── config/             # 配置文件目录
│   ├── database.js     # 数据库连接配置
│   ├── db.config.js    # 数据库参数配置
│   └── logger.js       # 日志配置
├── models/             # 数据模型目录
│   └── japanese_sentences.js    # 日语句子表模型
├── utils/             # 工具类目录
│   └── DatabaseHelper.js        # 数据库操作工具类
├── tests/             # 测试文件目录
│   └── japanese-sentences-test.js    # 日语句子功能测试
├── public/            # 静态资源目录
│   └── audios/        # 音频文件存储目录
├── package.json       # 项目配置文件
└── readme.md         # 项目说明文档

## 数据库配置
项目使用MySQL数据库，通过连接池管理数据库连接。

### 数据库连接参数
可以通过环境变量修改以下默认配置：
- 主机：127.0.0.1 (环境变量：DB_HOST)
- 端口：3306 (环境变量：DB_PORT)
- 用户名：root (环境变量：DB_USER)
- 密码：lxbx12345. (环境变量：DB_PASSWORD)
- 数据库名：api_test_db (环境变量：DB_NAME)

### 连接池配置
- 最大连接数：10
- 等待连接：是
- 队列限制：无限制

## 日志系统
使用winston实现的日志系统，支持多级别日志记录。

### 日志级别
按照严重程度从高到低：
1. error - 红色（错误信息）
2. warn - 黄色（警告信息）
3. info - 绿色（普通信息）
4. http - 品红色（HTTP请求信息）
5. debug - 蓝色（调试信息）

### 日志存储
- 控制台：实时输出所有级别日志
- error.log：仅记录错误级别日志
- all.log：记录所有级别日志

## 数据库表结构

### japanese_sentences 表
存储日语学习句子数据。

#### 字段说明
| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| id | INT | 自增主键 | 1 |
| japanese | VARCHAR(255) | 日语原文 | ありがとうございます。|
| chinese | VARCHAR(255) | 中文翻译 | 非常感谢。|
| romaji | VARCHAR(255) | 罗马音 | Arigatou gozaimasu |
| audio_url | VARCHAR(512) | 音频文件URL | /audios/arigatou_gozaimasu.mp3 |
| created_at | TIMESTAMP | 创建时间 | 2024-03-20 10:30:45 |
| updated_at | TIMESTAMP | 更新时间 | 2024-03-20 10:30:45 |

#### 音频文件存储规范
- 存储位置：public/audios 目录
- 文件命名：使用罗马音全小写，单词间用下划线连接
- 文件格式：MP3
- URL格式：/audios/[romaji].mp3

## 项目运行

### 安装依赖
npm install

### 运行测试
npm test

### 测试内容
1. 数据库表创建
2. 初始数据插入
3. 数据查询验证
4. 单条记录查询

## 开发说明

### 数据库操作工具 (DatabaseHelper)
提供以下数据库操作方法：
- query(): 执行自定义SQL查询
- insert(): 插入数据
- update(): 更新数据
- delete(): 删除数据
- findOne(): 查询单条记录
- findAll(): 查询多条记录

### 日语句子模型 (JapaneseSentences)
提供以下功能：
- createTable(): 创建数据表
- insertInitialData(): 插入初始测试数据