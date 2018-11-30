import {PureComponent} from 'react'
import styles from './style.less'
import {Flex} from 'antd-mobile'
import Draw from './draw'
import {getKData} from '@/services/api'
import {connect} from 'dva'
import Pan from './pan'

@connect()

export default class extends PureComponent {
    state = {
        type_list:['分时','1分钟','5分钟','15分钟','1时','1日'],
        code:this.props.code,
        reload:false
    }
    panShow = false
    type_choose = '分时'
    lastTime = ''
    拖动开始x = 0
    拖动距离 = 0
    sid = 0
    height = 600
    componentDidMount(){
        this.draw = new Draw({id:'k',height:this.height})
        this.draw.chooseType(this.type_choose)
        this.draw.loading()
        this._getData()
        // if(this.type_choose === '分时'){
        //     this.sid = setInterval(this._getData,3000)
        // }
        this.sid = setTimeout(this._getData,3000)
        this._bindHammer()

    }
    componentWillUnmount(){
        clearInterval(this.sid)
    }
    _getData = () => {
        const params = {
            contract: this.state.code,
            type:this.type_choose,
            time:this.lastTime
        }
        const {dispatch} = this.props
        dispatch({
            type:'trade/getKData',
            params:params
        }).then(data => {
            if(data && data.length != 0){
                this.draw.assignData(data)
                this.lastTime = data[data.length - 1]['结束时间']
            }else{
                this.draw.loading()
            }
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.code != this.state.code){
            clearInterval(this.sid)
            this.code = this.state.code
            this.change()
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.code && props.code != state.code){
            return {
                code:props.code
            }
        }
        return null
    }
    change = (type = '分时') => {
        this.setState({
            reload:!this.state.reload
        })
        this.type_choose = type
        this.panShow = false
        this.lastTime = ''
        this.draw.data = []
        this.draw.loading()
        this.draw.chooseType(type)
        this._getData()
        if(type === '分时'){
            // this.sid = setInterval(this._getData,3000)
        }else{
            clearInterval(this.sid)
        }
    }
    chooseType = (type) => () => {
        if(this.type_choose != type){
            if(type === '盘口'){
                this.panShow = true
            }else{
                this.change(type)
            }
        }
    }
    _bindHammer = () => {
        const klineHammer = new window.Hammer.Manager(document.getElementById("k"));
        const pan = new window.Hammer.Pan();
        const pinch = new window.Hammer.Pinch();
        const press = new window.Hammer.Press();
        klineHammer.add([pan, pinch, press]);
        klineHammer.on('pan', this.handlePan);
        klineHammer.on('panstart', this.handleonPanStart);
        klineHammer.on('press', this.handlePress);
        klineHammer.on('pressup', this.handlePressUp);
        klineHammer.on('panend', this.handlePressUp);
        klineHammer.on('pinchin', this.handlePinchIn);
        klineHammer.on('pinchout', this.handlePinchOut);
        klineHammer.on('pinchstart', () => {this.draw.放大 = true});
        klineHammer.on('pinchend', () => {this.draw.放大 = false});
    }
    /*缩小*/
    handlePinchIn = e => {
        this.draw.scale = e.scale
        // this.draw.K线显示柱条数 = this.draw.K线显示柱条数 + Math.floor(2 / e.scale);
        // if (this.draw.K线显示柱条数 > this.draw.data.length) {
        //     this.draw.K线显示柱条数 = this.draw.data.length;
        // }
        this.draw.draw()
    }
    /*放大*/
    handlePinchOut = e => {
        this.draw.scale = e.scale
        // this.draw.K线显示柱条数 = this.draw.K线显示柱条数 - Math.floor(1.9 * e.scale);
        // if (this.draw.K线显示柱条数 < 1) {
        //     this.draw.K线显示柱条数 = 1
        // }
        this.draw.draw()
    }
    handlePan = (e) => {
        const {x,y} = e.center
        const draw = this.draw
        if(draw.十字线显示){
            draw.drawDrag(x,y)
            return
        }
        this.拖动距离 = x - this.拖动开始x
        this.draw.拖动条数 = Math.round(this.拖动距离 / draw.单位宽度)
        // const diff_start = draw.开始条数 - this.拖动条数
        // const diff_end = draw.结束条数 - this.拖动条数
        // if(this.draw.拖动条数 >= 0){//向右拖动
        //     // console.log('向右拖动')
        //     draw.开始条数 = diff_start <= 0 ? 0 : diff_start
        //     draw.结束条数 = diff_start <= 0 ? draw.K线显示柱条数 : diff_end
        // }else{//向左拖动
        //     // console.log('向左拖动')
        //     draw.开始条数 = diff_end >= draw.data.length ? draw.data.length - draw.K线显示柱条数 : diff_start
        //     draw.结束条数 = diff_end >= draw.data.length ? draw.data.length : diff_end
        // }
        draw.draw()
    }
    handleonPanStart = e => {
        this.拖动开始x = e.center.x
    }
    handlePress = e => {
        const {x,y} = e.center
        this.draw.十字线显示 = true
        this.draw.drawDrag(x,y)
    }
    handlePressUp = e => {
        this.draw.十字线显示 = false
        this.draw.drawDrag()
    }
    render() {
        const {type_list} = this.state
        const type_choose = this.type_choose
        const height = this.height
        return (
            <div>
                <Flex className={styles["k-nav"]}>
                    {type_list.map((item,index) => (
                        <Flex.Item style={type_choose === item ? {borderBottom:'1px solid #fff'} : {}} className={styles["k-nav-item"]} key={'k_nav_'+index} onClick={this.chooseType(item)}>{item}</Flex.Item>
                    ))}
                </Flex>
                <div style={{height:height + 'px'}}>
                    <canvas id="k" style={{backgroundColor: "#20212b"}} style={this.panShow ? {display:'none'} : null}></canvas>
                    {this.panShow ? <Pan
                        height={this.height}
                    /> : null}
                </div>
            </div>
        )
    }
}
