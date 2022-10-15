<template>
    <div class="column is-12 menu-top">
    </div>
    <div class="column is-12 conteudo">
      <router-view> </router-view>
    </div>

</template>

<style lang="scss">
  @import "~bulma/bulma.sass";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .conteudo {
    background: #8282866e;
    //margin-top: 30px;
    padding-right: 30px;
    justify-content: center;
  }

  .menu-top{
    background: hsl(0, 0%, 29%);
    padding: 30px;
    color: white;
  }
</style>
