import type {
  Word, GrammarQuestion, SpeakingLesson, ListeningLesson,
  Course, Lesson, Achievement, Post, User, DailyStudyRecord, LeaderboardUser, LearningPath
} from '../types';

export const mockWords: Word[] = [
  // 英语 初级
  { id: 'w-en-1', word: 'Apple', translation: '苹果', pronunciation: '/ˈæpl/', example: 'I eat an apple every day.', exampleTranslation: '我每天吃一个苹果。', level: 'beginner', language: 'en', category: '食物' },
  { id: 'w-en-2', word: 'Book', translation: '书', pronunciation: '/bʊk/', example: 'She is reading a book.', exampleTranslation: '她正在读书。', level: 'beginner', language: 'en', category: '物品' },
  { id: 'w-en-3', word: 'Water', translation: '水', pronunciation: '/ˈwɔːtər/', example: 'Please give me some water.', exampleTranslation: '请给我一些水。', level: 'beginner', language: 'en', category: '饮品' },
  { id: 'w-en-4', word: 'House', translation: '房子', pronunciation: '/haʊs/', example: 'Their house is very big.', exampleTranslation: '他们的房子很大。', level: 'beginner', language: 'en', category: '建筑' },
  { id: 'w-en-5', word: 'Friend', translation: '朋友', pronunciation: '/frend/', example: 'He is my best friend.', exampleTranslation: '他是我最好的朋友。', level: 'beginner', language: 'en', category: '人物' },
  { id: 'w-en-6', word: 'Beautiful', translation: '美丽的', pronunciation: '/ˈbjuːtɪfl/', example: 'The garden is beautiful.', exampleTranslation: '花园很美。', level: 'beginner', language: 'en', category: '形容词' },
  { id: 'w-en-7', word: 'Happy', translation: '快乐的', pronunciation: '/ˈhæpi/', example: 'I am very happy today.', exampleTranslation: '我今天很开心。', level: 'beginner', language: 'en', category: '情绪' },
  { id: 'w-en-8', word: 'Travel', translation: '旅行', pronunciation: '/ˈtrævl/', example: 'I love to travel.', exampleTranslation: '我喜欢旅行。', level: 'beginner', language: 'en', category: '活动' },
  // 英语 中级
  { id: 'w-en-9', word: 'Sophisticated', translation: '复杂的；精密的', pronunciation: '/səˈfɪstɪkeɪtɪd/', example: 'This is a sophisticated machine.', exampleTranslation: '这是一台精密的机器。', level: 'intermediate', language: 'en', category: '形容词' },
  { id: 'w-en-10', word: 'Nevertheless', translation: '然而；尽管如此', pronunciation: '/ˌnevəðəˈles/', example: 'It was raining; nevertheless, we went out.', exampleTranslation: '天在下雨，尽管如此我们还是出去了。', level: 'intermediate', language: 'en', category: '副词' },
  { id: 'w-en-11', word: 'Comprehensive', translation: '全面的；综合的', pronunciation: '/ˌkɒmprɪˈhensɪv/', example: 'We need a comprehensive plan.', exampleTranslation: '我们需要一个全面的计划。', level: 'intermediate', language: 'en', category: '形容词' },
  { id: 'w-en-12', word: 'Ambiguous', translation: '模棱两可的', pronunciation: '/æmˈbɪɡjuəs/', example: 'His answer was ambiguous.', exampleTranslation: '他的回答模棱两可。', level: 'intermediate', language: 'en', category: '形容词' },
  // 日语 初级
  { id: 'w-ja-1', word: 'こんにちは', translation: '你好', pronunciation: 'Konnichiwa', example: 'こんにちは、元気ですか？', exampleTranslation: '你好，你好吗？', level: 'beginner', language: 'ja', category: '问候' },
  { id: 'w-ja-2', word: 'ありがとう', translation: '谢谢', pronunciation: 'Arigatou', example: 'ありがとうございます！', exampleTranslation: '非常感谢！', level: 'beginner', language: 'ja', category: '问候' },
  { id: 'w-ja-3', word: 'ねこ', translation: '猫', pronunciation: 'Neko', example: 'ねこがかわいいです。', exampleTranslation: '猫很可爱。', level: 'beginner', language: 'ja', category: '动物' },
  { id: 'w-ja-4', word: 'さくら', translation: '樱花', pronunciation: 'Sakura', example: 'さくらがきれいです。', exampleTranslation: '樱花很美。', level: 'beginner', language: 'ja', category: '植物' },
  { id: 'w-ja-5', word: 'みず', translation: '水', pronunciation: 'Mizu', example: 'みずをください。', exampleTranslation: '请给我水。', level: 'beginner', language: 'ja', category: '饮品' },
  { id: 'w-ja-6', word: 'がっこう', translation: '学校', pronunciation: 'Gakkou', example: 'がっこうへいきます。', exampleTranslation: '我去学校。', level: 'beginner', language: 'ja', category: '地点' },
  { id: 'w-ja-7', word: 'たべる', translation: '吃', pronunciation: 'Taberu', example: 'ごはんをたべます。', exampleTranslation: '我吃饭。', level: 'beginner', language: 'ja', category: '动词' },
  { id: 'w-ja-8', word: 'やすい', translation: '便宜的', pronunciation: 'Yasui', example: 'このりんごはやすいです。', exampleTranslation: '这个苹果很便宜。', level: 'beginner', language: 'ja', category: '形容词' },
  // 韩语 初级
  { id: 'w-ko-1', word: '안녕하세요', translation: '你好', pronunciation: 'Annyeonghaseyo', example: '안녕하세요, 만나서 반갑습니다.', exampleTranslation: '你好，很高兴见到你。', level: 'beginner', language: 'ko', category: '问候' },
  { id: 'w-ko-2', word: '감사합니다', translation: '谢谢', pronunciation: 'Gamsahamnida', example: '도와주셔서 감사합니다.', exampleTranslation: '感谢您的帮助。', level: 'beginner', language: 'ko', category: '问候' },
  { id: 'w-ko-3', word: '사랑', translation: '爱', pronunciation: 'Sarang', example: '사랑해요.', exampleTranslation: '我爱你。', level: 'beginner', language: 'ko', category: '情感' },
  { id: 'w-ko-4', word: '음식', translation: '食物', pronunciation: 'Eumsik', example: '한국 음식을 좋아해요.', exampleTranslation: '我喜欢韩国食物。', level: 'beginner', language: 'ko', category: '食物' },
  { id: 'w-ko-5', word: '친구', translation: '朋友', pronunciation: 'Chingu', example: '그는 제 친구예요.', exampleTranslation: '他是我的朋友。', level: 'beginner', language: 'ko', category: '人物' },
  { id: 'w-ko-6', word: '예쁘다', translation: '漂亮的', pronunciation: 'Yeppeuda', example: '꽃이 예뻐요.', exampleTranslation: '花很漂亮。', level: 'beginner', language: 'ko', category: '形容词' },
  { id: 'w-ko-7', word: '공부', translation: '学习', pronunciation: 'Gongbu', example: '매일 공부해요.', exampleTranslation: '我每天学习。', level: 'beginner', language: 'ko', category: '活动' },
  { id: 'w-ko-8', word: '물', translation: '水', pronunciation: 'Mul', example: '물 좀 주세요.', exampleTranslation: '请给我点水。', level: 'beginner', language: 'ko', category: '饮品' },
];

