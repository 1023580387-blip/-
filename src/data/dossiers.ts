export interface Dossier {
  id: string;
  title: string;
  accessLevel: 'public' | 'restricted' | 'classified';
  content: string;
  requiresKey: boolean;
}

export const dossiers: Dossier[] = [
  {
    id: 'casualty-report',
    title: '人员事故伤亡调查',
    accessLevel: 'classified',
    requiresKey: true,
    content: `[机密等级：最高]\n\n脑机接口人体实验失败案例记录：\n\n案例 #001：受试者阿萨拉原住民，编号A-0237\n状态：死亡\n官方死因：矿区塌方\n真实死因：神经元过载导致脑死亡\n\n案例 #002：受试者阿萨拉原住民，编号A-0238\n状态：植物人\n官方死因：感染本土传染病\n真实死因：意识上传失败，人格解体\n\n案例 #003-#147：[数据已删除]\n\n备注：所有失败案例统一标记为"耗材"，家属补偿金从"社区发展基金"中支出。`,
  },
  {
    id: 'site-selection',
    title: '哈夫克分部选址报告（员工日记）',
    accessLevel: 'restricted',
    requiresKey: true,
    content: `[个人日记 - 勘探员 陈伟]\n\n2010年3月15日\n他们骗了当地人。这里的稀土储量足以制造十万台战争机器，但地下水位一旦破坏，下游的扎尔瓦特城将在十年内变成死城。\n\n我不敢把这部分写进最终报告，主管看我的眼神像在看一具尸体。\n\n2010年4月2日\n报告提交了。我删掉了关于地下水的部分。\n\n2010年5月10日\n扎尔瓦特的长老们来抗议，被安保部门"请"走了。我再也没见过他们。\n\n[日记结束]`,
  },
  {
    id: 'rome-base',
    title: '新科研基地实拍图（罗马大战场线索）',
    accessLevel: 'classified',
    requiresKey: true,
    content: `[卫星实拍图分析]\n\n坐标：41.9028° N, 12.4964° E\n地点：意大利罗马郊区\n\nAI解析结果：\n- 地形与《三角洲行动》S10赛季新地图"罗马"高度重合\n- 发现地下设施入口（伪装为古建筑遗址）\n- 检测到高强度电磁信号（疑似曼德尔砖测试）\n\n结论：哈夫克势力已渗透至欧洲腹地，罗马基地可能为S10赛季核心战场。`,
  },
  {
    id: 'bci-draft',
    title: '脑机原型文件草稿 (Project_BCI_Draft_v0.9)',
    accessLevel: 'classified',
    requiresKey: true,
    content: `[文件损坏 - 无法直接打开]\n\n泄露哈希值：\na3f5b8c9d2e4f6a7b8c9d0e1f2a3b4c5\n\n解密提示：\n此哈希值为解开游戏内其他隐藏彩蛋的核心线索。\n\n可能解锁内容：\n- 特定保险箱密码\n- 隐藏撤离点坐标\n- S10赛季专属武器皮肤\n\n[文件已加密 - 需要密钥访问]`,
  },
];
