import {PureComponent} from 'react'
import styles from '../styles/position-list.less'
import {Flex,List} from 'antd-mobile'
import {connect} from 'dva'
import {getTradeDataByCode} from '@/utils/common'
import {modal} from '@/utils/common'

const Brief = List.Item.Brief

@connect()

export default class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            list:null,
            show:false// 只有当tab切换的时候才进行数据获取
        }
    }
    static getDerivedStateFromProps(props,state){
        if(props.tabIndex === 1){
            return {
                show:true
            }
        }else{
            return null
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(!prevState.show && this.state.show){
            this.getData()
        }
    }
    getData = () => {
        const {dispatch} = this.props
        dispatch({
            type:'order/GetNoDealList'
        }).then(data => {
            this.setState({
                list:data
            })
        })
    }
    cancel = (orderid) => () => {
        const {dispatch} = this.props
        dispatch({
            type:'order/orderCancel',
            orderid:orderid
        }).then(data => {
            modal(data.msg)
        })
    }
    render() {
        const {list} = this.state
        if(!list) return null
        return (
            <div className={styles["wrap"]}>
                {list.map((item, index) => (
                    <div className={styles["item"]} key={"tradeList_" + index}>
                        <div className={styles["line1"]}>
                            <div className={styles["info"]}>
                                <div>
                                    <span className={styles["name"]}>{item.合约}</span>
                                    <span className={styles["tip"]} data-bgcolor={item.方向 === "买入" ? "down" : "up"}>{item.方向 === "买入" ? "买" : "卖"}</span>
                                    <span>×{item.数量}手</span>
                                </div>
                                <div>
                                    <span className={styles["time"]}>{item.时间}</span>
                                </div>
                            </div>
                            <div className={styles["action"]}>
                                <span onClick={this.cancel(item.单号)}>撤单</span>
                            </div>
                        </div>
                        <Flex className={styles["price"]}>
                            <Flex.Item>
                                <div>{getTradeDataByCode(item.合约)['最新价']}</div>
                                <div>当前价</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>{item.价格}</div>
                                <div>挂单价</div>
                            </Flex.Item>
                        </Flex>
                    </div>
                ))}
            </div>
        )
    }
}
