import Footer from './footer'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import styles from './index.less'
import {HasFooter} from '@/defaultSettings'
import {connect} from 'dva'
import React from 'react'
import {TRADE_LIST} from '@/utils/params'

@connect(({base}) => ({
    back: base.back
}))


export default class extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidCatch(err, info) {
        console.log(err)
        console.log(info)
        console.log('err',err.toString())
        console.log('info',info.toString())
        // this.setState({ hasError: true })
        //sendErrorReport(err,info)
    }
    componentDidMount(){
        window.work.client.GetFSData = function (data) {
            sessionStorage.setItem(TRADE_LIST,data)
        };
    }
    static getDerivedStateFromProps(props,state){
        if(props){
            const {dispatch} = props
            setTimeout(() => {
                dispatch({
                    type: 'base/assignBack',
                    bool: false
                })
            },100)
        }
        return null
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.back) {
    //         const {dispatch} = this.props
    //         setTimeout(() => {
    //             dispatch({
    //                 type: 'base/assignBack',
    //                 bool: false
    //             })
    //         },100)
    //     }
    // }

    render() {
        const {back, location, children} = this.props
        const pathname = location.pathname
        return (
            <ReactCSSTransitionGroup
                transitionName={back ? "slide-out" : 'slide-in'}
                component="div"
                className={styles.silde}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                transitionEnter={!HasFooter.includes(pathname) || back}
                transitionLeave={!HasFooter.includes(pathname) || back}
            >
                <div key={pathname}
                     style={{position: "absolute", width: "100%", height: '100%', backgroundColor: 'rgb(32, 33, 43)'}}
                >
                    {children}
                    <Footer/>
                </div>
            </ReactCSSTransitionGroup>
        )
    }
}
