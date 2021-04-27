<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info" >
            <b-navbar-brand href="#">AppStock</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="#">
                        <router-link to="/products" class="nav-link">PRODUCTS</router-link>
                    </b-nav-item>
                    <b-nav-item href="#">
                        <router-link to="/addProduct" class="nav-link">ADDPRODUCT</router-link>
                    </b-nav-item>
                </b-navbar-nav>
            <!-- Right aligned nav items -->
                <div v-if="!currentUser" class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <router-link to="/register" class="nav-link">
                        <font-awesome-icon icon="user-plus" />Sign Up
                    </router-link>
                    </li>
                    <li class="nav-item">
                    <router-link to="/login" class="nav-link">
                        <font-awesome-icon icon="sign-in-alt" />Login
                    </router-link>
                    </li>
                </div>
                <div v-if="currentUser" class="navbar-nav ml-auto">
                    <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                        <font-awesome-icon icon="user" />
                        {{ currentUser.username }}
                    </router-link>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href @click.prevent="logOut">
                        <font-awesome-icon icon="sign-out-alt" />LogOut
                    </a>
                    </li>
                </div>
            </b-collapse>
    </b-navbar>
    <div class="container">
      <router-view />
    </div>
</div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
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
.bg-info{
  background-color:#1161ee !important;
}
</style>