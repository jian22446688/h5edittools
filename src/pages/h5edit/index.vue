<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "./index";
</style>
<template>
  <div class="layout" style="width: 100%;">
    <Layout>
      <Header class="c-header-zindex">
        <Menu @on-select="onMenuChange" mode="horizontal" :active-name="curActiveName">
          <div class="layout-logo">
            <span>制作工具</span>
          </div>
          <div class="layout-nav">
            <MenuItem name="/">
              <Icon type="ios-navigate"></Icon>
              首页
            </MenuItem>
            <MenuItem name="/template">
              <Icon type="ios-keypad"></Icon>
              推荐模板
            </MenuItem>
            <MenuItem name="/aoute">
              <Icon type="ios-keypad"></Icon>
              关于介绍
            </MenuItem>
            <div class="right-btn">
              <Dropdown @on-click="onUserMenuChange" trigger="click" style="margin-left: 20px">
                <a href="javascript:void(0)">{{ getUsername }}<Icon style="margin-left: 6px;" type="arrow-down-b"></Icon></a>
                <DropdownMenu slot="list">
                  <DropdownItem name="userinfo">个人作品</DropdownItem>
                  <DropdownItem name="outing" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <div class="cc-display-inbl" style="display: none">
                <Button type="primary" shape="circle">注册</Button>
                <Button type="primary" shape="circle">登录</Button>
              </div>
            </div>
          </div>
        </Menu>
      </Header>
      <Content :style="{background: '#fff', paddingTop: '64px', minHeight: '800px'}">
        <router-view></router-view>
      </Content>
      <BackTop :height="100"></BackTop>
      <Footer class="layout-footer-center">2018-2018 &copy; Cary</Footer>
    </Layout>
  </div>
</template>


<script>
  export default {
    name: "HelloWorld",
    data() {
      return {
        curActiveName: '/',
        userName: '用户aaaabcd',
      };
    },
    computed: {
      getUsername(){
        return this.userName;
      }
    },
    mounted(){

    },

    methods: {
      //首页顶部菜单点击切换时间
      onMenuChange(name){
        this.curActiveName = name;
        this.$router.push(name);
      },
      //用户UserMenu 点击事件
      onUserMenuChange(name){
        if(name == 'userinfo'){
          this.curActiveName = "";
          this.$router.push('/usertheme');
        }else if(name == 'outing'){
          this.$Modal.confirm({title: "提示",content: "是否退出登录？？？",
            onOk: () => {
              this.$Message.success('成功退出登录');
            }
          })
        }
      },
      modalOkEvent(){
        setTimeout(()=>{
          this.isOuting = false;
        }, 2000)
      },
    }

  };
</script>


