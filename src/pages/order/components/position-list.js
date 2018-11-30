import styles from '../styles/position-list.less'
import {Flex, Modal, List, Button, InputItem, ListView} from 'antd-mobile'
import {connect} from 'dva'
import {PureComponent} from 'react'
// import AlertItem from './ping-check-alert'
import {getTradeDataByCode,checkModal} from '@/utils/common'
import router from 'umi/router'
import {TRADE_DETAIL} from '@/utils/params'

@connect(({order}) => ({
    list: order.listHold
}))

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
    }

    componentDidMount() {
        const {dispatch} = this.props
        this._getData()
            .then(this._assignData)
    }
    _assignData = (data) => {
        return new Promise((resolve, reject) => {
            const {dispatch} = this.props
            dispatch({
                type: 'order/assignListHold',
                list: data
            })
            resolve()
        })
    }
    _getData = () => {
        return new Promise((resolve, reject) => {
            const {dispatch} = this.props
            dispatch({
                type: 'order/getOrderList'
            }).then(data => {
                    resolve(data)
                }
            )
        })
    }
    ping = (item) => () => {
        checkModal(`确定平仓${item.合约}吗`,() => {
            const {dispatch} = this.props
            dispatch({
                type: 'trade/ping',
                code: item.合约,
            }).then(data => {
                if (data.rs) {
                    this._getData()
                        .then(this._assignData)
                }
            })
        })
    }
    detail = (item) => () => {
        sessionStorage.setItem(TRADE_DETAIL,JSON.stringify(item))
        router.push({pathname:'order/detail',query:{code:item.合约}})
    }

    render() {
        const {list} = this.props
        if (!list) return null
        return (
            <div className={styles["wrap"]}>
                {list.map((item, index) => (
                    <div className={styles["item"]} key={"tradeList_" + index}>
                        <div className={styles["line1"]}>
                            <div className={styles["info"]}>
                                <div>
                                    <span className={styles["name"]}>{item.合约}</span>
                                    <span className={styles["money"]}>/{item.货币}</span>
                                    <span className={styles["tip"]}
                                          data-bgcolor={item.方向 === "买入" ? "down" : "up"}>{item.方向 === "买入" ? "买" : "卖"}</span>
                                    <span>×{item.数量}手</span>
                                </div>
                                <div>
                                    <span className={styles["time"]}>{item.开仓时间}</span>
                                </div>
                            </div>
                            <div className={styles["action"]}>
                                {/*<span className={item.浮动盈亏 > 0 ? styles["up-num"] : styles["down-num"]}>{item.浮动盈亏}</span>*/}
                                <span onClick={this.ping(item)}>平仓</span>
                                <span onClick={this.detail(item)}>详情</span>
                            </div>
                        </div>
                        <Flex className={styles["price"]}>
                            <Flex.Item>
                                <div>{item.均价}</div>
                                <div>均价</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>{getTradeDataByCode(item.合约)['最新价']}</div>
                                <div>当前价</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div>{item.市场价}</div>
                                <div>市场价</div>
                            </Flex.Item>
                            <Flex.Item>
                                <div data-color={item.浮动盈亏 > 0 ? 'up' : 'down'}>{item.浮动盈亏}</div>
                                <div>浮动盈亏</div>
                            </Flex.Item>
                        </Flex>
                    </div>
                ))}
            </div>
        )
    }
}