export const mockGrammarQuestions: GrammarQuestion[] = [
  // 英语 初级
  { id: 'g-en-1', type: 'choice', question: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'went'], answer: 'goes', explanation: '第三人称单数现在时，动词需要加 s/es。', level: 'beginner', language: 'en', grammarPoint: '一般现在时' },
  { id: 'g-en-2', type: 'choice', question: 'There ___ many books on the desk.', options: ['is', 'are', 'be', 'have'], answer: 'are', explanation: 'books 是复数，所以用 are。', level: 'beginner', language: 'en', grammarPoint: 'There be 句型' },
  { id: 'g-en-3', type: 'choice', question: 'I ___ my homework yesterday.', options: ['do', 'does', 'did', 'doing'], answer: 'did', explanation: 'yesterday 表示过去时，用 did。', level: 'beginner', language: 'en', grammarPoint: '一般过去时' },
  { id: 'g-en-4', type: 'fill', question: '___ you like some coffee? (请/想要)', answer: 'Would', explanation: '"Would you like..." 是礼貌询问的常用句型。', level: 'beginner', language: 'en', grammarPoint: '礼貌询问' },
  { id: 'g-en-5', type: 'fill', question: 'This is ___ interesting book. (冠词)', answer: 'an', explanation: 'interesting 以元音开头，用 an。', level: 'beginner', language: 'en', grammarPoint: '冠词用法' },
  // 英语 中级
  { id: 'g-en-6', type: 'choice', question: 'If I ___ you, I would study harder.', options: ['am', 'was', 'were', 'be'], answer: 'were', explanation: '虚拟语气中，be 动词一律用 were。', level: 'intermediate', language: 'en', grammarPoint: '虚拟语气' },
  { id: 'g-en-7', type: 'choice', question: 'The book ___ by millions of people.', options: ['read', 'reads', 'is read', 'reading'], answer: 'is read', explanation: '被动语态：be + 过去分词。', level: 'intermediate', language: 'en', grammarPoint: '被动语态' },
  { id: 'g-en-8', type: 'fill', question: 'She suggested that he ___ a doctor. (see)', answer: 'see', explanation: 'suggest 后的宾语从句用虚拟语气：should + 动词原形，should 可省略。', level: 'intermediate', language: 'en', grammarPoint: '虚拟语气' },
  // 日语 初级
  { id: 'g-ja-1', type: 'choice', question: 'わたし___がくせいです。', options: ['は', 'が', 'を', 'に'], answer: 'は', explanation: '"は" 是提示主题的助词。', level: 'beginner', language: 'ja', grammarPoint: '助词は' },
  { id: 'g-ja-2', type: 'choice', question: 'ごはんを___。', options: ['たべる', 'たべます', 'たべて', 'たべた'], answer: 'たべます', explanation: '礼貌体（ます形）是日常会话常用形式。', level: 'beginner', language: 'ja', grammarPoint: 'ます形' },
  { id: 'g-ja-3', type: 'fill', question: 'きのうは___でした。(雨)', answer: 'あめ', explanation: 'きのう（昨天）用过去式，名词+でした。', level: 'beginner', language: 'ja', grammarPoint: '过去式' },
  // 韩语 初级
  { id: 'g-ko-1', type: 'choice', question: '저 ___ 학생입니다.', options: ['은', '는', '이', '가'], answer: '는', explanation: '저（我）是开音节，后接 는 表示主题。', level: 'beginner', language: 'ko', grammarPoint: '主题助词' },
  { id: 'g-ko-2', type: 'choice', question: '사과를 ___요.', options: ['먹', '먹어', '먹는', '먹었'], answer: '먹어', explanation: '먹다 + 어요 → 먹어요（敬语现在时）。', level: 'beginner', language: 'ko', grammarPoint: '敬语现在时' },
  { id: 'g-ko-3', type: 'fill', question: '오늘 날씨가 ___요. (好)', answer: '좋아', explanation: '좋다 + 아요 → 좋아요（形容词敬语）。', level: 'beginner', language: 'ko', grammarPoint: '形容词变化' },
];

