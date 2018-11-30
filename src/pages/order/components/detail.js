import {PureComponent} from 'react'
import styles from '../styles/detail.less'
import {Flex, List, Button} from 'antd-mobile'
import K from '../../trade/components/k/'
import Header from '@/components/header/'
import {getTradeDetail,modal} from '@/utils/common'
import {connect} from 'dva'

@connect()

export default class extends PureComponent {
    ping = () => {
        const data = getTradeDetail()
        const {dispatch} = this.props
        dispatch({
            type:'trade/ping',
            code:data.合约
        }).then(data => {
            modal(data.msg)
        })
    }
    renderRow = (item) => {
        return (
            <List.Item key={item.title1}>
                <Flex justify={'between'} className={styles.section}>
                    <Flex.Item>
                        <Flex justify={'between'}>
                            <Flex.Item data-color={item.color}>
                                {item.value1}
                            </Flex.Item>
                            <Flex.Item className={styles.unit}>
                                {item.title1}
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item>
                        <Flex justify={'between'}>
                            <Flex.Item>
                                {item.value2}
                            </Flex.Item>
                            <Flex.Item className={styles.unit}>
                                {item.title2}
                            </Flex.Item>
                        </Flex>
                    </Flex.Item>
                </Flex>
            </List.Item>
        )
    }

    render() {
        const {data,showAdd,showPingAndAdd,showGaiAndLoss} = this.props
        const details = [
            {title1: '止损价', value1: '62.20(￥280.00)', title2: '当前价', value2: data.最新价, color: 'down'},
            {title1: '止盈价', value1: '62.20(￥280.00)', title2: '买入价', value2: 61.81, color: 'up'},
            {title1: '交易手数', value1: '0.1手', title2: '开仓价', value2: 61.81},
        ]
        return (
            <>
                <Header
                    title={`${data.名称} ${data.合约}`}
                />
                <K code={data.合约}/>
                <div className={styles.content}>
                    <List className={styles.list}>
                        <List.Item>
                            <Flex justify={'between'} className={styles.name}>
                                <Flex.Item>{data.名称}</Flex.Item>
                                <Flex.Item><Button type={'primary'} size={'small'} onClick={showGaiAndLoss}>设置止盈止损</Button></Flex.Item>
                            </Flex>
                        </List.Item>
                        {details.map(item => this.renderRow(item))}
                        <List.Item>
                            <Flex className={styles.earn}>
                                <Flex.Item>$-4.00(￥-21.00)</Flex.Item>
                                <Flex.Item>当前赢利</Flex.Item>
                            </Flex>
                        </List.Item>
                    </List>
                    <div className={styles.tips}>
                        <div>下单时间：2018</div>
                        <div>开市中，持仓至：11月</div>
                    </div>
                </div>
                <Flex justify={'around'} className={styles.submit}>
                    <Flex.Item>
                        <Button onClick={showPingAndAdd}>平仓追反单</Button>
                    </Flex.Item>
                    <Flex.Item>
                        <Button onClick={showAdd}>追单</Button>
                    </Flex.Item>
                    <Flex.Item onClick={this.ping}>
                        <Button>平仓</Button>
                    </Flex.Item>
                </Flex>
            </>
        )
    }
}
