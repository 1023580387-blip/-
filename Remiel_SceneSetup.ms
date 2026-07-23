-- =====================================================
-- 蕾米埃尔·丹 - 3ds Max 角色建模场景初始化脚本
-- ZZZ 3.1 S级角色 | 流明属性 | 天使系少女
-- =====================================================

macroScript Remiel_SceneSetup
    category:"Character Setup"
    tooltip:"Initialize Remiel Dan modeling scene"
(
    -- 清空场景
    resetMaxFile #noPrompt
    units.SystemType = #centimeters
    units.DisplayType = #metric
    
    -- 创建图层结构
    local layerNames = #(
        "REF_Reference",
        "BODY_BaseMesh",
        "CLOTH_Top",
        "CLOTH_Skirt",
        "ACC_Wings",
        "ACC_Ribbons",
        "ACC_Jewelry",
        "ACC_Shoes",
        "HAIR_Main",
        "HAIR_Accessories",
        "FACE_Features",
        "RIG_Skeleton"
    )
    
    local layers = #()
    for name in layerNames do (
        local l = LayerManager.newLayer()
        l.setName name
        append layers l
    )
    
    -- 设置参考面前视图
    local refPlaneFront = Plane length:180 width:100 lengthsegs:1 widthsegs:1
    refPlaneFront.name = "RefPlane_Front"
    refPlaneFront.pos = [0, 0, 0]
    refPlaneFront.rotation = quat 0 0 0 1
    layers[1].addNode refPlaneFront
    freeze refPlaneFront
    refPlaneFront.showFrozenInGray = false
    
    -- 设置参考面侧视图
    local refPlaneSide = Plane length:180 width:100 lengthsegs:1 widthsegs:1
    refPlaneSide.name = "RefPlane_Side"
    refPlaneSide.pos = [0, 0, 0]
    refPlaneSide.rotation = eulerangles 0 0 90
    layers[1].addNode refPlaneSide
    freeze refPlaneSide
    refPlaneSide.showFrozenInGray = false
    
    -- 设置参考面背视图
    local refPlaneBack = Plane length:180 width:100 lengthsegs:1 widthsegs:1
    refPlaneBack.name = "RefPlane_Back"
    refPlaneBack.pos = [0, 0, 0]
    refPlaneBack.rotation = eulerangles 0 0 180
    layers[1].addNode refPlaneBack
    freeze refPlaneBack
    refPlaneBack.showFrozenInGray = false
    
    -- 创建对称辅助线
    local symLine = SplineShape pos:[0, 0, 0]
    addNewSpline symLine
    addKnot symLine 1 #corner #line [0, 0, 90]
    addKnot symLine 1 #corner #line [0, 0, -90]
    updateShape symLine
    symLine.name = "Symmetry_Guide"
    symLine.wirecolor = color 255 0 0
    layers[1].addNode symLine
    freeze symLine
    
    -- 创建人体比例参考（标准8头身，约160cm）
    local heightGuide = Point()
    heightGuide.name = "Height_Marker_160cm"
    heightGuide.pos = [0, 0, 160]
    heightGuide.size = 5
    heightGuide.wirecolor = color 0 255 0
    layers[1].addNode heightGuide
    freeze heightGuide
    
    -- 视图配置
    viewport.SetLayout #layout_4
    viewport.activeViewport = 1
    viewport.SetType #view_front
    viewport.activeViewport = 2
    viewport.SetType #view_left
    viewport.activeViewport = 3
    viewport.SetType #view_top
    viewport.activeViewport = 4
    viewport.SetType #view_persp_user
    
    messageBox "蕾米埃尔·丹 场景初始化完成！\n\n参考面已创建，请将设定图贴至对应参考面。\n图层已按部位分类，请在各图层中建模。" title:"Remiel Scene Setup"
)