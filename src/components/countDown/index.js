import {PureComponent} from 'react'
import {alert} from '@/utils/common'
import {CID} from '@/utils/params'

export default class extends PureComponent {
    state = {
        seconds:60,
        connect:false,//连接使用 如果不相等 则为开
        send_text:'获取验证码'
    }
    can_send = true
    componentWillUnmount(){
        clearInterval(this.send_id)
    }
    _countDown = () => {
        return new Promise(resolve => {
            if(this.can_send){
                this.can_send = false
                this.setState({
                    seconds: this.state.seconds - 1,
                    send_text:'('+(this.state.seconds - 1)+')秒后发送'
                })
                this.send_id = setInterval(() => {
                    this.setState((preState) => ({
                        seconds: preState.seconds - 1,
                        send_text:'('+(preState.seconds - 1)+')秒后发送'
                    }), () => {
                        if (this.state.seconds <= 0) {
                            clearInterval(this.send_id);
                            this.can_send = true
                            this.setState({
                                send_text:'获取验证码',
                                seconds:60,
                            })
                        }
                    });
                }, 1000)
                resolve()
            }
        })
    }
    _start = () => {
        this._countDown()
            .then(this._callBack)
    }
    _callBack = () => {
        const {callBack} = this.props
        callBack()
    }
    render() {
        const {send_text} = this.state
        return (
            <div onClick={this._start}>
                {send_text}
            </div>
        )
    }
}