export const mockSpeakingLessons: SpeakingLesson[] = [
  {
    id: 's-en-1',
    title: '自我介绍',
    level: 'beginner',
    language: 'en',
    topic: '日常交流',
    sentences: [
      { original: 'Hello, my name is Tom.', translation: '你好，我叫汤姆。', pronunciation: '/həˈloʊ, maɪ neɪm ɪz tɒm/' },
      { original: 'Nice to meet you!', translation: '很高兴认识你！', pronunciation: '/naɪs tu miːt juː/' },
      { original: 'I am from China.', translation: '我来自中国。', pronunciation: '/aɪ æm frɒm ˈtʃaɪnə/' },
      { original: 'I am 25 years old.', translation: '我25岁。', pronunciation: '/aɪ æm ˈtwentiː faɪv jɪəz əʊld/' },
      { original: 'I like learning English.', translation: '我喜欢学英语。', pronunciation: '/aɪ laɪk ˈlɜːrnɪŋ ˈɪŋɡlɪʃ/' },
    ]
  },
  {
    id: 's-ja-1',
    title: '日常问候',
    level: 'beginner',
    language: 'ja',
    topic: '问候',
    sentences: [
      { original: 'おはようございます。', translation: '早上好。', pronunciation: 'Ohayou gozaimasu.' },
      { original: 'こんにちは。', translation: '你好。', pronunciation: 'Konnichiwa.' },
      { original: 'こんばんは。', translation: '晚上好。', pronunciation: 'Konbanwa.' },
      { original: 'お元気ですか？', translation: '你好吗？', pronunciation: 'Ogenki desuka?' },
      { original: 'はい、元気です。', translation: '是的，我很好。', pronunciation: 'Hai, genki desu.' },
    ]
  },
  {
    id: 's-ko-1',
    title: '初次见面',
    level: 'beginner',
    language: 'ko',
    topic: '问候',
    sentences: [
      { original: '안녕하세요.', translation: '你好。', pronunciation: 'Annyeonghaseyo.' },
      { original: '만나서 반갑습니다.', translation: '很高兴见到你。', pronunciation: 'Mannaseo bangapseumnida.' },
      { original: '저는 민수입니다.', translation: '我是民秀。', pronunciation: 'Jeoneun Minsuimnida.' },
      { original: '한국에서 왔어요.', translation: '我来自韩国。', pronunciation: 'Hangugeseo wasseoyo.' },
      { original: '잘 부탁드립니다.', translation: '请多多关照。', pronunciation: 'Jal butakdeurimnida.' },
    ]
  },
];

