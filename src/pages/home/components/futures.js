import {PureComponent} from 'react'
import styles from '../styles/futures.less'
import {Flex, List} from 'antd-mobile'
import {connect} from 'dva'
import router from 'umi/router'
import {getTradeList} from '@/utils/common'

@connect()

export default class extends PureComponent {
    constructor(props) {
        super(props)
        this.sid = 0
        this.state = {
            list: null
        }
    }

    componentDidMount() {
        this._getData()
        this.sid = setInterval(this._getData, 1000)
    }
    componentWillUnmount(){
        clearInterval(this.sid)
    }

    _getData = () => {
        const {dispatch} = this.props
        const list = getTradeList()
        if(list){
            this.setState({
                list: [...list]
            })
        }
    }
    _link = (code) => () => {
        router.push({pathname:'trade',query:{code:code}})
    }
    _renderItem = (item) => {
        const percents = ((item.最新价 - item.开盘价) / item.开盘价 * 100).toFixed(2)
        const color = percents > 0 ? 'up' : 'down'
        return (
            <Flex.Item className={styles.item} data-color={color} key={item.合约} onClick={this._link(item.合约)}>
                <div>
                    <span>{item.名称}</span>
                    <span data-arrow={color}></span>
                </div>
                <div><span>{item.最新价}</span><span>{percents}%</span></div>
                <div data-bgcolor={color}></div>
            </Flex.Item>
        )
    }

    render() {
        const {list} = this.state
        if (!list) return null
        return (
            <div>
                <section className={styles.section}>
                    <List.Item>
                        国内期货
                    </List.Item>
                    <Flex className={styles.con} wrap={'wrap'} justify={'between'}>
                        {list.map(item =>
                            this._renderItem(item)
                            )}
                    </Flex>
                </section>
            </div>
        )
    }
}
