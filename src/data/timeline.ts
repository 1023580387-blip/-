export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  isPositive: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: 1993,
    title: '摩加迪沙之战',
    description: '年幼的雅各布·哈夫克在战乱中被美军三角洲特种兵救出，立志用科技消除混乱。',
    isPositive: true,
  },
  {
    year: 2007,
    title: '哈夫克集团成立',
    description: 'ERI组织转型为全球顶尖的AI与资源垄断财团，正式更名为Havoc Corporation。',
    isPositive: true,
  },
  {
    year: 2011,
    title: '零号大坝启动',
    description: '哈夫克与阿萨拉王室签订合作协议，启动"解决北非干旱、振兴本土经济"的世纪工程。',
    isPositive: true,
  },
  {
    year: 2015,
    title: '曼德尔砖原型机问世',
    description: '超级AI核心载体研发成功，具备调度全球能源网络的能力。',
    isPositive: true,
  },
  {
    year: 2020,
    title: 'Project: Elysium 启动',
    description: '脑机接口项目进入临床试验阶段，医疗康复成功率达95%。',
    isPositive: true,
  },
  {
    year: 2024,
    title: '钻石皇后酒店事件',
    description: '阿萨拉卫队领袖雷斯夺取曼德尔砖样机，引发全面战乱。哈夫克称之为"恐怖袭击"。',
    isPositive: false,
  },
  {
    year: 2035,
    title: '焰火计划',
    description: '天网卫星系统遭恐怖分子破坏，哈夫克呼吁全球支持维和行动。',
    isPositive: false,
  },
];