export const mockListeningLessons: ListeningLesson[] = [
  {
    id: 'l-en-1',
    title: '咖啡馆点单',
    level: 'beginner',
    language: 'en',
    topic: '生活场景',
    audioText: 'A: Hello, welcome to Coffee Shop. What can I get you?\nB: Hi, can I have a latte, please?\nA: Sure, would you like hot or iced?\nB: Hot, please. And a blueberry muffin too.\nA: Anything else?\nB: No, that\'s all. Thank you!\nA: That will be six dollars.',
    questions: [
      { question: 'What does the customer order?', options: ['Coffee and cake', 'Latte and muffin', 'Tea and cookies', 'Juice and bread'], answer: 1 },
      { question: 'How does the customer want the drink?', options: ['Iced', 'Hot', 'Warm', 'Cold'], answer: 1 },
      { question: 'How much is the order?', options: ['$5', '$6', '$7', '$8'], answer: 1 },
    ]
  },
  {
    id: 'l-ja-1',
    title: '买东西',
    level: 'beginner',
    language: 'ja',
    topic: '生活场景',
    audioText: 'A: いらっしゃいませ。\nB: すみません、このりんごはいくらですか？\nA: これは一つ二百円です。\nB: 三つください。\nA: はい、三つです。六百円になります。\nB: はい、どうぞ。\nA: ありがとうございます。またお越しくださいませ。',
    questions: [
      { question: '何を買いますか？', options: ['ばなな', 'りんご', 'みかん', 'ぶどう'], answer: 1 },
      { question: '一ついくらですか？', options: ['100円', '200円', '300円', '400円'], answer: 1 },
      { question: '合計いくらですか？', options: ['400円', '500円', '600円', '700円'], answer: 2 },
    ]
  },
  {
    id: 'l-ko-1',
    title: '点餐',
    level: 'beginner',
    language: 'ko',
    topic: '生活场景',
    audioText: 'A: 안녕하세요. 뭐 드릴까요?\nB: 불고기 하나 주세요.\nA: 네, 불고기. 뭐 더 드릴까요?\nB: 김치찌개도 하나 주세요.\nA: 음료는 뭐로 드릴까요?\nB: 물 두 잔 주세요.\nA: 네, 알겠습니다. 잠시만 기다려 주세요.',
    questions: [
      { question: '무엇을 시켰습니까?', options: ['불고기와 김치찌개', '비빔밥과 국', '라면과 밥', '초밥과 생선'], answer: 0 },
      { question: '음료는 무엇을 시켰습니까?', options: ['커피', '주스', '물', '차'], answer: 2 },
      { question: '물은 몇 잔 시켰습니까?', options: ['한 잔', '두 잔', '세 잔', '네 잔'], answer: 1 },
    ]
  },
];

