<template>
<div :style="`height:${height};width:${width}`">
  <div :id="id" style="height:100%;width:100%"></div>
  <canvas :id="`${id}s`" width="100%" height="100%" style="padding-left:5%"></canvas>
</div>
</template>
<script>
import Echarts from 'echarts'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      myChart: {},
      options: {
        backgroundColor: 'rgba(0,0,0,0)',
        // 默认色板
        color: ['#409eff', '#F17B20', '#67C23A', '#E6A23C', '#F56C6C',
          '#ff7a45', '#ffa940', '#cd5c5c', '#ffa500', '#40e0d0',
          '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
          '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
        // 图表标题
        title: {
          x: 'left', // 水平安放位置，默认为左对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          // textAlign: null          // 水平对齐方式，默认根据x设置自动调整
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc', // 标题边框颜色
          borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
          padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，
          textStyle: {
            fontSize: 18,
            fontWeight: 'bolder',
            color: '#333' // 主标题文字颜色
          },
          subtextStyle: {
            color: '#aaa' // 副标题文字颜色
          }
        },
        // 图例
        legend: {
          data: [], // 不显示图例
          orient: 'horizontal', // 布局方式，默认为水平布局，可选为：
          // 'horizontal' ¦ 'vertical'
          x: 'center', // 水平安放位置，默认为全图居中，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc', // 图例边框颜色
          borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
          padding: 5, // 图例内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
          // 横向布局时为水平间隔，纵向布局时为纵向间隔
          itemWidth: 20, // 图例图形宽度
          itemHeight: 14, // 图例图形高度
          textStyle: {
            color: '#333' // 图例文字颜色
          }
        },
        // // 值域
        // dataRange: {
        //   orient: 'vertical', // 布局方式，默认为垂直布局，可选为：
        //   // 'horizontal' ¦ 'vertical'
        //   x: 'left', // 水平安放位置，默认为全图左对齐，可选为：
        //   // 'center' ¦ 'left' ¦ 'right'
        //   // ¦ {number}（x坐标，单位px）
        //   y: 'bottom', // 垂直安放位置，默认为全图底部，可选为：
        //   // 'top' ¦ 'bottom' ¦ 'center'
        //   // ¦ {number}（y坐标，单位px）
        //   backgroundColor: 'rgba(0,0,0,0)',
        //   borderColor: '#ccc', // 值域边框颜色
        //   borderWidth: 0, // 值域边框线宽，单位px，默认为0（无边框）
        //   padding: 5, // 值域内边距，单位px，默认各方向内边距为5，
        //   // 接受数组分别设定上右下左边距，同css
        //   itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
        //   // 横向布局时为水平间隔，纵向布局时为纵向间隔
        //   itemWidth: 20, // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
        //   itemHeight: 14, // 值域图形高度，线性渐变垂直布局高度为该值 * 10
        //   splitNumber: 5, // 分割段数，默认为5，为0时为线性渐变
        //   color: ['#1e90ff', '#f0ffff'], // 颜色
        //   // text:['高','低'],         // 文本，默认为数值文本
        //   textStyle: {
        //     color: '#333' // 值域文字颜色
        //   }
        // },
        toolbox: {
          orient: 'horizontal', // 布局方式，默认为水平布局，可选为：
          // 'horizontal' ¦ 'vertical'
          x: 'right', // 水平安放位置，默认为全图右对齐，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: 'top', // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
          backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
          borderColor: '#ccc', // 工具箱边框颜色
          borderWidth: 0, // 工具箱边框线宽，单位px，默认为0（无边框）
          padding: 5, // 工具箱内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
          // 横向布局时为水平间隔，纵向布局时为纵向间隔
          itemSize: 16, // 工具箱图形宽度
          featureImageIcon: {}, // 自定义图片icon
          featureTitle: {
            mark: '辅助线开关',
            markUndo: '删除辅助线',
            markClear: '清空辅助线',
            dataZoom: '区域缩放',
            dataZoomReset: '区域缩放后退',
            dataView: '数据视图',
            lineChart: '折线图切换',
            barChart: '柱形图切换',
            restore: '还原',
            saveAsImage: '保存为图片'
          }
        },
        // 提示框
        tooltip: {
          trigger: 'item', // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
          showDelay: 20, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 100, // 隐藏延迟，单位ms
          transitionDuration: 0.4, // 动画变换时间，单位s
          backgroundColor: 'rgba(0,0,0,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: '#333', // 提示边框颜色
          borderRadius: 4, // 提示边框圆角，单位px，默认为4
          borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
          padding: 5, // 提示内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: { // 直线指示器样式设置
              color: '#48b',
              width: 2,
              type: 'solid'
            },
            shadowStyle: { // 阴影指示器样式设置
              width: 'auto', // 阴影大小
              color: 'rgba(150,150,150,0.3)' // 阴影颜色
            }
          },
          textStyle: {
            color: '#fff'
          }
        },
        // 区域缩放控制器
        // dataZoom: {
        //   orient: 'horizontal', // 布局方式，默认为水平布局，可选为：
        //   // 'horizontal' ¦ 'vertical'
        //   // x: {number},            // 水平安放位置，默认为根据grid参数适配，可选为：
        //   // {number}（x坐标，单位px）
        //   // y: {number},            // 垂直安放位置，默认为根据grid参数适配，可选为：
        //   // {number}（y坐标，单位px）
        //   // width: {number},        // 指定宽度，横向布局时默认为根据grid参数适配
        //   // height: {number},       // 指定高度，纵向布局时默认为根据grid参数适配
        //   backgroundColor: 'rgba(0,0,0,0)', // 背景颜色
        //   dataBackgroundColor: '#eee', // 数据背景颜色
        //   fillerColor: 'rgba(144,197,237,0.2)', // 填充颜色
        //   handleColor: 'rgba(70,130,180,0.8)' // 手柄颜色
        // },
        //  网格
        grid: {
          x: 80,
          y: 60,
          x2: 80,
          y2: 60,
          // width: {totalWidth} - x - x2,
          // height: {totalHeight} - y - y2,
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          borderColor: '#ccc',
          containLabel: true // grid 区域是否包含坐标轴的刻度标签,true包含，false不包含
        },

        // // 类目轴
        // categoryAxis: {
        //   position: 'bottom', // 位置
        //   nameLocation: 'end', // 坐标轴名字位置，支持'start' | 'end'
        //   boundaryGap: true, // 类目起始和结束两端空白策略
        //   axisLine: { // 坐标轴线
        //     show: true, // 默认显示，属性show控制显示与否
        //     lineStyle: { // 属性lineStyle控制线条样式
        //       color: '#48b',
        //       width: 2,
        //       type: 'solid'
        //     }
        //   },
        //   axisTick: { // 坐标轴小标记
        //     show: true, // 属性show控制显示与否，默认不显示
        //     interval: 'auto',
        //     // onGap: null,
        //     inside: false, // 控制小标记是否在grid里
        //     length: 5, // 属性length控制线长
        //     lineStyle: { // 属性lineStyle控制线条样式
        //       color: '#333',
        //       width: 1
        //     }
        //   },
        //   axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
        //     show: true,
        //     interval: 'auto',
        //     rotate: 0,
        //     margin: 8,
        //     // formatter: null,
        //     textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //       color: '#333'
        //     }
        //   },
        //   splitLine: { // 分隔线
        //     show: true, // 默认显示，属性show控制显示与否
        //     // onGap: null,
        //     lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
        //       color: ['#ccc'],
        //       width: 1,
        //       type: 'solid'
        //     }
        //   },
        //   splitArea: { // 分隔区域
        //     show: false, // 默认不显示，属性show控制显示与否
        //     // onGap: null,
        //     areaStyle: { // 属性areaStyle（详见areaStyle）控制区域样式
        //       color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        //     }
        //   }
        // },

        // // 数值型坐标轴默认参数
        // valueAxis: {
        //   position: 'left', // 位置
        //   nameLocation: 'end', // 坐标轴名字位置，支持'start' | 'end'
        //   nameTextStyle: {}, // 坐标轴文字样式，默认取全局样式
        //   boundaryGap: [0, 0], // 数值起始和结束两端空白策略
        //   splitNumber: 5, // 分割段数，默认为5
        //   axisLine: { // 坐标轴线
        //     show: true, // 默认显示，属性show控制显示与否
        //     lineStyle: { // 属性lineStyle控制线条样式
        //       color: '#48b',
        //       width: 2,
        //       type: 'solid'
        //     }
        //   },
        //   axisTick: { // 坐标轴小标记
        //     show: false, // 属性show控制显示与否，默认不显示
        //     inside: false, // 控制小标记是否在grid里
        //     length: 5, // 属性length控制线长
        //     lineStyle: { // 属性lineStyle控制线条样式
        //       color: '#333',
        //       width: 1
        //     }
        //   },
        //   axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
        //     show: false,
        //     rotate: 0,
        //     margin: 8,
        //     // formatter: null,
        //     textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //       color: '#333'
        //     }
        //   },
        //   splitLine: { // 分隔线
        //     show: true, // 默认显示，属性show控制显示与否
        //     lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
        //       color: ['#ccc'],
        //       width: 1,
        //       type: 'solid'
        //     }
        //   },
        //   splitArea: { // 分隔区域
        //     show: false, // 默认不显示，属性show控制显示与否
        //     areaStyle: { // 属性areaStyle（详见areaStyle）控制区域样式
        //       color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
        //     }
        //   }
        // },

        textStyle: {
          decoration: 'none',
          fontFamily: 'Arial, Verdana, sans-serif',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal'
        }

      },
      echartType: {
        polar: {
          center: ['50%', '50%'], // 默认全局居中
          radius: '75%',
          startAngle: 90,
          splitNumber: 5,
          name: {
            show: true,
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: '#333'
            }
          },
          axisLine: { // 坐标轴线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: { // 属性lineStyle控制线条样式
              color: '#ccc',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
            show: false,
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: '#333'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#ccc'
            }
          }
        },

        // 柱形图默认参数
        bar: {
          barMinHeight: 0, // 最小高度改为0
          // barWidth: null,        // 默认自适应
          barGap: '30%', // 柱间距离，默认为柱形宽度的30%，可设固定值
          barCategoryGap: '20%', // 类目间柱形距离，默认为类目间距的20%，可设固定值
          itemStyle: {
            normal: {
            // color: '各异',
              barBorderColor: '#fff', // 柱条边线
              barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
              barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
              label: {
                show: false
                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                //           'inside'|'left'|'right'|'top'|'bottom'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              }
            },
            emphasis: {
            // color: '各异',
              barBorderColor: 'rgba(0,0,0,0)', // 柱条边线
              barBorderRadius: 0, // 柱条边线圆角，单位px，默认为0
              barBorderWidth: 1, // 柱条边线线宽，单位px，默认为1
              label: {
                show: false
                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                //           'inside'|'left'|'right'|'top'|'bottom'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              }
            }
          }
        },

        // 折线图默认参数
        line: {
          itemStyle: {
            normal: {
            // color: 各异,
              label: {
                show: false
                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                //           'inside'|'left'|'right'|'top'|'bottom'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              },
              lineStyle: {
                width: 2,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)', // 默认透明
                shadowBlur: 5,
                shadowOffsetX: 3,
                shadowOffsetY: 3
              }
            },
            emphasis: {
            // color: 各异,
              label: {
                show: false
                // position: 默认自适应，水平布局为'top'，垂直布局为'right'，可选为
                //           'inside'|'left'|'right'|'top'|'bottom'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              }
            }
          },
          // smooth : false,
          // symbol: null,         // 拐点图形类型
          symbolSize: 2, // 拐点图形大小
          // symbolRotate : null,  // 拐点图形旋转控制
          showAllSymbol: false // 标志图形默认只有主轴显示（随主轴标签间隔隐藏策略）
        },
        // 饼图默认参数
        pie: {
          center: ['50%', '50%'], // 默认全局居中
          radius: [0, '75%'],
          clockWise: false, // 默认逆时针
          startAngle: 90,
          minAngle: 0, // 最小角度改为0
          selectedOffset: 10, // 选中是扇区偏移量
          itemStyle: {
            normal: {
            // color: 各异,
              borderColor: '#fff',
              borderWidth: 1,
              label: {
                show: true,
                position: 'outer'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              },
              labelLine: {
                show: true,
                length: 20,
                lineStyle: {
                  // color: 各异,
                  width: 1,
                  type: 'solid'
                }
              }
            },
            emphasis: {
            // color: 各异,
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              label: {
                show: false
                // position: 'outer'
                // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
              },
              labelLine: {
                show: false,
                length: 20,
                lineStyle: {
                  // color: 各异,
                  width: 1,
                  type: 'solid'
                }
              }
            }
          }
        },
        // 地图默认参数
        map: {}
      }
    }
  },
  props: {
    echartObj: {
      type: Object,
      default () {
        return {}
      }
    },
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    },
    id: {
      type: String,
      default: 'echart'
    },
    type: {
      type: String,
      default: 'line'
    },
    typeClick: {
      type: String,
      default: 'line'
    },
    jsList: {
      type: Array,
      default () {
        return []
      }
    },
    isJs: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.loadEchart()
    })
  },
  mounted () {
    window.onresize = () => {
      this.myChart.resize()
    }
  },
  beforeDestroy () {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  },
  computed: {
    ...mapGetters(['getScreenWidth'])
  },
  watch: {
    getScreenWidth () {
      this.myChart.resize()
    },
    '$store.state.Common.screenWidth' () {
      window.onresize = () => {
        this.myChart.resize()
      }
    },
    options: {
      deep: true,
      handler (newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal, true)
          } else {
            this.myChart.setOption(oldVal, true)
          }
        } else {
          this.loadEchart()
        }
      }
    }
  },
  methods: {
    loadEchart () {
      var waterMarkText = this.$store.getters.getUser.name
      this.canvas = document.getElementById(`${this.id}s`)
      var ctx = this.canvas.getContext('2d')
      this.canvas.width = this.canvas.height = 100
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.globalAlpha = 0.09
      ctx.font = '20px Microsoft Yahei'
      ctx.translate(50, 50)
      ctx.rotate(-Math.PI / 4)
      ctx.fillText(waterMarkText, 0, 0)
      this.options.backgroundColor = {
        type: 'pattern',
        image: this.canvas,
        repeat: 'repeat'
      }
      this.myChart = Echarts.init(document.getElementById(this.id))
      let options = Object.assign(this.options, this.echartObj)
      options[this.type] = this.echartType[this.type]
      this.myChart.setOption(options, true)
      if (this.type === 'bar' && this.isJs) {
        this.myChart.on('click', (param) => {
          this.jsList.filter((item) => {
            if (item.accountName === param.name) {
              this.$router.push({
                path: '/jsAdmin/jsDetail',
                query: {
                  id: item.id
                }
              })
            }
          })
        })
      }
      if (this.type === 'map') {
        this.myChart.on('click', (params) => {
          if (params.data.arealist) {
            this.$emit('getAreaMap', params.data.arealist)
          } else if (params.data.supplierMerchantName) {
            this.$emit('getAreaMap', params.data.name)
          }
        })
      }
      if (this.typeClick === 'clickBar') {
        this.myChart.on('click', (params) => {
          // if (params.da) {
          this.$emit('getBraData', params.name)
          // }
        })
      }
    }
  }
}
</script>
