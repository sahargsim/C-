<template>
<div class="row login-wrap">
	<div class="login-html">
        <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card "
        />
        <div class="jumbotron">
            <h3 class="title">
                <strong>{{currentUser.username}}</strong>
            </h3>
            <p class="title1">
                {{currentUser.email}}
            </p>
            <p class="title1" v-for="(role,index) in currentUser.roles" :key="index">{{role}}</p>  
            <button class="btn btn-primary btn-block" @click.prevent="logOut">
                <span class="spinner-border spinner-border-sm"></span>
                <font-awesome-icon icon="sign-out-alt" />
                <span>LogOut</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
   methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.login-wrap{
  margin-top: 80px;
	width: 100%;
  margin-left: auto;
  margin-right: auto;
	max-width:440px;
	min-height:510px;
	position:relative;
	background:url(https://maxcdn.icons8.com/app/uploads/2016/03/material-1-1000x563.jpg) no-repeat center;
	background-size: cover;
	box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
}
.login-html{
	width:100%;
	height:100%;
	position:absolute;
	/*padding:0px 10px 10px 0px;*/
	background:rgba(0,0,0,0.5);
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin-top: 30px  !important;
  margin: 0 auto 0px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  
}
.jumbotron{
    background-color: transparent !important;
}
.title {
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:30px;
  text-align: center;
  letter-spacing: 0.4cm;
  text-transform: uppercase;
}
.title1 {
    width:100%;
	display:block;
    margin-top: 30px;
    color:#aaa;
	font-size:12px;
    text-align: center;
}
.btn{
  margin-top: 40px !important;
	background:#1161ee !important;
  border-radius:25px !important;
}
</style>