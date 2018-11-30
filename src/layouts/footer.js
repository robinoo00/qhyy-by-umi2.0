import {PureComponent} from 'react'
import styles from './footer.less'
import {Flex} from 'antd-mobile'
import {connect} from 'dva'
import {HasFooter} from '@/defaultSettings'
import router from 'umi/router'

@connect(({routing}) => ({
    pathname:routing.location.pathname
}))

export default class extends PureComponent {
    render() {
        const {pathname} = this.props
        if(!HasFooter.includes(pathname)){
            return null
        }
        const list = [
            {title:'首页',url:'/home'},
            {title:'持仓',url:'/order'},
            {title:'资讯',url:'/news'},
            {title:'我的',url:'/personal'}
        ]
        return (
            <div className={styles["wrap"]}>
                <Flex justify={'around'} className={styles["container"]}  id="footer" data-type="section">
                    {list.map(item => (
                        <Flex.Item
                            key={item.title}
                            className={styles["item"]} data-color={pathname === item.url ? "orange" : null}
                            onClick={() => {router.push(item.url)}}
                        >
                            <div className={styles["icon"]}></div>
                            <div className={styles["title"]}>{item.title}</div>
                        </Flex.Item>
                    ))}
                </Flex>
            </div>
        )
    }
}
