import React from 'react';
import { useSelector } from 'react-redux'
import { Button, List, Popover, Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import styles from '../css/LoginAvatar.module.css'


function LoginAvatar(props) {
    const { isLogin } = useSelector(state => state.user)
    let loginStatus = null
    if (isLogin) {
        const content = (<List size='large' dataSource={["个人中心", "退出登录"]} renderItem={item => (
            <List.Item>{item}</List.Item>
        )}></List>)
        loginStatus = (
            <Popover content={content}  placement="bottom">
                <div className={styles.avatarContainer}>
                    <Avatar src="" size="large" icon={<UserOutlined />} />
                </div>
            </Popover>
        )

    } else {
        loginStatus = (
            <Button type='primary' size='large' onClick={props.loginHandle}>注册/登录</Button>
        )
    }


    return (
        <div>
            {loginStatus}
        </div>
    );
}

export default LoginAvatar;