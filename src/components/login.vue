<template>
    <div class="login">
        登录
            <form ><input type="text" v-model="ruleForm.email" class="login-item" placeholder="邮箱"></form>
            <form><input type="password" v-model="ruleForm.password" class="login-item" placeholder="密码" name="" id=""></form>
            <button @click="submitForm()">登录</button>
            <button @click="clearAll()">清空</button>
            <a href="#">忘记密码?</a>
        <a href="#/register">还没有账号？点击注册</a>
    </div>
</template>
<script>
import api from '../api'
export default {
    name: 'login',
    data(){
        return{
            ruleForm: {
                email: '',
                password: '',
            }
        }
    },
    methods:{
        submitForm(){
            console.log("login")
            api.post('/api/user/login/', {
                email: this.ruleForm.email,
                password: this.ruleForm.password
            }).then()
        },
        clearAll(){
            this.ruleForm.email=""
            this.ruleForm.password=""
        }
    }
}
</script>
<style>
.login-item{
    display: block;
}
</style>