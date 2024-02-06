Date.prototype.Format = function (fmt) {
  var o = {
    "y+": this.getFullYear(),// 年份
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) {
      var result = new RegExp("(" + k + ")").exec(fmt)[0];
      fmt = fmt.replace(result, (o[k].toString().padStart(result.length, "0")));
    };
  return fmt;
}

Date.prototype.FormatTime = function (date) {
  const timeDec = this - new Date(date).getTime();
  const days = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
  if (timeDec < 60 * 1000) {
    return `${Math.floor(timeDec / 1000)} 秒前`
  } else if (timeDec < 60 * 60 * 1000) {
    return `${Math.floor(timeDec / 1000 / 60)} 分钟前`
  } else if (timeDec < 60 * 60 * 24 * 1000) {
    return `${Math.floor(timeDec / 1000 / 60 / 60)} 小时前`
  } else if (timeDec < 60 * 60 * 24 * 1000 * (days - 1)) {
    return `${Math.floor(timeDec / 1000 / 60 / 60 / 24)} 天前`
  } else {
    return new Date(date).Format("yyyy-MM-dd hh:mm:ss");
  }
}