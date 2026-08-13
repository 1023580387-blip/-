import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '..', 'database.sqlite');
export const db = new Database(dbPath);

// 启用外键约束
db.pragma('foreign_keys = ON');

// 初始化数据库表
export function initDatabase() {
  // 用户表
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT '',
      level INTEGER DEFAULT 1,
      experience INTEGER DEFAULT 0,
      target_language TEXT DEFAULT 'en',
      proficiency_level TEXT DEFAULT 'beginner',
      daily_goal INTEGER DEFAULT 20,
      streak_days INTEGER DEFAULT 0,
      last_study_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 语言表
  db.exec(`
    CREATE TABLE IF NOT EXISTS languages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_native TEXT NOT NULL,
      flag TEXT NOT NULL
    )
  `);

  // 课程表
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      language_id TEXT NOT NULL,
      level TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      thumbnail TEXT,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY (language_id) REFERENCES languages(id)
    )
  `);

  // 单元表
  db.exec(`
    CREATE TABLE IF NOT EXISTS units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      order_index INTEGER DEFAULT 0,
      required_xp INTEGER DEFAULT 0,
      FOREIGN KEY (course_id) REFERENCES courses(id)
    )
  `);

  // 单词表
  db.exec(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_id INTEGER NOT NULL,
      word TEXT NOT NULL,
      translation TEXT NOT NULL,
      pronunciation TEXT,
      audio_url TEXT,
      example TEXT,
      example_translation TEXT,
      part_of_speech TEXT,
      difficulty INTEGER DEFAULT 1,
      FOREIGN KEY (unit_id) REFERENCES units(id)
    )
  `);

  // 语法练习表
  db.exec(`
    CREATE TABLE IF NOT EXISTS grammar_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_id INTEGER NOT NULL,
      grammar_rule TEXT NOT NULL,
      explanation TEXT NOT NULL,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_answer INTEGER NOT NULL,
      difficulty INTEGER DEFAULT 1,
      FOREIGN KEY (unit_id) REFERENCES units(id)
    )
  `);

  // 听力训练表
  db.exec(`
    CREATE TABLE IF NOT EXISTS listening_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_id INTEGER NOT NULL,
      audio_url TEXT,
      script TEXT NOT NULL,
      translation TEXT NOT NULL,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      correct_answer INTEGER NOT NULL,
      difficulty INTEGER DEFAULT 1,
      FOREIGN KEY (unit_id) REFERENCES units(id)
    )
  `);

  // 口语练习表
  db.exec(`
    CREATE TABLE IF NOT EXISTS speaking_exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      unit_id INTEGER NOT NULL,
      phrase TEXT NOT NULL,
      translation TEXT NOT NULL,
      pronunciation_hint TEXT,
      audio_url TEXT,
      difficulty INTEGER DEFAULT 1,
      FOREIGN KEY (unit_id) REFERENCES units(id)
    )
  `);

  // 用户学习进度表
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      course_id INTEGER,
      unit_id INTEGER,
      word_id INTEGER,
      exercise_type TEXT,
      status TEXT DEFAULT 'not_started',
      score INTEGER DEFAULT 0,
      attempts INTEGER DEFAULT 0,
      last_studied_at DATETIME,
      completed_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, course_id, unit_id, word_id, exercise_type)
    )
  `);

  // 用户单词熟练度表
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_word_mastery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      word_id INTEGER NOT NULL,
      mastery_level INTEGER DEFAULT 0,
      correct_count INTEGER DEFAULT 0,
      wrong_count INTEGER DEFAULT 0,
      last_reviewed_at DATETIME,
      next_review_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (word_id) REFERENCES words(id),
      UNIQUE(user_id, word_id)
    )
  `);

  // 成就徽章表
  db.exec(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      condition_type TEXT NOT NULL,
      condition_value INTEGER NOT NULL,
      reward_xp INTEGER DEFAULT 0
    )
  `);

  // 用户成就表
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id INTEGER NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (achievement_id) REFERENCES achievements(id),
      UNIQUE(user_id, achievement_id)
    )
  `);

  // 社区帖子表
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      language_id TEXT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'general',
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (language_id) REFERENCES languages(id)
    )
  `);

  // 评论表
  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 每日学习记录表
  db.exec(`
    CREATE TABLE IF NOT EXISTS daily_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      study_date DATE NOT NULL,
      xp_earned INTEGER DEFAULT 0,
      words_studied INTEGER DEFAULT 0,
      minutes_spent INTEGER DEFAULT 0,
      exercises_completed INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, study_date)
    )
  `);

  console.log('Database initialized successfully');
}

// 插入初始数据
export function seedData() {
  // 插入语言数据
  const languages = [
    { id: 'en', name: '英语', name_native: 'English', flag: '🇺🇸' },
    { id: 'ja', name: '日语', name_native: '日本語', flag: '🇯🇵' },
    { id: 'ko', name: '韩语', name_native: '한국어', flag: '🇰🇷' },
    { id: 'fr', name: '法语', name_native: 'Français', flag: '🇫🇷' },
    { id: 'de', name: '德语', name_native: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', name: '西班牙语', name_native: 'Español', flag: '🇪🇸' },
  ];

  const insertLang = db.prepare(
    'INSERT OR IGNORE INTO languages (id, name, name_native, flag) VALUES (?, ?, ?, ?)'
  );
  languages.forEach(lang => insertLang.run(lang.id, lang.name, lang.name_native, lang.flag));

  // 插入成就数据
  const achievements = [
    { name: '初学者', description: '完成第一个练习', icon: '🌱', condition_type: 'exercises', condition_value: 1, reward_xp: 10 },
    { name: '学习达人', description: '完成100个练习', icon: '📚', condition_type: 'exercises', condition_value: 100, reward_xp: 100 },
    { name: '词汇大师', description: '掌握100个单词', icon: '📖', condition_type: 'words', condition_value: 100, reward_xp: 200 },
    { name: '连续学习7天', description: '连续学习7天', icon: '🔥', condition_type: 'streak', condition_value: 7, reward_xp: 50 },
    { name: '连续学习30天', description: '连续学习30天', icon: '💎', condition_type: 'streak', condition_value: 30, reward_xp: 300 },
    { name: '社区新星', description: '发布第一篇帖子', icon: '✨', condition_type: 'posts', condition_value: 1, reward_xp: 20 },
    { name: '满级学员', description: '达到等级10', icon: '👑', condition_type: 'level', condition_value: 10, reward_xp: 500 },
    { name: '听力高手', description: '完成50个听力练习', icon: '🎧', condition_type: 'listening', condition_value: 50, reward_xp: 150 },
    { name: '口语达人', description: '完成50个口语练习', icon: '🗣️', condition_type: 'speaking', condition_value: 50, reward_xp: 150 },
    { name: '语法专家', description: '完成50个语法练习', icon: '✏️', condition_type: 'grammar', condition_value: 50, reward_xp: 150 },
  ];

  const insertAchievement = db.prepare(
    'INSERT OR IGNORE INTO achievements (name, description, icon, condition_type, condition_value, reward_xp) VALUES (?, ?, ?, ?, ?, ?)'
  );
  achievements.forEach(a => insertAchievement.run(a.name, a.description, a.icon, a.condition_type, a.condition_value, a.reward_xp));

  // 插入英语课程数据
  seedEnglishCourses();
  seedJapaneseCourses();
  seedKoreanCourses();

  console.log('Data seeded successfully');
}

function seedEnglishCourses() {
  // 英语入门级课程
  const courseId = insertCourse('en', 'beginner', '英语入门 (A1)', '从零开始学习英语基础，掌握日常用语和基础语法', '🇬🇧', 1);
  if (!courseId) return;

  // 单元1：问候与自我介绍
  const unit1Id = insertUnit(courseId, 'Unit 1: 问候与自我介绍', '学习基本的问候语和自我介绍表达', 1);
  seedUnit1Words(unit1Id);
  seedUnit1Grammar(unit1Id);
  seedUnit1Listening(unit1Id);
  seedUnit1Speaking(unit1Id);

  // 单元2：数字与时间
  const unit2Id = insertUnit(courseId, 'Unit 2: 数字与时间', '学习数字表达和时间询问', 2);
  seedUnit2Words(unit2Id);

  // 英语初级课程
  const course2Id = insertCourse('en', 'elementary', '英语基础 (A2)', '巩固英语基础，学习更多日常对话场景', '📘', 2);
  if (course2Id) {
    const unit3Id = insertUnit(course2Id, 'Unit 1: 餐厅点餐', '学习在餐厅点餐的常用表达', 1);
    seedRestaurantWords(unit3Id);
  }

  // 英语中级课程
  insertCourse('en', 'intermediate', '英语进阶 (B1)', '提升英语表达能力，学习复杂句式和话题讨论', '📗', 3);
  insertCourse('en', 'upper-intermediate', '英语高级 (B2)', '掌握高级词汇和语法，能够流利讨论各类话题', '📕', 4);
  insertCourse('en', 'advanced', '英语精通 (C1)', '精通英语，能够进行学术和专业领域的交流', '📙', 5);
}

function seedJapaneseCourses() {
  const courseId = insertCourse('ja', 'beginner', '日语入门 (N5)', '学习五十音图和基础日语表达', '🇯🇵', 1);
  if (courseId) {
    const unit1Id = insertUnit(courseId, 'Unit 1: 五十音图（あ行）', '学习あ行假名的发音和书写', 1);
    // 五十音图单词
    const words = [
      { word: 'あ', translation: 'a (假名)', pronunciation: 'a', example: 'あいうえお', example_translation: 'a i u e o', part_of_speech: '假名' },
      { word: 'い', translation: 'i (假名)', pronunciation: 'i', example: 'いぬ (犬)', example_translation: '狗', part_of_speech: '假名' },
      { word: 'う', translation: 'u (假名)', pronunciation: 'u', example: 'うみ (海)', example_translation: '海', part_of_speech: '假名' },
      { word: 'え', translation: 'e (假名)', pronunciation: 'e', example: 'えき (駅)', example_translation: '车站', part_of_speech: '假名' },
      { word: 'お', translation: 'o (假名)', pronunciation: 'o', example: 'おさけ (お酒)', example_translation: '酒', part_of_speech: '假名' },
      { word: 'こんにちは', translation: '你好', pronunciation: 'konnichiwa', example: 'こんにちは、田中さん。', example_translation: '你好，田中先生。', part_of_speech: '问候语' },
      { word: 'ありがとう', translation: '谢谢', pronunciation: 'arigatou', example: 'ありがとうございます。', example_translation: '非常感谢。', part_of_speech: '礼貌语' },
      { word: 'さようなら', translation: '再见', pronunciation: 'sayounara', example: 'さようなら、また明日。', example_translation: '再见，明天见。', part_of_speech: '问候语' },
    ];
    words.forEach(w => insertWord(unit1Id, w));
  }
  insertCourse('ja', 'elementary', '日语基础 (N4)', '学习基础日语语法和常用表达', '📘', 2);
  insertCourse('ja', 'intermediate', '日语进阶 (N3)', '提升日语能力，学习更复杂的表达', '📗', 3);
}

function seedKoreanCourses() {
  const courseId = insertCourse('ko', 'beginner', '韩语入门', '学习韩语字母和基础表达', '🇰🇷', 1);
  if (courseId) {
    const unit1Id = insertUnit(courseId, 'Unit 1: 韩文字母（元音）', '学习韩语基本元音字母', 1);
    const words = [
      { word: 'ㅏ', translation: 'a (元音)', pronunciation: 'a', example: '아이', example_translation: '孩子', part_of_speech: '字母' },
      { word: 'ㅑ', translation: 'ya (元音)', pronunciation: 'ya', example: '야구', example_translation: '棒球', part_of_speech: '字母' },
      { word: 'ㅓ', translation: 'eo (元音)', pronunciation: 'eo', example: '어머니', example_translation: '母亲', part_of_speech: '字母' },
      { word: '여', translation: 'yeo (元音)', pronunciation: 'yeo', example: '여자', example_translation: '女人', part_of_speech: '字母' },
      { word: '안녕하세요', translation: '你好', pronunciation: 'annyeonghaseyo', example: '안녕하세요, 만나서 반갑습니다.', example_translation: '你好，很高兴见到你。', part_of_speech: '问候语' },
      { word: '감사합니다', translation: '谢谢', pronunciation: 'gamsahamnida', example: '도와주셔서 감사합니다.', example_translation: '感谢您的帮助。', part_of_speech: '礼貌语' },
    ];
    words.forEach(w => insertWord(unit1Id, w));
  }
  insertCourse('ko', 'elementary', '韩语基础', '学习基础韩语语法和对话', '📘', 2);
  insertCourse('ko', 'intermediate', '韩语进阶', '提升韩语表达能力', '📗', 3);
}

function insertCourse(languageId: string, level: string, title: string, description: string, thumbnail: string, orderIndex: number): number | null {
  const existing = db.prepare('SELECT id FROM courses WHERE language_id = ? AND title = ?').get(languageId, title) as any;
  if (existing) return existing.id;
  
  const result = db.prepare(
    'INSERT INTO courses (language_id, level, title, description, thumbnail, order_index) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(languageId, level, title, description, thumbnail, orderIndex);
  return Number(result.lastInsertRowid);
}

function insertUnit(courseId: number, title: string, description: string, orderIndex: number): number {
  const existing = db.prepare('SELECT id FROM units WHERE course_id = ? AND title = ?').get(courseId, title) as any;
  if (existing) return existing.id;
  
  const result = db.prepare(
    'INSERT INTO units (course_id, title, description, order_index) VALUES (?, ?, ?, ?)'
  ).run(courseId, title, description, orderIndex);
  return Number(result.lastInsertRowid);
}

function insertWord(unitId: number, wordData: any): number {
  const existing = db.prepare('SELECT id FROM words WHERE unit_id = ? AND word = ?').get(unitId, wordData.word) as any;
  if (existing) return existing.id;
  
  const result = db.prepare(
    'INSERT INTO words (unit_id, word, translation, pronunciation, audio_url, example, example_translation, part_of_speech, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(unitId, wordData.word, wordData.translation, wordData.pronunciation || '', '', wordData.example || '', wordData.example_translation || '', wordData.part_of_speech || '', wordData.difficulty || 1);
  return Number(result.lastInsertRowid);
}

function seedUnit1Words(unitId: number) {
  const words = [
    { word: 'Hello', translation: '你好', pronunciation: 'həˈloʊ', example: 'Hello, how are you?', example_translation: '你好，你好吗？', part_of_speech: 'interjection' },
    { word: 'Goodbye', translation: '再见', pronunciation: 'ɡʊdˈbaɪ', example: 'Goodbye, see you tomorrow!', example_translation: '再见，明天见！', part_of_speech: 'interjection' },
    { word: 'Thank you', translation: '谢谢', pronunciation: 'θæŋk juː', example: 'Thank you for your help.', example_translation: '谢谢你的帮助。', part_of_speech: 'phrase' },
    { word: 'Please', translation: '请', pronunciation: 'pliːz', example: 'Please sit down.', example_translation: '请坐。', part_of_speech: 'adverb' },
    { word: 'Yes', translation: '是', pronunciation: 'jes', example: 'Yes, I understand.', example_translation: '是的，我明白了。', part_of_speech: 'adverb' },
    { word: 'No', translation: '不', pronunciation: 'noʊ', example: 'No, thank you.', example_translation: '不，谢谢。', part_of_speech: 'adverb' },
    { word: 'Sorry', translation: '对不起', pronunciation: 'ˈsɑːri', example: 'I\'m sorry for being late.', example_translation: '对不起我迟到了。', part_of_speech: 'adjective' },
    { word: 'Excuse me', translation: '打扰一下', pronunciation: 'ɪkˈskjuːz miː', example: 'Excuse me, where is the station?', example_translation: '打扰一下，请问车站在哪？', part_of_speech: 'phrase' },
    { word: 'My name is', translation: '我的名字是', pronunciation: 'maɪ neɪm ɪz', example: 'My name is John.', example_translation: '我的名字是约翰。', part_of_speech: 'phrase' },
    { word: 'Nice to meet you', translation: '很高兴认识你', pronunciation: 'naɪs tuː miːt juː', example: 'Nice to meet you, Sarah.', example_translation: '莎拉，很高兴认识你。', part_of_speech: 'phrase' },
    { word: 'Good morning', translation: '早上好', pronunciation: 'ɡʊd ˈmɔːrnɪŋ', example: 'Good morning, everyone!', example_translation: '大家早上好！', part_of_speech: 'phrase' },
    { word: 'Good afternoon', translation: '下午好', pronunciation: 'ɡʊd ˌæftərˈnuːn', example: 'Good afternoon, Mr. Smith.', example_translation: '史密斯先生，下午好。', part_of_speech: 'phrase' },
    { word: 'Good evening', translation: '晚上好', pronunciation: 'ɡʊd ˈiːvnɪŋ', example: 'Good evening, ladies and gentlemen.', example_translation: '女士们先生们，晚上好。', part_of_speech: 'phrase' },
    { word: 'Good night', translation: '晚安', pronunciation: 'ɡʊd naɪt', example: 'Good night, sweet dreams.', example_translation: '晚安，好梦。', part_of_speech: 'phrase' },
    { word: 'How are you?', translation: '你好吗？', pronunciation: 'haʊ ɑːr juː', example: 'Hi Tom! How are you?', example_translation: '嗨汤姆！你好吗？', part_of_speech: 'phrase' },
    { word: 'I\'m fine', translation: '我很好', pronunciation: 'aɪm faɪn', example: 'I\'m fine, thank you.', example_translation: '我很好，谢谢。', part_of_speech: 'phrase' },
    { word: 'I', translation: '我', pronunciation: 'aɪ', example: 'I am a student.', example_translation: '我是一名学生。', part_of_speech: 'pronoun' },
    { word: 'You', translation: '你/你们', pronunciation: 'juː', example: 'You are my friend.', example_translation: '你是我的朋友。', part_of_speech: 'pronoun' },
    { word: 'He', translation: '他', pronunciation: 'hiː', example: 'He is from Japan.', example_translation: '他来自日本。', part_of_speech: 'pronoun' },
    { word: 'She', translation: '她', pronunciation: 'ʃiː', example: 'She is a doctor.', example_translation: '她是一名医生。', part_of_speech: 'pronoun' },
  ];
  words.forEach(w => insertWord(unitId, w));
}

function seedUnit2Words(unitId: number) {
  const words = [
    { word: 'One', translation: '一', pronunciation: 'wʌn', example: 'I have one apple.', example_translation: '我有一个苹果。', part_of_speech: 'number' },
    { word: 'Two', translation: '二', pronunciation: 'tuː', example: 'Two cats are sleeping.', example_translation: '两只猫在睡觉。', part_of_speech: 'number' },
    { word: 'Three', translation: '三', pronunciation: 'θriː', example: 'Three plus two is five.', example_translation: '三加二等于五。', part_of_speech: 'number' },
    { word: 'Four', translation: '四', pronunciation: 'fɔːr', example: 'There are four seasons.', example_translation: '一年有四季。', part_of_speech: 'number' },
    { word: 'Five', translation: '五', pronunciation: 'faɪv', example: 'Give me five minutes.', example_translation: '给我五分钟。', part_of_speech: 'number' },
    { word: 'Time', translation: '时间', pronunciation: 'taɪm', example: 'What time is it?', example_translation: '现在几点了？', part_of_speech: 'noun' },
    { word: 'Today', translation: '今天', pronunciation: 'təˈdeɪ', example: 'Today is Monday.', example_translation: '今天是星期一。', part_of_speech: 'adverb' },
    { word: 'Tomorrow', translation: '明天', pronunciation: 'təˈmɔːroʊ', example: 'See you tomorrow.', example_translation: '明天见。', part_of_speech: 'adverb' },
    { word: 'Yesterday', translation: '昨天', pronunciation: 'ˈjestərdeɪ', example: 'Yesterday was Sunday.', example_translation: '昨天是星期日。', part_of_speech: 'adverb' },
    { word: 'Clock', translation: '时钟', pronunciation: 'klɑːk', example: 'The clock says 3 o\'clock.', example_translation: '时钟显示三点。', part_of_speech: 'noun' },
  ];
  words.forEach(w => insertWord(unitId, w));
}

function seedRestaurantWords(unitId: number) {
  const words = [
    { word: 'Menu', translation: '菜单', pronunciation: 'ˈmenjuː', example: 'Can I see the menu?', example_translation: '我可以看一下菜单吗？', part_of_speech: 'noun' },
    { word: 'Order', translation: '点餐', pronunciation: 'ˈɔːrdər', example: 'Are you ready to order?', example_translation: '您准备好点餐了吗？', part_of_speech: 'verb' },
    { word: 'Water', translation: '水', pronunciation: 'ˈwɔːtər', example: 'A glass of water, please.', example_translation: '请给我一杯水。', part_of_speech: 'noun' },
    { word: 'Food', translation: '食物', pronunciation: 'fuːd', example: 'The food is delicious.', example_translation: '食物很美味。', part_of_speech: 'noun' },
    { word: 'Bill', translation: '账单', pronunciation: 'bɪl', example: 'The bill, please.', example_translation: '请结账。', part_of_speech: 'noun' },
    { word: 'Waiter', translation: '服务员', pronunciation: 'ˈweɪtər', example: 'Waiter, could you help me?', example_translation: '服务员，能帮我一下吗？', part_of_speech: 'noun' },
    { word: 'Restaurant', translation: '餐厅', pronunciation: 'ˈrestrɑːnt', example: 'This is a great restaurant.', example_translation: '这是一家很棒的餐厅。', part_of_speech: 'noun' },
    { word: 'Breakfast', translation: '早餐', pronunciation: 'ˈbrekfəst', example: 'Breakfast is ready.', example_translation: '早餐准备好了。', part_of_speech: 'noun' },
    { word: 'Lunch', translation: '午餐', pronunciation: 'lʌntʃ', example: 'Let\'s have lunch together.', example_translation: '我们一起吃午餐吧。', part_of_speech: 'noun' },
    { word: 'Dinner', translation: '晚餐', pronunciation: 'ˈdɪnər', example: 'Dinner is at 7pm.', example_translation: '晚餐在晚上7点。', part_of_speech: 'noun' },
  ];
  words.forEach(w => insertWord(unitId, w));
}

function seedUnit1Grammar(unitId: number) {
  const exercises = [
    {
      grammar_rule: 'Be动词 (am/is/are)',
      explanation: 'I 用 am，you/we/they 用 are，he/she/it 用 is',
      question: 'She ___ a teacher.',
      options: JSON.stringify(['am', 'is', 'are', 'be']),
      correct_answer: 1,
      difficulty: 1,
    },
    {
      grammar_rule: 'Be动词 (am/is/are)',
      explanation: 'I 用 am，you/we/they 用 are，he/she/it 用 is',
      question: 'I ___ from China.',
      options: JSON.stringify(['am', 'is', 'are', 'be']),
      correct_answer: 0,
      difficulty: 1,
    },
    {
      grammar_rule: 'Be动词 (am/is/are)',
      explanation: 'I 用 am，you/we/they 用 are，he/she/it 用 is',
      question: 'They ___ my friends.',
      options: JSON.stringify(['am', 'is', 'are', 'be']),
      correct_answer: 2,
      difficulty: 1,
    },
    {
      grammar_rule: '人称代词主格',
      explanation: 'I (我), you (你/你们), he (他), she (她), it (它), we (我们), they (他们)',
      question: '___ is my mother.',
      options: JSON.stringify(['He', 'She', 'It', 'They']),
      correct_answer: 1,
      difficulty: 1,
    },
    {
      grammar_rule: '一般疑问句',
      explanation: '含有be动词的句子变疑问句，将be动词提前',
      question: '___ you a student?',
      options: JSON.stringify(['Am', 'Is', 'Are', 'Do']),
      correct_answer: 2,
      difficulty: 1,
    },
  ];

  exercises.forEach(e => {
    const existing = db.prepare('SELECT id FROM grammar_exercises WHERE unit_id = ? AND question = ?').get(unitId, e.question) as any;
    if (!existing) {
      db.prepare(
        'INSERT INTO grammar_exercises (unit_id, grammar_rule, explanation, question, options, correct_answer, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(unitId, e.grammar_rule, e.explanation, e.question, e.options, e.correct_answer, e.difficulty);
    }
  });
}

function seedUnit1Listening(unitId: number) {
  const exercises = [
    {
      script: 'Hello! My name is Tom. Nice to meet you.',
      translation: '你好！我的名字是汤姆。很高兴认识你。',
      question: 'What is the speaker\'s name?',
      options: JSON.stringify(['Tim', 'Tom', 'Tony', 'John']),
      correct_answer: 1,
      difficulty: 1,
    },
    {
      script: 'Good morning! How are you today?',
      translation: '早上好！你今天好吗？',
      question: 'When is this conversation happening?',
      options: JSON.stringify(['Morning', 'Afternoon', 'Evening', 'Night']),
      correct_answer: 0,
      difficulty: 1,
    },
    {
      script: 'Thank you very much for your help. Goodbye!',
      translation: '非常感谢你的帮助。再见！',
      question: 'What does the speaker say at the end?',
      options: JSON.stringify(['Hello', 'Thank you', 'Goodbye', 'Sorry']),
      correct_answer: 2,
      difficulty: 1,
    },
  ];

  exercises.forEach(e => {
    const existing = db.prepare('SELECT id FROM listening_exercises WHERE unit_id = ? AND script = ?').get(unitId, e.script) as any;
    if (!existing) {
      db.prepare(
        'INSERT INTO listening_exercises (unit_id, script, translation, question, options, correct_answer, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).run(unitId, e.script, e.translation, e.question, e.options, e.correct_answer, e.difficulty);
    }
  });
}

function seedUnit1Speaking(unitId: number) {
  const phrases = [
    { phrase: 'Hello, how are you?', translation: '你好，你好吗？', pronunciation_hint: 'həˈloʊ, haʊ ɑːr juː?', difficulty: 1 },
    { phrase: 'My name is Sarah.', translation: '我的名字是莎拉。', pronunciation_hint: 'maɪ neɪm ɪz ˈserə.', difficulty: 1 },
    { phrase: 'Nice to meet you.', translation: '很高兴认识你。', pronunciation_hint: 'naɪs tuː miːt juː.', difficulty: 1 },
    { phrase: 'Thank you very much.', translation: '非常感谢你。', pronunciation_hint: 'θæŋk juː ˈveri mʌtʃ.', difficulty: 1 },
    { phrase: 'Goodbye, see you later!', translation: '再见，回头见！', pronunciation_hint: 'ɡʊdˈbaɪ, siː juː ˈleɪtər!', difficulty: 1 },
    { phrase: 'I\'m sorry, I don\'t understand.', translation: '对不起，我不明白。', pronunciation_hint: 'aɪm ˈsɑːri, aɪ doʊnt ˌʌndərˈstænd.', difficulty: 1 },
    { phrase: 'Could you repeat that, please?', translation: '请你重复一遍好吗？', pronunciation_hint: 'kʊd juː rɪˈpiːt ðæt, pliːz?', difficulty: 1 },
    { phrase: 'Good morning, everyone!', translation: '大家早上好！', pronunciation_hint: 'ɡʊd ˈmɔːrnɪŋ, ˈevriwʌn!', difficulty: 1 },
  ];

  phrases.forEach(p => {
    const existing = db.prepare('SELECT id FROM speaking_exercises WHERE unit_id = ? AND phrase = ?').get(unitId, p.phrase) as any;
    if (!existing) {
      db.prepare(
        'INSERT INTO speaking_exercises (unit_id, phrase, translation, pronunciation_hint, audio_url, difficulty) VALUES (?, ?, ?, ?, ?, ?)'
      ).run(unitId, p.phrase, p.translation, p.pronunciation_hint, '', p.difficulty);
    }
  });
}
