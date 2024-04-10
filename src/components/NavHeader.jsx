import React from 'react';
import { NavLink } from 'react-router-dom'
import { Select,Input,Button } from "antd"

function NavHeader(props) {
    return (
        <div className='headerContainer'>
            {/* logo */}
            <div className="logoContainer">
                <div className="logo"></div>
            </div>
            {/* 导航 */}
            <nav className="navContainer">
                <NavLink to='/' className='navgation'>问答</NavLink>
                <NavLink to='/books' className='navgation'>书籍</NavLink>
                <NavLink to='/interviews' className='navgation'>面试题</NavLink>
                <NavLink to='/' className='navgation'>视频</NavLink>
                <a href="https://duyi.ke.qq.com/" className='navgation'>视频教程</a>
            </nav>
            {/* 搜索框 */}
            <div className="searchContainer">
                <Select options={[{ value: 'issue', label: <span>问答</span> }, { value: 'book', label: <span>书籍</span> }]}
                    defaultValue='issue'
                    size="large"
                    style={{width:"20%"}}
                />
                <Input.Search placeholder="请输入要搜索的内容" enterButton='搜索' size="large" allowClear style={{width: '80%'}}></Input.Search>
            </div>
            <div className="loginBtnContainer">
                <Button type='primary' size='large'>注册/登录</Button>
            </div>

        </div>
    );
}

export default NavHeader;