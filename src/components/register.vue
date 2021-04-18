<template>
    <div>注册
        <form>
            <form prop="email"><input v-model="ruleForm.email" type="text" class="register-item" placeholder="邮箱"></form>
            <form><input v-model="ruleForm.name" type="text" class="register-item" placeholder="PCR账号名" name="" ></form>
            <form><input v-model="ruleForm.password" type="password" class="register-item" placeholder="密码" name="" ></form>
            <form><input v-model="ruleForm.passwordAgain" type="password" class="register-item" placeholder="再次输入密码" name="" ></form>
            <form><input v-model="digitalStr" v-on:input="varifyCaptcha()" type="text" placeholder="验证码"></form>
            <img :src="this.captchaImg" alt="captcha" @click="getCaptchaImg()" title="点击刷新验证码">
            <button @click="getCaptcha()" :disabled="this.sendRegisterVerifyEmail">获取邮件验证码</button>
            <form><input v-model="ruleForm.emailVerifyNumber" type="text" placeholder="邮件验证码"></form>
            <form class="licenseAccept"><input type="checkbox" :checked='licenseAccept' @click="setLicenseAccept()"></form><p>我同意使用条款和用户协议</p>
            <button @click="submitForm()">注册</button><button @click="clearAll()">清空</button>
        </form>
        <a href="#/login">已经注册？点击登录</a>
    </div>
</template>
<script>
import api from '../api'
export default {
    name: 'register',
    created:function(){
        this.getCaptchaImg();
    },
    data(){
        return{
            licenseAccept: false,
            sendRegisterVerifyEmail: true,
            captchaImg: '',
            captcha: {
                ID: ''
            },
            digitalStr: '',
            ruleForm: {
                email: '',
                name: '',
                password: '',
                passwordAgain: '',
                // captcha: '',
                emailVerifyNumber: ''
            },
        }
    },
    methods:{
        setLicenseAccept(){
            this.licenseAccept = !this.licenseAccept
        },
        varifyCaptcha(){
            if(this.digitalStr.length == 6){
                api.post('/api/public/verifyCaptcha', {
                    ID: this.captcha.ID,
                    digitalStr: this.digitalStr
                }).then((res) => {
                    console.log('ID==',this.captcha.ID)
                    console.log('digitalStr==', this.digitalStr)
                    console.log(res)
                    if(res.data.code === 1){
                    this.sendRegisterVerifyEmail = false
                    } else {
                        alert("验证失败，请点击验证码刷新重试")
                    }
                })
            }
        },
        getCaptchaImg(){
            api.get('/api/public/getCaptcha').then((res) => {
                this.captchaImg = res.data.captcha.img
                this.captcha.ID = res.data.captcha.ID
                console.log("captchaID==", this.captcha.ID)
            })
        },
        getCaptcha(){
            api.get(`/api/user/sendRegisterVerifyEmail?email=${this.ruleForm.email}`)
        },
        submitForm(){
            console.log("submit")
            if (this.licenseAccept == false){
                alert("You need to accept the license and terms first")
            } else {
                api.post('/api/user/register', {
                email: this.ruleForm.email,
                name: this.ruleForm.name,
                password: this.ruleForm.password,
                passwordAgain: this.ruleForm.passwordAgain,
                verifyNumber: this.ruleForm.emailVerifyNumber
            }).then((res) => {
                console.log("register submit res==", res)
                if(res.data.code == 1){
                    alert("注册成功")
                    // this.$router.push('/login')
                }else{
                    alert(`注册失败` + `${res.data.message}`)
                    // this.message.error(res.data.message)
                }
            })
            }
        },
        clearAll(){
            this.ruleForm.email="";
            this.ruleForm.name="";
            this.ruleForm.password="";
            this.ruleForm.passwordAgain=""
            this.ruleForm.emailVerifyNumber="";
        }
    }
}
</script>
<style>
.register-item{
    display: block;
}
.licenseAccept{
    display: inline;
}
</style>