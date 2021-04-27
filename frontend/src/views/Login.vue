<template>
<div class="row login-wrap">
	<div class="login-html">
  <div class="col-md-12">
    <div class="card card-container cardlogin">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card "
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group ">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            class="form-control formlogin"
            name="username"
          />
          <div
            v-if="errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >Username is required!</div>
        </div>
        <div class="form-group ">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control formlogin"
            name="password"
          />
          <div
            v-if="errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >Password is required!</div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block loginbtn" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>
  </div>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/profile');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
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

.formlogin,.loginbtn
{
  color:#fff !important;
	display:block !important;
	border:none !important;
	/*padding:15px 20px !important;*/
  border-radius:25px !important;
	background:rgba(255,255,255,.1) !important;
}
label {
  width:100%;
	display:block;
  margin-top: 0px;
  color:#aaa;
	font-size:12px;
}
.loginbtn{
  margin-top: 40px !important;
	background:#1161ee !important;
}
.cardlogin.card {
  max-width:510px !important;
	min-height:510px !important;
  padding: 10px 10px;
}

.card {
  background-color:transparent  !important;
  padding: 20px 25px 30px  !important;
  margin: 0 auto 30px  !important;  
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 45px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  
}
.col-md-12{
  padding-left: 0em !important;
  padding-right: 0em !important;
}
.alert {
  padding: 0em !important;
}
</style>