export const mockCourses: Course[] = [
  {
    id: 'c-en-beginner',
    title: '英语零基础入门',
    description: '从零开始学习英语基础，掌握日常交流必备词汇和语法，建立坚实的语言基础。',
    language: 'en',
    level: 'beginner',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=English%20language%20learning%20beginner%20course%20cover%20colorful%20ABC%20letters%20books%20friendly%20style&image_size=landscape_16_9',
    category: '综合',
    totalLessons: 5,
    rating: 4.9,
    students: 12580,
    lessons: [
      { id: 'l-en-b-1', title: '基础问候与自我介绍', description: '学习常用问候语和基本自我介绍', type: 'vocabulary', level: 'beginner', language: 'en', duration: 20, wordIds: ['w-en-1', 'w-en-5', 'w-en-7'], order: 1 },
      { id: 'l-en-b-2', title: '常见物品与数字', description: '学习日常生活中常见物品和数字表达', type: 'vocabulary', level: 'beginner', language: 'en', duration: 25, wordIds: ['w-en-2', 'w-en-3', 'w-en-4'], order: 2 },
      { id: 'l-en-b-3', title: '一般现在时语法精讲', description: '掌握一般现在时的用法和动词变化', type: 'grammar', level: 'beginner', language: 'en', duration: 30, grammarIds: ['g-en-1', 'g-en-2', 'g-en-5'], order: 3 },
      { id: 'l-en-b-4', title: '口语：自我介绍练习', description: '跟读练习自我介绍，纠正发音', type: 'speaking', level: 'beginner', language: 'en', duration: 25, speakingId: 's-en-1', order: 4 },
      { id: 'l-en-b-5', title: '听力：咖啡馆场景', description: '生活场景听力训练，提升听力理解', type: 'listening', level: 'beginner', language: 'en', duration: 30, listeningId: 'l-en-1', order: 5 },
    ]
  },
  {
    id: 'c-en-intermediate',
    title: '英语进阶提升课程',
    description: '针对有一定基础的学习者，深入学习复杂语法和高级词汇，提升阅读和写作能力。',
    language: 'en',
    level: 'intermediate',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Intermediate%20English%20language%20learning%20course%20cover%20library%20books%20knowledge%20professional%20style&image_size=landscape_16_9',
    category: '综合',
    totalLessons: 4,
    rating: 4.8,
    students: 8920,
    lessons: [
      { id: 'l-en-i-1', title: '高级词汇：形容词与副词', description: '学习常用高级形容词和副词', type: 'vocabulary', level: 'intermediate', language: 'en', duration: 35, wordIds: ['w-en-9', 'w-en-10', 'w-en-11', 'w-en-12'], order: 1 },
      { id: 'l-en-i-2', title: '虚拟语气专题', description: '深入理解虚拟语气的各种用法', type: 'grammar', level: 'intermediate', language: 'en', duration: 40, grammarIds: ['g-en-6', 'g-en-8'], order: 2 },
      { id: 'l-en-i-3', title: '被动语态详解', description: '掌握被动语态的构成和使用场景', type: 'grammar', level: 'intermediate', language: 'en', duration: 35, grammarIds: ['g-en-7'], order: 3 },
      { id: 'l-en-i-4', title: '过去时态综合练习', description: '一般过去时、过去进行时、完成时复习', type: 'grammar', level: 'intermediate', language: 'en', duration: 40, order: 4 },
    ]
  },
  {
    id: 'c-ja-beginner',
    title: '日语五十音与基础入门',
    description: '从五十音图开始，系统学习日语基础发音和常用表达，轻松入门日本语。',
    language: 'ja',
    level: 'beginner',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Japanese%20language%20learning%20beginner%20course%20cover%20hiragana%20katakana%20sakura%20cherry%20blossom%20japanese%20style&image_size=landscape_16_9',
    category: '综合',
    totalLessons: 5,
    rating: 4.9,
    students: 9870,
    lessons: [
      { id: 'l-ja-b-1', title: '五十音图：あ行-さ行', description: '学习平假名和片假名基础发音', type: 'vocabulary', level: 'beginner', language: 'ja', duration: 30, order: 1 },
      { id: 'l-ja-b-2', title: '常用问候语', description: '学习日常问候和礼貌用语', type: 'vocabulary', level: 'beginner', language: 'ja', duration: 20, wordIds: ['w-ja-1', 'w-ja-2'], order: 2 },
      { id: 'l-ja-b-3', title: '基础词汇：动物与植物', description: '学习常见动物和植物单词', type: 'vocabulary', level: 'beginner', language: 'ja', duration: 25, wordIds: ['w-ja-3', 'w-ja-4'], order: 3 },
      { id: 'l-ja-b-4', title: '口语：日常问候对话', description: '口语跟读练习日常对话', type: 'speaking', level: 'beginner', language: 'ja', duration: 25, speakingId: 's-ja-1', order: 4 },
      { id: 'l-ja-b-5', title: '听力：购物场景', description: '基础日语听力练习', type: 'listening', level: 'beginner', language: 'ja', duration: 30, listeningId: 'l-ja-1', order: 5 },
    ]
  },
  {
    id: 'c-ko-beginner',
    title: '韩语零基础入门',
    description: '从韩文字母发音开始，循序渐进学习韩语基础，掌握日常对话能力。',
    language: 'ko',
    level: 'beginner',
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Korean%20language%20learning%20beginner%20course%20cover%20hangul%20korean%20traditional%20culture%20colorful%20modern&image_size=landscape_16_9',
    category: '综合',
    totalLessons: 5,
    rating: 4.8,
    students: 7650,
    lessons: [
      { id: 'l-ko-b-1', title: '韩文字母基础', description: '学习韩语字母发音和书写', type: 'vocabulary', level: 'beginner', language: 'ko', duration: 30, order: 1 },
      { id: 'l-ko-b-2', title: '问候与礼貌用语', description: '学习常用问候语和敬语', type: 'vocabulary', level: 'beginner', language: 'ko', duration: 25, wordIds: ['w-ko-1', 'w-ko-2'], order: 2 },
      { id: 'l-ko-b-3', title: '基础词汇：食物与情感', description: '学习食物和情感相关单词', type: 'vocabulary', level: 'beginner', language: 'ko', duration: 25, wordIds: ['w-ko-3', 'w-ko-4'], order: 3 },
      { id: 'l-ko-b-4', title: '口语：初次见面', description: '跟读练习自我介绍', type: 'speaking', level: 'beginner', language: 'ko', duration: 25, speakingId: 's-ko-1', order: 4 },
      { id: 'l-ko-b-5', title: '听力：餐厅点餐', description: '韩语听力场景训练', type: 'listening', level: 'beginner', language: 'ko', duration: 30, listeningId: 'l-ko-1', order: 5 },
    ]
  },
];

