<template>
    
  <div class="columns">
    <div class="column is-12 is-size-3">
      Lista de Senhas
    </div>
  </div>
    
  <hr />

  <div class="columns">
    <div class="column is-9">
      <input class="input" type="filtro" placeholder="Nome da Password">            
    </div>
    <div class="column is-3">
      <a :href="'/password/formulario'" class="button is-info is-fullwidth">Cadastrar</a>
    </div>
  </div>

  <hr />

  <table class="table table is-fullwidth">
    <thead class="green">
      <tr style="background: hsl(141, 53%, 53%);">
        <th style="color: #fff;">ID</th>
        <th style="color: #fff;">URL</th>
        <th style="color: #fff;">Senha</th>
        <th style="color: #fff;">Descricao</th>
        <th style="color: #fff;">Opções</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in passwordList" :key="item.id">
        <th>{{ item.id }}</th>
        <th>{{ item.url }}</th>
        <th>{{ item.senha }}</th>
        <th>{{ item.descricao }}</th>
        <th> <button @click="onClickPaginaDetalhar(item.id)" class="button is-small is-success espaco"><img id="olho" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDUlEQVQ4jd2SvW3DMBBGbwQVKlyo4BGC4FKFS4+TATKCNxAggkeoSpHSRQbwAB7AA7hQoUKFLH6E2qQQHfgHdpo0yQHX8T3exyPR/ytlQ8kOhgV7FvSx9+xglA3lM3DBgh0LPn/onbJhcQ0bv2SHlgVgQa/suFHVkCg7bm5gzB2OyvjlDFdDcoa19etZMN8Qp7oUDPEM2KFV1ZAQO2zPMBERO7Ra4JQNpRa4K4FDS0R0IdneCbQLb4/zh/c7QdH4NL40tPXrovFpjHQr6PJ6yr5hQV80PiUiIm1OKxZ0LICS8TWvpyyOf2DBQQtcXk8Zi3+JcKfNafVsjZ0WfGgJlZZQxZjdwzX+ykf6u/UF0Fwo5Apfcq8AAAAASUVORK5CYII="/>
              </button>
              </th>
        
      </tr>
    </tbody>
  </table>

</template>


<style lang="scss">

@import "~bulma/bulma.sass";

.espaco{
    margin-right: 6px;
  }



</style>

<script lang="ts">
  import { Vue } from 'vue-class-component';
  import { Password } from '@/model/password'
  import { PasswordClient } from '@/client/password.client'
  import { PageRequest } from '@/model/page/page-request'
  import { PageResponse } from '@/model/page/page-response'

  export default class PasswordList extends Vue {

    public passwordList: Password[] = []
    public passwordClient!: PasswordClient
    public pageRequest: PageRequest = new PageRequest()
    public pageResponse: PageResponse<Password> = new PageResponse()

    public mounted(): void {
      this.passwordClient = new PasswordClient()
      this.listarPassword()
    }

    private listarPassword(): void {
  
    this.passwordClient.listar()
        .then(  
            async success => {
              this.passwordList = await success
            },
            error => console.log(error)
        )
    }
    public onClickPaginaDetalhar(idPassword: number){
      this.$router.push({ name: 'password-detalhar', params: { id: idPassword, model: 'detalhar' } })
    }


  }
</script>