/**
 * modal.js - 通用弹窗组件逻辑
 * 功能：弹出/关闭动画、确认/取消事件
 *
 * 使用方式：
 * <modal-dialog
 *   show="{{showModal}}"
 *   title="标题"
 *   confirmText="确认"
 *   cancelText="取消"
 *   showCancel="{{true}}"
 *   bind:confirm="onConfirm"
 *   bind:cancel="onCancel"
 * >
 *   <view slot="content">自定义内容</view>
 * </modal-dialog>
 */

Component({
  /**
   * 组件属性（对外接口）
   */
  properties: {
    // 是否显示弹窗
    show: {
      type: Boolean,
      value: false,
      observer: '_onShowChange'
    },
    // 标题文字
    title: {
      type: String,
      value: ''
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      value: '确认'
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      value: '取消'
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件数据
   */
  data: {},

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      // 组件挂载
    },
    detached() {
      // 组件销毁
    }
  },

  /**
   * 组件方法
   */
  methods: {
    /**
     * 监听 show 属性变化
     */
    _onShowChange(newVal, oldVal) {
      // 弹窗打开时阻止背景滚动
      if (newVal) {
        // 小程序中通过 catchtouchmove 阻止滚动
      }
    },

    /**
     * 确认按钮点击
     * 触发自定义事件 bind:confirm
     */
    onConfirm() {
      this.triggerEvent('confirm', {});
    },

    /**
     * 取消按钮点击
     * 触发自定义事件 bind:cancel
     */
    onCancel() {
      this.triggerEvent('cancel', {});
    },

    /**
     * 阻止事件冒泡（遮罩层点击不关闭）
     */
    noop() {
      // 空函数，仅用于 catchtouchmove 阻止穿透滚动
    }
  }
});