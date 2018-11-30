import {PureComponent} from 'react'
import styles from '../styles/info.less'
import {Flex,Button} from 'antd-mobile'
import BGIMG from '@/assets/personalBGIMG.jpg'
import person from '@/assets/person.png'
import {connect} from 'dva'
import router from 'umi/router'

@connect(({personal}) => ({
    data:personal.data
}))

export default class extends PureComponent {
    componentDidMount(){
        const {dispatch} = this.props
        dispatch({
            type:'personal/getInfo'
        })
    }
    render() {
        const {data} = this.props
        if(!data) return null
        return (
            <div className={styles["container"]}>
                <img src={BGIMG} className={styles["bg"]}/>
                <div className={styles["mask"]}></div>
                <div className={styles["service"]}></div>
                <div className={styles["content"]}>
                    <Flex className={styles["detail"]}>
                        <Flex.Item className={styles["headimg"]}>
                            <img src={person}/>
                        </Flex.Item>
                        <Flex.Item className={styles["account"]}>
                            <div className={styles["nickname"]}>{data.姓名 || '路人'}</div>
                            <Flex className={styles["money"]}>
                                <Flex.Item className={styles["money-item"]}>
                                    <span>{data.可用资金}</span>
                                    <span>账号余额</span>
                                </Flex.Item>
                            </Flex>
                        </Flex.Item>
                    </Flex>
                    <Flex className={styles["actions"]}>
                        <Button type={'primary'} onClick={() => {router.push('accountant/recharge')}}>充值</Button>
                        <Button onClick={() => {router.push('accountant/withdraw')}}>提现</Button>
                    </Flex>
                </div>
            </div>
        )
    }
}
