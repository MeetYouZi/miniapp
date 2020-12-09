import { timeout,getElementById, getElementsByClassName } from './wxp'
const app = getApp()
Page({
  data: {
    labelList: [],  // 视图显示的标签集合
    allLabel: [],   // 所有的标签集合
    firstLabel: [], // 默认显示的标签集合
    showLabel: 1,   // 0 两个按钮都不显示，1 显示展开，2 显示收起
  },
  async loadPageData(){
    // 请求后台数据
    const res = ['加油加', '排序排序排', '时间复杂度', '冒泡', '时间复杂度', '时间复杂度', '时间4', '算法', '时间复杂度', '哈希表', '二分查找', '贪心算法', '双指针', '栈', '位运算', '递归', '时间复杂度', '时间复杂度', '时间复杂度', '并查集', '时间复杂度', '动态规划', '时间复杂度', '时间复杂度', '时间复杂度', '时间复杂度'];

    // 设置
    this.setData({
      allLabel: res,
      labelList: res
    })
    // 设置状态
    if(this.data.allLabel.length>0){
      await timeout(300); // 插入视图之后不会马上获取到节点信息，延迟获取
      await this.setLabelStatus();
    }

  },

  // 设置标签状态
  async setLabelStatus(){
    const boxDom = await getElementById('#labelBox');
    const labelDoms = await getElementsByClassName('.userLabel');
    const btnDom = await getElementById('#moreLabel');
    const left = labelDoms[0].left;
    console.log(left, 'labelDoms')

    // 分行转为二维数组
    let lineArr = [];
    let lineIndex = -1;
    labelDoms.forEach(v => {
      if(v.left==left){
        lineIndex++;
        lineArr[lineIndex] = [];
      }
      lineArr[lineIndex].push(v);
    })

    // 超过一行
    if(lineArr.length>3){
      // 默认显示加载更多按钮
      this.setData({
        showLabel: 1
      })
      let showList = [ ...lineArr[1] ]
      // 过滤第一行节点的 right，如果与按钮的width相加小于等于父级盒子的width就保留
      const firstTr = showList.filter(v => {
        console.log(v, 'v.right')
        return (v.right + btnDom.width + (left / 15 * 15)) <= boxDom.width
      })
      console.log(firstTr, 'firstTr')
      let first = lineArr[0].length
      let labelList = this.data.allLabel.slice(0,firstTr.length + first)
      this.setData({
        firstLabel: this.data.allLabel.slice(0,firstTr.length + first),
        labelList: labelList
      })
    }else{
      this.setData({
        showLabel: 0
      })
    }
  },

  // 展开
  openMore(){
    this.setData({
      showLabel: 2,
      labelList: this.data.allLabel
    })
  },
  // 收起
  closeMore(){
    this.setData({
      showLabel: 1,
      labelList: this.data.firstLabel
    })
  },
  onLoad () {
    this.loadPageData()
  },
})
