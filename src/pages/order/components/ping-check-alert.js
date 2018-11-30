import styles from '../styles/ping-check-alert.less'
import {Flex, Toast, Modal} from 'antd-mobile'
import {connect} from 'dva'
import {PureComponent} from 'react'

export default class extends PureComponent{
    render(){
        const {submit,item, hidePingModal, visible,assignPingNum,num} = this.props;
        return(
            <div>
                <Modal
                    visible={visible}
                    transparent
                    maskClosable={true}
                    onClose={() => {hidePingModal()}}
                    title="确认平仓?"
                    footer={
                        [
                            {text: '取消', onPress: hidePingModal},
                            {
                                text: '确定', onPress: () => {
                                    submit(item)
                                }
                            },
                        ]
                    }
                    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div>
                        <p style={{color: '#bcbcbc'}}> 合约号:{item.合约}</p>
                        <br/>
                        <Flex><Flex.Item className={styles['left']}>浮动盈亏:</Flex.Item>&nbsp;&nbsp;<Flex.Item
                            style={{color: '#E34C4D'}}>{item.浮动盈亏}</Flex.Item></Flex>
                        <Flex><Flex.Item className={styles['left']}>开仓价:</Flex.Item>&nbsp;&nbsp;<Flex.Item>{item.均价}</Flex.Item></Flex>
                        <Flex><Flex.Item className={styles['left']}>当前价:</Flex.Item>&nbsp;&nbsp;
                            <Flex.Item>{item.当前价}</Flex.Item></Flex>
                        <Flex styleName="num-choose">
                            <Flex.Item>
                                <div className={styles['del-item']} onClick={() => {
                                    assignPingNum(num - 1)
                                }}>-
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className={styles['num-input']}>
                                    <input type="number" value={num} readOnly/>
                                </div>
                            </Flex.Item>
                            <Flex.Item>
                                <div className={styles['add-item']} onClick={() => {
                                    assignPingNum(num + 1)
                                }}>+
                                </div>
                            </Flex.Item>
                        </Flex>
                    </div>
                </Modal>
            </div>
        )
    }
}
