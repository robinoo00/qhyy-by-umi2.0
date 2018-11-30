import {PureComponent} from 'react'
import styles from '../styles/nav.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'

export default class extends PureComponent {
    render() {
        return (
            <Flex className={styles["container"]} data-type="section">
                <Flex onClick={() => {router.push('/trade')}}>
                    <div className={styles["icon"]}></div>
                    <div className={styles["con"]}>
                        <div>策略</div>
                        <div>A股点买</div>
                    </div>
                </Flex>
                <Flex onClick={() => {router.push('/optional')}}>
                    <div className={styles["icon"]}></div>
                    <div className={styles["con"]}>
                        <div>自选</div>
                        <div>A股点买</div>
                    </div>
                </Flex>
                <Flex onClick={() => {router.push('/personal/financialDetails')}}>
                    <div className={styles["icon"]}></div>
                    <div className={styles["con"]}>
                        <div>明细</div>
                        <div>A股点买</div>
                    </div>
                </Flex>
            </Flex>
        )
    }
}
