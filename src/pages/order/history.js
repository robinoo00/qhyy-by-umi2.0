import {PureComponent} from 'react'
import styles from '../personal/styles/myTrade.less'
import {Flex, ListView, Button, Modal} from 'antd-mobile'
import Header from '@/components/header/'
import {getHeight} from '@/utils/common'
import {alert} from '@/utils/common'
import {connect} from 'dva'

const Item = Flex.Item

@connect()

export default class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            list:null,
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
    }
    componentDidMount() {
        const {dispatch} = this.props
        dispatch({
            type:'order/history'
        }).then(list => {
            this.setState({
                list:list,
                data: this.state.data.cloneWithRows(list)
            })
        })
    }

    renderRow = (item) => {
        return (
            <div className={styles.item}>
                <Flex className={styles.header} justify={'between'}>
                    <Item>
                        <span>{item.合约}</span><span>名称</span>
                    </Item>
                    <Item data-color={item.价格 > 0 ? 'up' : 'down'}>
                        {item.价格}
                    </Item>
                </Flex>
                <Flex wrap={'wrap'} jusitify={'between'} className={styles.details}>
                    <Item>手续费：{item.手续费}</Item>
                    <Item>手数：{item.数量}</Item>
                </Flex>
                <Flex wrap={'wrap'} justify={'between'} className={styles.details2}>
                    <Item>买入时间</Item>
                    <Item>{item.时间}</Item>
                </Flex>
            </div>
        )
    }

    render()
    {
        const {list,data} = this.state;
        if(!list) return <Header
            title={'历史订单'}
        />
        return (
            <>
            <Header
                title={'历史订单'}
            />
            <ListView
                dataSource={data}
                renderRow={this.renderRow}
                onEndReachedThreshold={50}
                onScroll={() => {
                    console.log('scroll');
                }}
                scrollRenderAheadDistance={500}
                showsVerticalScrollIndicator={false}
                style={{
                    height: getHeight(['header']) + 'px',
                    overflow: 'auto',
                }}
            />
            </>
        )
    }
}
