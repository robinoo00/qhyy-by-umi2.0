import {PureComponent} from 'react'
import {Modal,List} from 'antd-mobile'
import {connect} from 'dva'
import DelAdnAdd from '@/components/del-input-add/'
import {getTradeDetail,modal} from '@/utils/common'

@connect()

export default class extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            num:1
        }
    }
    close = () => {
        const {hide} = this.props
        hide()
    }
    assginNum = val => {
        this.setState({
            num:val
        })
    }
    submit = () => {
        const data = getTradeDetail()
        const {dispatch} = this.props
        console.log(data)
        dispatch({
            type:'trade/ping',
            code:data.合约
        }).then(data => {
            console.log('1',data)
        })
        dispatch({
            type:'trade/order',
            direction:data.方向 === '买入' ? '卖出' : '买入',
            code:data.合约,
            num:this.state.num,
        }).then(data => {
            if(data.rs){
                modal(data.msg)
            }
        })
    }
    render() {
        const {price} = this.props
        const {num} = this.state
        return (
            <Modal
                popup
                visible={this.props.visible}
                maskClosable={true}
                onClose={this.close}
                animationType={'slide-up'}
                footer={[{
                    text: '取消', onPress: () => {
                        console.log('ok');
                        this.close()
                    }
                }, {
                    text: '确认', onPress: this.submit
                }]}
            >
                <>
                    <List.Item
                        extra={'平仓追返单'}
                    >
                        买入类型
                    </List.Item>
                    <List.Item
                        extra={'美原油'}
                    >
                        商品类型
                    </List.Item>
                    <List.Item
                        extra={price}
                    >
                        现价
                    </List.Item>
                    <List.Item
                        extra={
                            <DelAdnAdd
                                value={num}
                                callback={this.assginNum}
                            />
                        }
                    >
                        交易手数
                    </List.Item>
                </>
            </Modal>
        )
    }
}
