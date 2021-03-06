import {PureComponent} from 'react'
import styles from './styles/withdraw.less'
import {Flex,InputItem,WhiteSpace,List} from 'antd-mobile'
import {createForm} from 'rc-form'
import {connect} from 'dva'
import Header from '@/components/header/'
import Submit from '@/components/submit/'
import {alert,modal,getBankLogo} from '@/utils/common'
import router from 'umi/router'

@createForm()
@connect(({personal}) => ({
    money:personal.data.可用资金,
    card:personal.data.银行卡号,
    bank:personal.data.绑定银行
}))

export default class extends PureComponent {
    submit = () => {
        const {dispatch,form} = this.props
        form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = form.getFieldsValue();
                dispatch({
                    type:'accountant/withdraw',
                    money:value.money
                }).then(data => {
                    if(data.rs){
                        modal(data.msg,() => {
                            router.goBack()
                        })
                    }else{
                        alert(data.msg)
                    }
                })
            } else {
                const errors = Object.values(error);
                alert(errors[0]['errors'][0]['message'], 1);
            }
        })
    }
    render() {
        const {form,card,money,bank} = this.props
        return (
            <div className={styles["container"]}>
                <Header
                    title={'账户提现'}
                />
                <List.Item
                    thumb={<img src={getBankLogo(bank)}/>}
                >
                    <div>农业银行</div>
                    <div>{card}</div>
                </List.Item>
                <div className={styles["input-wrap"]}>
                    <div>
                        <span>提取金额</span>
                        <span data-color="grey">(单笔限额100-50000每日不限次数)</span>
                    </div>
                    <div>
                        <Flex className={styles['input']}>
                            <div>￥</div>
                            <InputItem
                                clear={true}
                                {...form.getFieldProps('money', {
                                    initialValue:0,
                                    rules: [{
                                        required: true, message: '请输入提现金额',
                                    }],
                                })}
                            />
                        </Flex>
                    </div>
                    <div data-color="grey">可提现金额{money}</div>
                </div>
                <Submit
                    title={'提现'}
                    onClick={this.submit}
                />
            </div>
        )
    }
}
