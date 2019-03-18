<template>

  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <!--<img src="../../static/img/icons/telocam-icon.jpg" class="rounded-circle" width="50" height="50" alt="">-->
    </a>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-secondary">Profile</button>
      <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuProfile">
        <a class="dropdown-item" href="#">Profile</a>
        <a class="dropdown-item" href="#">Wish list</a>
        <a class="dropdown-item" href="#">Settings</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Sign out</a>
      </div>
      <router-link type="button" class="btn btn-secondary" to="LogIn">Log In</router-link>
      <router-link type="button" class="btn btn-secondary" to="Sign">Sing Up</router-link>
      <router-link type="button" class="btn btn-secondary" to="Hello" textMsg="Holaaaa">Home</router-link>
      <router-link type="button" class="btn btn-secondary" to="About">About</router-link>
    </div>

  </nav>
</template>

<script>
    export default {
        name: "Header",
      data() {
          return {
            picture : '../static/img/icons/safari-pinned-tab.svg'
          }
      }

    }
</script>

<style>
  .header {
    background: #333;
    color: #fff;
    //text-align: center;
    padding: 10px;
  }
  .header a {
    color: #fff;
    padding-right: 5px;
    text-decoration: none;
  }
</style>
