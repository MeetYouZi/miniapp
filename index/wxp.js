/**
 * 延时
 * @param {*} delay
 */
export const timeout = delay => new Promise(resolve => setTimeout(resolve, delay));

/**
 * 根据ID获取dom的盒模型信息
 * @param {*} id
 */
export const getElementById = (id='') => {
  return new Promise((resolve, reject) => {
    if ((typeof id).toLowerCase() !=='string'){
      const err = {
        errMsg: '请输入字符串，例如 #box'
      }
      reject(error(err.errMsg,err));
    } else if (id.indexOf('#') < 0) {
      const err = {
        errMsg: '请输入ID，例如 #box'
      }
      reject(error(err.errMsg,err));
    }else{
      var query = wx.createSelectorQuery()
      query.select(id).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(rect => {
        if (rect[0]){
          let info = rect[0];
          info.position = {
            left: rect[1].scrollLeft + info.left,
            top: rect[1].scrollTop + info.top
          };
          resolve(info);
        }else{
          const err = {
            errMsg: '没有获取到信息'
          }
          reject(error(err.errMsg,err));
        }
      })
    }
  })
}

/**
 * 根据类名获取dom信息
 * @param {*} className
 */
export const getElementsByClassName = (className = '') => {
  return new Promise((resolve, reject) => {
    if ((typeof className).toLowerCase() !== 'string') {
      const err = {
        errMsg: '请输入字符串，例如 .box'
      }
      reject(error(err.errMsg,err));
    } else if (className.indexOf('.') < 0) {
      const err = {
        errMsg: '请输入类名，例如 .box'
      }
      reject(error(err.errMsg,err));
    } else {
      wx.createSelectorQuery().selectAll(className).boundingClientRect(rects => {
        resolve(rects);
      }).exec();
    }
  })
}
