import {PureComponent} from 'react'
import styles from '../../styles/tradeModal.less'
import {Flex, Modal, Tabs, List, Button} from 'antd-mobile'
import DelInputAdd from '@/components/del-input-add'
import {addNum} from '@/utils/common'

export default class extends PureComponent {
    render() {
        const {data,money,price,wave,num,priceLoss,priceGain,assignPrice,assignPriceLoss,assignPriceGain,assignNum,buy,sell} = this.props
        const LossMinDiff = -priceLoss.lossMinDiff
        const LossMaxDiff = -1
        const GainMinDiff = priceGain.gainMinDiff
        const GainMaxDiff = priceGain.gainMaxDiff
        return (
            <div className={styles['list-wrap']}>
                <List
                    renderHeader={() => <div className={styles.header}>账户余额：{money}</div>}
                >
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                挂单价格
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <Flex.Item>
                                        <DelInputAdd
                                            callback={val => assignPrice(val)}
                                            value={price.value}
                                            min={addNum(data.最新价,-wave * 5)}
                                            max={data.最新价}
                                            diff={0.01}
                                        />
                                    </Flex.Item>
                                    <Flex.Item>
                                        {/*买入范围 ≥ {price.min} ~ ≤ {price.max}*/}
                                        (范围：{addNum(data.最新价,-wave * 5)} ~ {data.最新价})
                                    </Flex.Item>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                交易手数
                            </Flex.Item>
                            <Flex.Item>
                                <DelInputAdd
                                    callback={val => assignNum(val)}
                                    style={{width: '3rem'}}
                                    value={num}
                                />
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                止损价
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <Flex.Item>
                                        <DelInputAdd
                                            callback={val => assignPriceLoss(val)}
                                            style={{width: '3rem'}}
                                            min={addNum(price.value,wave*LossMinDiff)}
                                            max={addNum(price.value,wave*LossMaxDiff)}
                                            diff={wave}
                                            value={priceLoss.value}
                                        />
                                    </Flex.Item>
                                    <Flex.Item>
                                        预计亏损￥{priceLoss.loss}
                                    </Flex.Item>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                    <List.Item>
                        <Flex className={styles.item}>
                            <Flex.Item>
                                止盈价
                            </Flex.Item>
                            <Flex.Item>
                                <Flex>
                                    <Flex.Item>
                                        <DelInputAdd
                                            callback={val => assignPriceGain(val)}
                                            style={{width: '3rem'}}
                                            value={priceGain.value}
                                            min={addNum(price.value,wave*GainMinDiff)}
                                            max={addNum(price.value,wave*GainMaxDiff)}
                                            diff={wave}
                                        />
                                    </Flex.Item>
                                    <Flex.Item>
                                        预计盈利￥{priceGain.gain}
                                    </Flex.Item>
                                </Flex>
                            </Flex.Item>
                        </Flex>
                    </List.Item>
                </List>
                <Flex className={styles.submit}>
                    <Flex.Item className={styles.btn}>
                        <Button type={'primary'} onClick={buy}>买 {data.买价}</Button>
                    </Flex.Item>
                    <Flex.Item className={styles.btn}>
                        <Button type={'primary'} onClick={sell}>卖 {data.卖价}</Button>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}