export const mockAchievements: Achievement[] = [
  { id: 'a-1', title: '初出茅庐', description: '完成第一节课程', icon: '🌱', requirement: { type: 'lessons', value: 1 }, pointsReward: 50 },
  { id: 'a-2', title: '学习新手', description: '完成10节课程', icon: '📚', requirement: { type: 'lessons', value: 10 }, pointsReward: 200 },
  { id: 'a-3', title: '勤奋学者', description: '完成50节课程', icon: '🎓', requirement: { type: 'lessons', value: 50 }, pointsReward: 500 },
  { id: 'a-4', title: '词汇达人', description: '掌握100个单词', icon: '📝', requirement: { type: 'words', value: 100 }, pointsReward: 300 },
  { id: 'a-5', title: '词汇大师', description: '掌握500个单词', icon: '🏆', requirement: { type: 'words', value: 500 }, pointsReward: 800 },
  { id: 'a-6', title: '连续3天', description: '连续学习3天', icon: '🔥', requirement: { type: 'streak', value: 3 }, pointsReward: 100 },
  { id: 'a-7', title: '连续7天', description: '连续学习7天', icon: '💪', requirement: { type: 'streak', value: 7 }, pointsReward: 300 },
  { id: 'a-8', title: '连续30天', description: '连续学习30天', icon: '🌟', requirement: { type: 'streak', value: 30 }, pointsReward: 1000 },
  { id: 'a-9', title: '积分新星', description: '获得500积分', icon: '⭐', requirement: { type: 'points', value: 500 }, pointsReward: 100 },
  { id: 'a-10', title: '积分达人', description: '获得2000积分', icon: '💎', requirement: { type: 'points', value: 2000 }, pointsReward: 500 },
];

