class myTools {
  /**
   * 柯里化函数，将多参函数转换为单参函数
   * @param {Function} fn 要执行的函数
   * @returns {Function}
   */
  static curry = function (fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    const that = this;
    return function () {
      var newArgs = Array.from(arguments);
      var totalArgs = args.concat(newArgs);
      if (totalArgs.length >= fn.length) {
        // 参数足够，执行函数
        return fn.apply(this, totalArgs);
      } else {
        // 参数不够，递归执行
        totalArgs.unshift(fn);
        return that.curry.apply(that, totalArgs);
      }
    }
  }

  /**
   * 函数管道，将多个函数依次执行，上一次函数的返回值作为下一次函数的参数
   * @returns {Function}
   */
  static pipe = function () {
    var args = Array.from(arguments);
    return function (val) {
      return args.reduce((result, fn) => {
        return fn(result);
      }, val);
    }
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