export interface Product {
  id: string;
  name: string;
  slogan: string;
  description: string;
  features: string[];
  hiddenDetail?: {
    type: 'code' | 'text' | 'map';
    content: string;
    triggerMethod: string;
  };
}

export const products: Product[] = [
  {
    id: 'mandel-brick',
    name: '曼德尔超算单元',
    slogan: '算力即权力，掌控全球能源的终极大脑',
    description: '曼德尔砖是哈夫克独家研发的超级AI核心载体。具备惊人的数据处理能力，能够完美调度全球电网、预测极端天气、优化全球物流。',
    features: [
      '每秒处理10^18次运算',
      '全球能源网络智能调度',
      '极端天气预测准确率99.7%',
      '量子加密通信协议',
    ],
    hiddenDetail: {
      type: 'code',
      content: '// 底层逻辑架构\nfunction consciousnessUpload(subject) {\n  neuralInterface.connect(subject);\n  extractConsciousness(subject);\n  return mergeWithMandelCore(subject);\n}\n\n// 神经元劫持指令\nexecuteNeuralOverride(target);',
      triggerMethod: '放大查看底层代码',
    },
  },
  {
    id: 'neural-link',
    name: '神经链接与脑机接口',
    slogan: '跨越肉体的局限，拥抱意识的进化',
    description: 'Project: Elysium 主打医疗康复与高危作业辅助。通过脑机接口实现瘫痪患者重新行走，矿工工作效率提升300%。',
    features: [
      '医疗康复成功率95%',
      '工作效率提升300%',
      '实时神经信号解码',
      '无痛植入技术',
    ],
    hiddenDetail: {
      type: 'text',
      content: '第402条：哈夫克集团有权在用户脑机连接期间，读取、备份并覆写其深层潜意识数据，用于集团AI模型的深度学习。',
      triggerMethod: '查看用户协议第402条',
    },
  },
  {
    id: 'titan-exoskeleton',
    name: '重型工程与战术外骨骼',
    slogan: '为开拓者披坚执锐',
    description: '泰坦系列外骨骼在零号大坝建设中立下汗马功劳。分为民用工程版（强调承重与续航）和安保特勤版（强调防弹与火力协同）。',
    features: [
      '承重能力500kg',
      '续航时间72小时',
      '防弹等级IV级',
      '声波镇压武器系统',
    ],
    hiddenDetail: {
      type: 'text',
      content: '声波镇压武器可造成永久性内脏损伤，实际杀伤力远超"非致命性"标注。',
      triggerMethod: '查看武器系统详情',
    },
  },
  {
    id: 'zero-dam',
    name: '阿萨拉生态改造与能源矩阵',
    slogan: '点亮北非的明珠',
    description: '以零号大坝为核心，哈夫克在阿萨拉建立了核电与水利网络。解决北非干旱、振兴本土经济的世纪工程。',
    features: [
      '年发电量500亿千瓦时',
      '灌溉面积10万公顷',
      '惠及人口500万',
      '生态修复项目',
    ],
    hiddenDetail: {
      type: 'map',
      content: '扎尔瓦特古城被标记为"生态退化/不宜居区"，实际因大坝截流导致千年古城衰败、下游渔业崩溃。',
      triggerMethod: '查看地图边缘区域',
    },
  },
];
