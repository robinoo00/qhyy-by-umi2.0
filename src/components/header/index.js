import {PureComponent} from 'react'
import styles from './style.less'
import {Flex} from 'antd-mobile'
import router from 'umi/router'
import {connect} from 'dva'

@connect()

export default class extends PureComponent {
    _goBack = () => {
        const {dispatch} = this.props
        dispatch({
            type:'base/goBack',
        }).then(() => {
            router.goBack()
        })
    }
    render() {
        let {back=true,iconShow=true,title, leftText,rightText} = this.props
        let leftCallBack = () => {}
        if(back) leftCallBack = this._goBack
        return (
            <div className={styles["wrap"]}>
                <Flex className={styles["container"]} data-type="section" id="header">
                    <Flex className={styles["back"]} onClick={leftCallBack}>
                        {iconShow ? <div className={styles["icon"]}></div> : null}
                        <div className={styles["backText"]}>{leftText}</div>
                    </Flex>
                    <Flex.Item className={styles["title"]}>{title}</Flex.Item>
                    <Flex.Item className={styles["extra"]}>{rightText}</Flex.Item>
                </Flex>
            </div>
        )
    }
}
