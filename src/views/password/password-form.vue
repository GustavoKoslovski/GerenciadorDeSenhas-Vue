<template class="cadastroPassword">
    <div>
       <div style="display: inline">
                        <div class="column is-size-3" v-if="model==='detalhar'" >
                            <h1>Detalhes do Password</h1>
                        </div>
                        <div class="column is-size-3" v-if="model!='detalhar' && model!= 'editar'" >
                            <h1>Cadastro de Password</h1> 
                        </div>
                        <div class="column is-size-3" v-if="model==='editar'" >
                            <h1>Edição de Password</h1> 
                        </div>

         <div class="columns" v-if="notification.ativo">
        <div class="column is-12">
            <div :class="notification.classe">
                <button @click="onClickFecharNotificacao()" class="delete" ></button>
                {{ notification.mensagem }}
            </div>
        </div>
    </div>

    <div class="columns">
        
    </div>
        <div class=" formulario">
                <div>
                    <label class="label"><p>Url: </p></label>
                    <input class=" input is-link" type="text" v-model=" password.url " placeholder="URL" style="width: 220px; height: 30px;" :disabled="model==='detalhar'">
                </div>
                <div>
                    <label class="label"><p>Senha: </p></label>
                    <input class=" input is-link" type="text" v-model=" password.senha " placeholder="Senha" style="width: 220px; height: 30px;" :disabled="model==='detalhar'">
                </div>
                <div>
                    <label class="label"><p>Descrição: </p></label>
                    <input class=" input is-link" type="text" v-model=" password.descricao " placeholder="Descrição" style="width: 220px; height: 30px;" :disabled="model==='detalhar'">
                </div>
                <div class="margembutton">
                     <div class="linha4 column" style="display:flex; margin-top:10px;">
                        <div class="opcoes column" v-if="model!='detalhar' && model!= 'editar'">
                            <a href="/" class="button is-link">Voltar</a>
                            <button class="button is-primary" @click="onClickCadastrar()" >Salvar</button>
                        </div>
                        <div class="opcoes column" v-if="model==='detalhar'">
                            <a href="/" class="button is-link">Voltar</a>
                            <button class="button is-warning" @click="onClickPaginaEditar(password.id)">Editar</button>
                            <a :href="'/'"><button @click="onClickDeletar()" class="button is-danger"> Excluir</button> </a>
                        </div>
                        <div class="opcoes column" v-if="model==='editar'">
                            <a href="/" class="button is-link">Voltar</a>
                            <button class="button is-primary" @click="onClickSalvarAlteracao()">Salvar Alterações</button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </div>
</template>


<style lang="scss">

@import "~bulma/bulma.sass";

.cadastro{
    display: flex;
    align-items: center;
    width: 500px;
}

.cadastro{
    display: flex;
    align-items: center;
    width: 500px;
}

</style>



<script lang="ts">
    import { Vue } from 'vue-class-component'
    import { Prop } from 'vue-property-decorator'

    import { Password } from '@/model/password'
    import { Notification } from '@/model/notification'
    import { PasswordClient } from '@/client/password.client'


    export default class PasswordForm extends Vue {

        public passwordClient!: PasswordClient
        public password : Password = new Password()
        public notification : Notification = new Notification()
    
        @Prop({ type: Number, required: false })
        public readonly id!: number

        @Prop({ type: String, default: false })
        public readonly model!: string

        public mounted(): void {
            this.passwordClient = new PasswordClient()
            this.carregarPassword()

            console.log(this.id)
            console.log(this.model)
        }
        
        public onClickCadastrar(): void {
            
            this.passwordClient.cadastrar(this.password)
                .then(
                success => {
                    this.notification = this.notification.new(true, 'notification is-success', 'Senha cadastrada com sucesso!!!')
                    this.onClickLimpar()
                }, error => {
                    this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
                    this.onClickLimpar()
                })
        }

        public onClickPaginaEditar(idPassword: number){
            this.$router.push({ name: 'password-editar', params: { id: idPassword, model: 'editar' } })
        
        }

        public onClickSalvarAlteracao(): void {
            this.passwordClient.editar(this.password).then(success => {
            this.notification = this.notification.new(true, 'notification is-success', 'password foi Editado com sucesso!')
            }, error => {
            this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
            })
        }

        public carregarPassword(): void{
                this.passwordClient.findById(this.id).then(value => {
                this.password = value
                console.log("password" + value)
                }).catch(error => {
                    console.log(error)
                })
            
        }

    public onClickDeletar(): void {
    this.passwordClient.deletar(this.password).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'A senha foi excluida com sucesso')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger',
          'Error: ' + error)
    })
  }

    
        public onClickFecharNotificacao(): void {
            this.notification = new Notification()
        }

        public onClickLimpar(): void {
            this.password = new Password()
        }

    }
</script>