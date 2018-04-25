<template>
    <div class="loginbg">
        <div class="regith-container">
            <Card>
                <div style="text-align: left; padding: 20px">
                    <div class="login-title">
                        <span @click="$router.push('/');"><strong>编辑工具</strong></span>
                    </div>
                    <div class="login-page-name">
                        <span ><strong>登录</strong></span>
                    </div>
                    <div style="margin-top: 16px">
                        <Form  label-position="top" ref="formValue" :model="formValue" :rules="ruleValidate" >
                            <FormItem label="用户名" prop="userName">
                                <Input v-model="formValue.userName" size="large"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input v-model="formValue.password" size="large"  type="password"></Input>
                            </FormItem>
                            <FormItem size="large" label="验证码" prop="authCode">
                                <Row>
                                    <Col span="16">
                                        <Input v-model="formValue.authCode" style="display: inline-block" size="large"></Input>
                                    </Col>
                                    <Col span="8">
                                        <img width="100%" height="100%" :src="varifyimg" @click="$store.dispatch('getVarifyCodeImg')" alt="122x36">
                                    </Col>
                                </Row>
                            </FormItem>
                            <Button class="login-input" type="primary" size="large" @click="onLogin('formValue')" long>登录</Button>
                        </Form>
                        <div style="margin-top: 16px; margin-left: 8px; margin-right: 8px">
                            <span>还没有账户?</span>
                            <a @click="$router.push('/regist');" style="color: #2d8cf0">立即注册</a>
                            <a @click="resetPass" style="color: #2d8cf0; float: right;">忘记密码</a>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
    export default {
        name: "login",
        props: [],
        data(){
            const validateName = (rule, value, callback) => {
                if (value === '') { callback(new Error('请输入账号'));
                }else {
                    callback()
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') { callback(new Error('请输入密码'));
                }else {
                    callback()
                }
            };
            const validateCode = (rule, value, callback) => {
                if (value === '') { callback(new Error('请输入验证码'));
                }else {
                    callback()
                }
            };
            return {
                formValue: {
                    userName: '',
                    password: '',
                    authCode: '',
                },
                ruleValidate: {
                    userName: [ { validator: validateName, } ],
                    password: [ { validator: validatePass,} ],
                    authCode: [ { validator: validateCode, } ],
                }
            }
        },
        computed: {
            varifyimg(){
                return this.$store.state.user.varifyimg
            },
        },
        created() {
        },
        mounted() {
            this.$store.dispatch('getVarifyCodeImg')
        },
        methods: {
            //点击登录按钮
            onLogin(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // TODO
                        let par = {
                            name: this.formValue.userName,
                            password: this.formValue.password,
                            vercode: this.formValue.authCode
                        }
                        this.$store.dispatch('login', par).then(res => {
                            console.log("activ 返回的数据")
                            console.log(res);
                        }).catch(err => {

                        })
                    }
                })
            },
            resetPass(){
                // this.$store.commit('test', 'cary');
                // this.$root.reload()

                console.log(window.localStorage.getItem('userInfo'));

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "./login.less";
</style>
