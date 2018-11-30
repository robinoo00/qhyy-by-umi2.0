import {PureComponent,Component} from 'react'
import {createForm} from 'rc-form'
import {connect} from 'dva'
import router from 'umi/router'
import {alert} from '@/utils/common'
import {ACCOUNT,PASSWORD} from '@/utils/params'
import Comp from './components/Login'

@createForm()
@connect()

export default class extends Component {
    _submit = () => {
        const {form, dispatch} = this.props
        form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = form.getFieldsValue();
                dispatch({
                    type: 'account/login',
                    account:value.account,
                    password: value.password
                }).then((rs) => {
                    if(rs){
                        localStorage.setItem(ACCOUNT,value.account)
                        localStorage.setItem(PASSWORD,value.password)
                        router.push('/personal')
                    }
                })
            } else {
                const errors = Object.values(error);
                alert(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
    render() {
        const {form} = this.props
        const account = localStorage.getItem(ACCOUNT)
        const pwd = localStorage.getItem(PASSWORD)
        return (
            <Comp
                form={form}
                account={account}
                pwd={pwd}
                submit={this._submit}
            />
        )
    }
}
