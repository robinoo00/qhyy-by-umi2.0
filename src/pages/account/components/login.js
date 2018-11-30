import CSSModules from 'react-css-modules'
import styles from '../styles/login.less'
import router from 'umi/router'
import bg from '@/assets/loginBGC.png'
import logo from '@/assets/logo.png'
import {Flex,InputItem,Button,Checkbox} from 'antd-mobile'

const Login = ({form,account,pwd,submit}) => (
    <div styleName="container">
        <img styleName="bg" src={bg}/>
        <div styleName="mask"></div>
        {/*<div styleName="close" onClick={this._close}></div>*/}
        <div styleName="content">
            <div styleName="logo">
                <img src={logo} alt=""/>
            </div>
            <div styleName="inputs">
                <InputItem
                    placeholder={'手机号'}
                    clear={true}
                    {...form.getFieldProps('account', {
                        initialValue:account || null,
                        rules: [{
                            required: true, message: '请输入手机号',
                        }],
                    })}
                />
                <InputItem
                    placeholder={'密码'}
                    type={'password'}
                    clear={true}
                    // extra={<span onClick={() => {router.push('/account/forget')}}>忘记密码？</span>}
                    {...form.getFieldProps('password', {
                        initialValue:pwd || null,
                        rules: [{
                            required: true, message: '请输入密码',
                        }],
                    })}
                />
                {/*<Checkbox.AgreeItem>记住密码</Checkbox.AgreeItem>*/}
            </div>
            <div styleName="submit">
                <Button type={'primary'} onClick={submit}>登录123</Button>
            </div>
            <Flex styleName="extra">
                <Flex.Item>联系客服</Flex.Item>
                <Flex.Item onClick={() => {router.push('/account/register')}}>免费注册</Flex.Item>
            </Flex>
        </div>
    </div>
)

export default CSSModules(Login,styles)
