if (!window.myPlugin) {
  window.myPlugin = {
  }
}
/**
 * 图片瀑布流
 * @param {Element} container 容器
 * @param {Object} options 配置信息
 */
window.myPlugin.waterfall = function (options) {
  var defaults = {
    minGap: 10,//默认图片之间的间隙
    imgWidth: 300,//默认图片的宽度
    container: document.body,//默认容器
  }
  options = Object.assign({}, defaults, options);
  var imgs = [];

  // 设置容器的定位
  setContainerPosition();
  // 创建图片
  createImg();

  // 窗口变化
  var debounce = myTools.debounce(setImgPosition, 100);
  window.onresize = debounce;

  function createImg() {
    // 函数防抖
    var debounce = myTools.debounce(setImgPosition, 100);
    for (var i = 0; i < options.imgs.length; i++) {
      const img = document.createElement('img');
      img.src = options.imgs[i];
      img.style.width = options.imgWidth + 'px';
      // 设置图片位置
      img.style.position = 'absolute';
      imgs.push(img);
      img.onload = debounce;
      options.container.appendChild(img);
    }
  }

  function setContainerPosition() {
    var style = getComputedStyle(options.container);
    if (style.position == "static") {
      options.container.style.position = "relative";
    }
  }

  function setImgPosition() {
    // 得到每行放置图片的信息，几张图，间隙
    var info = getPutInfo();
    // 每行图片个数的 top 值
    var tops = new Array(info.number).fill(0);
    imgs.forEach((img) => {
      var minTop = Math.min.apply(null, tops);
      img.style.top = minTop + 'px';
      var index = tops.indexOf(minTop);
      img.style.left = index * (options.imgWidth + info.gap) + 'px';
      // 更新最小的 top 值
      tops[index] += (img.clientHeight + info.gap);
    })
  }

  function getPutInfo() {
    var opts = {
      containerWidth: options.container.clientWidth,
      number: 0,
      gap: 0,
    }
    // 计算出每行放置图片的个数
    opts.number = Math.floor(opts.containerWidth / (options.imgWidth + options.minGap));
    // 计算出每行图片之间的间隙
    opts.gap = (opts.containerWidth - opts.number * options.imgWidth) / (opts.number - 1);
    return opts;
  }
}