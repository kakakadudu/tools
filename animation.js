if (!window.myPlugin) {
  window.myPlugin = {}
}
/**
 * 动画构造函数
 * @param {object} options 配置信息
 */
window.myPlugin.Animation = function (options) {
  var defaults = {
    interval: 16,// 间隔时间 毫秒
    duration: 1000,// 动画时长
    from: {},// 开始动画配置
    to: {},// 结束动画配置
  }
  this.option = Object.assign({}, defaults, options);

  // 动画次数
  this.number = Math.ceil(this.option.duration / this.option.interval);

  // 动画移动的总距离
  this.distance = {}

  // 每次动画移动的距离
  this.perDistance = {}
  for (var key in this.option.from) {
    this.distance[key] = this.option.to[key] - this.option.from[key];
    this.perDistance[key] = this.distance[key] / this.number;
  }

  // 当前运动的状态
  this.current = myTools.clone(this.option.from);

  // 当前运动的次数
  this.currentNumber = 0;

  // 动画 id
  this.timer = null;
}

// 开始动画
window.myPlugin.Animation.prototype.start = function () {
  if (this.timer || this.currentNumber === this.number) {
    return;
  }
  // 动画开始
  if (this.option.onStart) {
    this.option.onStart();
  }
  var that = this;
  this.timer = setInterval(function () {
    that.currentNumber++;
    // 改变动画的值
    for (var key in that.current) {
      that.current[key] += that.perDistance[key];
      // 运动到最后一次，改变为最后一次的数据
      if (that.currentNumber === that.number) {
        that.current[key] = that.option.to[key];
      }
      if (that.option.onMove) {
        that.option.onMove(that.current);
      }
    }
    if (that.currentNumber === that.number) {// 当前运动次数等于动画次数 停止动画
      that.stop();
      // 动画结束
      if (that.option.onOver) {
        that.option.onOver();
      }
    }
  }, this.interval)

}
// 停止动画
window.myPlugin.Animation.prototype.stop = function () {
  clearInterval(this.timer);
  this.timer = null;
  // 动画停止
  if (this.option.onStop) {
    this.option.onStop(this.current);
  }
}

/**
 * <script src="tools.js"></script>
 * <script src="animation.js"></script>
 * <script>
 *  var animate = new myPlugin.Animation({
 *    interval: 16,// 间隔时间 毫秒
 *    duration: 1000,// 动画时长
 *    from: {}// 开始动画配置
 *    to: {},// 结束动画配置
 *    onStart: function () { // 动画开始 },
 *    onMove: function (data) { // 移动 },
 *    onStop: function (data) { // 停止 },
 *    onOver: function () { // 动画结束 },
 *  })
 *  animate.start(); // 开始动画
 *  animate.stop(); // 停止动画
 * </script>
 */