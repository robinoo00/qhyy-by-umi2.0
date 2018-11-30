import {PureComponent} from 'react'
import styles from '../styles/search.less'
import {Flex, InputItem} from 'antd-mobile'
import personIcon from '@/assets/person.png'
import router from 'umi/router'
import {connect} from 'dva'

@connect(({personal}) => ({
    data: personal.data
}))

export default class extends PureComponent {
    componentDidMount() {
        const {dispatch} = this.props
        dispatch({
            type: 'personal/getInfo'
        })
    }

    render() {
        const {data} = this.props
        if (!data) return null
        return (
            <div className={styles["container"]}>
                <Flex>
                    <Flex.Item className={styles["personal-info"]}>
                        <Flex onClick={() => {
                            router.push('/personal')
                        }}>
                            <img className={styles["icon"]} src={personIcon} alt=""/>
                            <div className={styles["detail"]}>
                                <div>{data.姓名 || '路人'}</div>
                                <div>({data.昵称})</div>
                            </div>
                        </Flex>
                    </Flex.Item>
                    <Flex.Item className={styles["input"]} onClick={() => {
                        router.push('/optional/search')
                    }}
                    >
                        <InputItem
                            disabled={true}
                            placeholder={'请输入股票名称/代码/简称'}
                        />
                    </Flex.Item>
                    <Flex.Item className={styles["help"]} onClick={() => {
                        router.push('help')
                    }}></Flex.Item>
                </Flex>
            </div>
        )
    }
}