export const mockPosts: Post[] = [
  {
    id: 'p-1',
    userId: 'u-2',
    username: '日语爱好者小明',
    title: '分享我的日语学习方法！N2备考经验',
    content: '大家好！我备考了6个月终于通过了N2考试，分享一下我的学习经验：\n1. 每天坚持背单词，用Anki卡片效果很好\n2. 语法一定要做大量练习题，推荐蓝宝书\n3. 听力每天听NHK新闻，一开始听不懂没关系\n4. 阅读部分要控制时间，多读多练\n\n希望对大家有帮助！有问题可以在评论区问我~',
    language: 'ja',
    tags: ['经验分享', 'N2备考', '学习方法'],
    likes: 156,
    comments: [
      { id: 'c-1', userId: 'u-3', username: '樱花飞舞', content: '太棒了！我也在备考N2，请问你每天学习几个小时？', createdAt: '2024-01-15T10:30:00', likes: 12 },
      { id: 'c-2', userId: 'u-4', username: '学渣一枚', content: '感谢分享！蓝宝书真的很有用', createdAt: '2024-01-15T11:20:00', likes: 8 },
    ],
    createdAt: '2024-01-15T09:00:00',
  },
  {
    id: 'p-2',
    userId: 'u-5',
    username: 'EnglishMaster',
    title: 'How to improve your speaking skills?',
    content: 'Many students ask me how to improve speaking skills. Here are my tips:\n\n1. Practice shadowing every day - repeat after native speakers\n2. Think in English, not translate from your language\n3. Record yourself and compare with natives\n4. Speak with language partners online\n5. Don\'t be afraid to make mistakes!\n\nConsistency is key. Keep practicing!',
    language: 'en',
    tags: ['Speaking', 'Tips', 'Practice'],
    likes: 234,
    comments: [
      { id: 'c-3', userId: 'u-6', username: 'TomLee', content: 'Shadowing really works! I do it every morning.', createdAt: '2024-01-14T15:00:00', likes: 25 },
    ],
    createdAt: '2024-01-14T12:00:00',
  },
  {
    id: 'p-3',
    userId: 'u-7',
    username: '한국어러버',
    title: '한국어 공부 팁을 공유합니다!',
    content: '한국어를 1년 동안 공부했어요. 제가 효과적이었던 방법들을 공유해요:\n\n1. K-POP 가사로 공부하기 - 재미있어요!\n2. 한국 드라마 보면서 자막 연습\n3. 매일 10문장씩 말하기 연습\n4. 언어교환 앱 사용하기\n\n다들 화이팅하세요!',
    language: 'ko',
    tags: ['한국어', '공부팁', '동기부여'],
    likes: 189,
    comments: [],
    createdAt: '2024-01-13T20:00:00',
  },
  {
    id: 'p-4',
    userId: 'u-8',
    username: '努力的小李',
    title: '学英语3个月的心得，零基础也能行！',
    content: '三个月前我还是一个英语零基础的人，现在已经可以进行简单的日常对话了。\n\n我的方法是：\n1. 每天花30分钟在这个平台上学习\n2. 背单词用艾宾浩斯遗忘曲线\n3. 跟读课文模仿发音\n4. 周末看一部英文电影（带字幕）\n\n大家一起加油！坚持就是胜利！',
    language: 'en',
    tags: ['经验分享', '零基础', '坚持'],
    likes: 445,
    comments: [
      { id: 'c-4', userId: 'u-9', username: '小白一枚', content: '太励志了！我也要加油！', createdAt: '2024-01-12T08:15:00', likes: 30 },
      { id: 'c-5', userId: 'u-10', username: '慢慢学', content: '请问你每天背多少单词？', createdAt: '2024-01-12T09:30:00', likes: 5 },
    ],
    createdAt: '2024-01-12T07:00:00',
  },
];

