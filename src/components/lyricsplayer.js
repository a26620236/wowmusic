import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './headerNormal'
import { db, firebase, storage } from '../static/js/firebase'

class Lyricplayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ms: []
    }
    this.lyric__content = React.createRef()
    this.lyric = React.createRef()
    this.createLrcObj = this.createLrcObj.bind(this)
  }
  componentDidMount() {
    this.createLrcObj()
  }
  render() {
    let { clickLyric } = this.props
    let {　ms } = this.state
    let arr = []
    for (let i in ms) {//遍历ms数组，把歌词加入列表
      let innerText = <div key={i} time={ms[i].t} onClick={clickLyric}>{ms[i].c}</div>
      arr.push(innerText)
    }
    return (
      <div className='lyricplayer'>
        <div style={{ display: "none" }}>
          <div ref={this.lyric__content}>
            [00:00.10]卜學亮-超跑情人夢*
            [00:00.50]作詞：卜學亮、武雄*
            [00:00.90]作曲：卜學亮、官錠AL*
            [00:01.06]Ladies & Gentlemen*
            [00:03.21]My Name is 阿亮*
            [00:06.69]缸 盆 碗 碟 哪個深*
            [00:09.44]缸比盆深 盆比碗深 碗比碟深*
            [00:15.34]那個最深的是缸*
            [00:18.16]那個最淺的是碟*
            [00:21.12]Let's go*
            [00:29.82]有位帥哥開著一輛敞篷的奔馳*
            [00:32.77]一手握著方向盤還一手拿沙士*
            [00:35.72]又飛過一輛閃閃發亮的ＢＭＷ*
            [00:38.86]我卻站在人行道上 飲豆奶*
            [00:54.08]每個人的心中都有一輛夢幻車*
            [00:56.99]不要跟我說她只是代步的工具*
            [01:00.00]引擎發動之后就要人車一體*
            [01:02.96]趕快踩下油門帶我貼地飛行*
            [01:06.22]轟隆隆 隆隆隆隆 沖沖沖沖 拉風*
            [01:09.04]引擎發動 so come on*
            [01:10.66]引擎發動 so come on*
            [01:12.09]一瞬間 踩下油門*
            [01:13.66]催乎盡磅(臺) 乘風 沖 沖*
            [01:16.86]讓窗外的*
            [01:18.11]風 吹動每一個毛孔*
            [01:20.84]我是今夜 最 稀有的品種*
            [01:24.34]讓 看到的人以為是夢*
            [01:27.33]還沒醒來 就已經無影無蹤*
            [01:30.30]風 敲醒每一個面孔*
            [01:32.99]我是明天 被 贊嘆的驚悚*
            [01:36.35]讓 看到的人全部感動*
            [01:39.43]零到一百K only四秒鐘*
            [01:42.56]紅燈停 綠燈行 看到行人要當心*
            [01:45.33]快車道 慢車道 平安回家才是王道*
            [01:48.41]開車不是騎車不怕沒戴安全帽，*
            [01:51.44]只怕警察BI BI BI 叫我路邊靠*
            [01:54.52]BI BI BI BI BI 大燈忘了開*
            [01:57.40]BI BI BI BI BI 駕照沒有帶*
            [02:00.52]BI BI BI BI BI 偷偷講電話*
            [02:03.44]BI BI BI BI BI 沒系安全帶*
            [02:06.86]我的夢幻車子就是最辣的美女*
            [02:09.56]有她陪伴哪怕車上只有收音機*
            [02:12.60]我就像只野狼身上披著羊的皮*
            [02:15.62]我的心情好比開著一架戰斗機*
            [02:18.76]轟隆隆 隆隆隆隆 沖沖沖沖 拉風*
            [02:21.70]引擎發動 so come on*
            [02:23.33]引擎發動 so come on*
            [02:24.79]一瞬間 踩下油門*
            [02:26.25]催乎盡磅(臺) 乘風 沖 沖*
            [02:29.31]讓窗外的*
            [02:30.75]風 吹動每一個毛孔*
            [02:33.53]我是今夜 最 稀有的品種*
            [02:36.91]讓 看到的人以為是夢*
            [02:39.97]還沒醒來 就已經無影無蹤*
            [02:42.91]風 敲醒每一個面孔*
            [02:45.62]我是明天 被 贊嘆的驚悚*
            [02:48.98]讓 看到的人全部感動*
            [02:52.03]零到一百K only四秒鐘*
            [02:55.06]警察先生心情看來還不賴*
            [02:58.01]面帶微笑問我車子怎么這樣開*
            [03:01.16]O 1 O 1 O 1 O 1 O*
            [03:04.27]一時疏忽還請大人多擔待*
            [03:07.09]O 1 O 1 O 1 O 1 O*
            [03:10.30]可惜罰單還是狠心照常開*
            [03:13.22]1 代 1 代 1代 1代*
            [03:16.45]駕照沒帶300塊 大牌不潔加300*
            [03:19.34]1 代 1 代 1代 1代*
            [03:22.25]超速被罰1600 紅燈右轉加600*
            [03:25.48]風 吹動每一個毛孔*
            [03:28.01]我是今夜 最 稀有的品種*
            [03:31.38]讓 看到的人以為是夢*
            [03:34.42]還沒醒來 就已經無影無蹤*
            [03:37.43]風 敲醒每一個面孔*
            [03:40.09]我是明天 被 贊嘆的驚悚*
            [03:43.48]讓 看到的人全部感動*
            [03:46.57]零到一百K only四秒鐘*
            [03:49.60]
          </div>
        </div>
        <div className='lyric' ref={this.lyric}>{arr}</div>
      </div>
    )
  }
  createLrcObj() {
    let oLRC = {
      ti: "", //歌曲名
      ar: "", //演唱者
      al: "", //专辑名
      by: "", //歌词制作人
      offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
      ms: [] //歌词数组{t:时间,c:歌词}
    };
    let lrc = this.lyric__content.current.innerText
    if (lrc.length == 0) return;
    let lrcs = lrc.split('*');//用回车拆分成数组
    for (let i in lrcs) {//遍历歌词数组
      lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
      let t = lrcs[i].substring(lrcs[i].indexOf("[") + 1, lrcs[i].indexOf("]"));//取[]间的内容
      let s = t.split(":");//分离:前后文字
      if (isNaN(parseInt(s[0]))) { //不是数值
        for (let i in oLRC) {
          if (i != "ms" && i == s[0].toLowerCase()) {
            oLRC[i] = s[1];
          }
        }
      } else { //是数值
        let arr = lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间字段，可能有多个
        let start = 0;
        for (let k in arr) {
          start += arr[k].length; //计算歌词位置
        }
        let content = lrcs[i].substring(start);//获取歌词内容
        for (let k in arr) {
          let t = arr[k].substring(1, arr[k].length - 1);//取[]间的内容
          let s = t.split(":");//分离:前后文字
          oLRC.ms.push({//对象{t:时间,c:歌词}加入ms数组
            t: (parseFloat(s[0]) * 60 + parseFloat(s[1])).toFixed(3),
            c: content
          });
        }
      }
    }
    oLRC.ms.sort(function (a, b) {//按时间顺序排序
      return a.t - b.t;
    });
    /*
    for(let i in oLRC){ //查看解析结果
        console.log(i,":",oLRC[i]);
    }*/
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        ms: oLRC.ms
      }
      return newState
    })
  }
}
export default Lyricplayer
