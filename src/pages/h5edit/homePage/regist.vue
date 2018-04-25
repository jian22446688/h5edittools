<template>
    <div class="loginbg">
        <div class="regith-container">
            <Card>
                <div style="text-align: left; padding: 20px">
                    <div class="login-title">
                        <span @click="$router.push('/');"><strong>编辑工具</strong></span>
                    </div>
                    <div class="login-page-name">
                        <span ><strong>注册</strong></span>
                        <div style="display: inline; float: right;">
                            <span>已经有账户?</span><a @click="$router.push('/login');" style="color: #2d8cf0">登录</a>
                        </div>
                    </div>
                    <div style="margin-top: 16px">
                        <Form  label-position="top" ref="formValue" :model="formValue" :rules="ruleValidate" >
                            <FormItem label="用户名" prop="userName">
                                <Input v-model="formValue.userName" size="large"></Input>
                            </FormItem>
                            <FormItem prop="email">
                                <template slot="label">
                                    <label>邮箱</label>
                                    <Tooltip content="使用邮箱找回密码" placement="top">
                                        <Icon type="ios-help-outline"></Icon>
                                    </Tooltip>
                                </template>
                                <Input v-model="formValue.email" size="large"></Input>
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input v-model="formValue.password" size="large"  type="password"></Input>
                            </FormItem>
                            <FormItem label="确认密码" prop="passwdCheck">
                                <Input v-model="formValue.passwdCheck" size="large"  type="password"></Input>
                            </FormItem>
                            <FormItem label="验证码" prop="authCode">
                                <Row>
                                    <Col span="16">
                                        <Input v-model="formValue.authCode" style="display: inline-block" size="large"></Input>
                                    </Col>
                                    <Col span="8">
                                        <img width="100%" height="100%" :src="varifyimg" @click="$store.dispatch('getVarifyCodeImg')" alt="122x36">
                                    </Col>
                                </Row>
                            </FormItem>
                            <Button type="primary" size="large" @click="onRegist('formValue')" long>立即注册</Button>

                        </Form>
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
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formValue.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValue.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formValue.password) {
                    callback(new Error('两次密码输入不正确'));
                } else {
                    callback();
                }
            };
            return {
                text: '<Icon type="help-circled"></Icon>',
                formValue: {
                    userName: '',
                    password: '',
                    passwdCheck: '',
                    email: '',
                    authCode: '',
                },
                ruleValidate: {
                    userName: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                    email:[
                        { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱地址不正确', trigger: 'blur' }
                    ],
                    password: [ {required: true, validator: validatePass, trigger: 'blur' }],
                    passwdCheck: [ {required: true, validator: validatePassCheck , trigger: 'blur'} ],
                    authCode: [ { required: true, message: '验证码不能为空', trigger: 'blur' } ],
                }
            }
        },
        computed: {
            varifyimg(){
                return this.$store.state.user.varifyimg
            }
        },
        created() {
        },
        mounted() {
            this.$store.dispatch('getVarifyCodeImg')
        },
        methods: {
            //点击注册按钮
            onRegist(name){
                console.log(name)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // TODO
                        let param = {
                            name: this.formValue.userName,
                            password: this.formValue.password,
                            email: this.formValue.email,
                            vercode: this.formValue.authCode
                        }
                        this.$store.dispatch('register', param)
                    }
                })
            },
            ontese(){
                this.$axios.get('/api/users/verifica/'+ this.formValue.authCode).then(function (res) {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "./login.less";
</style>
