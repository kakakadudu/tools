class Tools {
  /**
   * 函数柯里化
   * @param {Function} fn 要执行的函数
   * @returns {Function}
   */
  static curry = function () {
    var fn = arguments[0]; // 获取要执行的函数
    var args = [].slice.call(arguments, 1); // 克隆传递的参数，构成一个参数数组
    // 如果传递的参数已经等于执行函数所需的参数数量
    if (args.length === fn.length) {
      return fn.apply(this, args)
    }
    // 参数不够向外界返回的函数
    function _curry() {
      // 推入之前判断
      // 将新接收到的参数推入到参数数组中
      args.push(...arguments);
      if (args.length === fn.length) {
        return fn.apply(this, args)
      }
      return _curry;
    }
    return _curry;
  }

  /**
   * 函数防抖
   * @param {Function} cb 回调函数
   * @param {Number} duration 延迟时间
   */
  static debounce = function (cb, duration) {
    var timer = null;
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        cb.apply(this, arguments);
        timer = null;
      }, duration)
    }
  }

  /**
   * 函数节流
   * @param {*} cb 回调函数
   * @param {*} duration 间隔时间
   * @param {*} immediately 是否立即执行
   */
  static throttle = function (cb, duration, immediately) {
    var time, timer = null;
    if (immediately) {
      return function () {
        if (!time || Date.now() - time >= duration) {
          cb.apply(this, arguments);
          time = Date.now();
        }
      }
    } else {
      return function () {
        if (timer) {
          return;
        }
        timer = setTimeout(() => {
          cb.apply(this, arguments);
          timer = null;
        }, duration)
      }
    }
  }
}