export const mockLeaderboard: LeaderboardUser[] = [
  { id: 'u-100', username: 'LanguageMaster', avatar: '👑', points: 8520, rank: 1 },
  { id: 'u-101', username: '日本語マスター', avatar: '🎌', points: 7200, rank: 2 },
  { id: 'u-102', username: 'EnglishPro', avatar: '🇬🇧', points: 6890, rank: 3 },
  { id: 'u-103', username: '한국어왕', avatar: '🇰🇷', points: 5670, rank: 4 },
  { id: 'u-104', username: '努力学习者', avatar: '💪', points: 5200, rank: 5 },
  { id: 'u-105', username: 'Polyglot', avatar: '🌍', points: 4890, rank: 6 },
  { id: 'u-106', username: '单词达人', avatar: '📚', points: 4500, rank: 7 },
  { id: 'u-107', username: '每天进步', avatar: '🌟', points: 4200, rank: 8 },
  { id: 'u-108', username: '旅行达人', avatar: '✈️', points: 3980, rank: 9 },
  { id: 'u-109', username: '坚持到底', avatar: '🎯', points: 3750, rank: 10 },
];

export const mockLearningPaths: LearningPath[] = [
  {
    id: 'lp-en-travel',
    name: '30天英语旅行速成',
    description: '专为计划出国旅行的学习者设计，快速掌握旅行中常用的英语表达。',
    courses: ['c-en-beginner'],
    estimatedDays: 30,
    language: 'en',
    level: 'beginner',
    goal: '旅行',
  },
  {
    id: 'lp-en-business',
    name: '商务英语进阶之路',
    description: '系统学习商务英语，提升职场竞争力，从基础到高级全面覆盖。',
    courses: ['c-en-beginner', 'c-en-intermediate'],
    estimatedDays: 90,
    language: 'en',
    level: 'intermediate',
    goal: '职场',
  },
  {
    id: 'lp-ja-basic',
    name: '日语入门到进阶',
    description: '从零基础开始，循序渐进学习日语，目标达到N3水平。',
    courses: ['c-ja-beginner'],
    estimatedDays: 60,
    language: 'ja',
    level: 'beginner',
    goal: '兴趣',
  },
  {
    id: 'lp-ko-kpop',
    name: 'KPOP粉丝韩语学习',
    description: '通过KPOP歌词和韩国综艺快乐学韩语，轻松入门。',
    courses: ['c-ko-beginner'],
    estimatedDays: 45,
    language: 'ko',
    level: 'beginner',
    goal: '兴趣',
  },
];

export const generateDailyRecords = (userId: string): DailyStudyRecord[] => {
  const records: DailyStudyRecord[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const hasStudy = Math.random() > 0.25;
    if (hasStudy) {
      records.push({
        userId,
        date: dateStr,
        studyMinutes: Math.floor(Math.random() * 60) + 20,
        wordsLearned: Math.floor(Math.random() * 20) + 5,
        lessonsCompleted: Math.floor(Math.random() * 3),
        pointsEarned: Math.floor(Math.random() * 100) + 10,
      });
    }
  }
  return records;
};

export const demoUser: User = {
  id: 'demo-user-1',
  username: 'Lingua学习者',
  email: 'demo@linguaverse.com',
  password: '123456',
  currentLanguage: 'en',
  currentLevel: 'beginner',
  points: 1280,
  streak: 7,
  totalStudyMinutes: 860,
  registeredAt: '2024-01-01',
  lastStudyDate: new Date().toISOString().split('T')[0],
};
