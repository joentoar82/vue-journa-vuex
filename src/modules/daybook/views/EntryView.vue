<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
            </div>
            <div>

                <input 
                    type="file"
                    @change="onSelectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpeg"
                >

                <button
                    v-if="entry.id" 
                    class="btn btn-danger mx-2"
                    @click="onDeleteEntry"
                >
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                
                <button 
                    class="btn btn-primary" 
                    @click="onSelectImage"
                >
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>

            </div>
        </div>
    
        <hr>
    
        <div class="d-flex flex-column px-3 h-75">
            <textarea 
                placeholder="¿Qué sucedió hoy?"
                v-model="entry.text"
            >
            </textarea>
        </div>

        <img 
            v-if="entry.picture && !localImage"
            :src="entry.picture" 
            alt="entry-picture" 
            class="img-thumbnail"
        >

        <img 
            v-if="localImage"
            :src="localImage" 
            alt="entry-picture" 
            class="img-thumbnail"
        >

    </template>

    <Fab 
        icon="fa-save" 
        @on:click="saveEntry"
    />


</template>

<script>

import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {

    props:{
        id:{
            type: String,
            required: true
        }
    },
    components:{
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data(){
        return{
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed:{
        ...mapGetters('journal', ['getEntryById']),
        day(){
            const { day } = getDayMonthYear( this.entry.date )
            return day
        },
        month(){
            const { month } = getDayMonthYear( this.entry.date )
            return month
        },
        yearDay(){
            const { yearDay } = getDayMonthYear( this.entry.date )
            return yearDay
        }
    },
    methods:{
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        
        loadEntry(){
            
            let stateEntry

            if ( this.id === 'new' ){
                stateEntry = {
                    text : '',
                    date : new Date().getTime() 
                }
            } else {
                stateEntry =  this.getEntryById(this.id)
                // console.log(entry)  
                if( !stateEntry ) return this.$router.push( {name: 'no-entry'} )
            }
            
            this.entry = stateEntry

        },
        async saveEntry(){
            //sweetAlert2
            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false
            })
            Swal.showLoading()

            const picture = await uploadImage( this.file )
            // console.log(picture)
            this.entry.picture = picture

            // console.log(this.entry);
            if( this.entry.id ){
                await this.updateEntry(this.entry)
            } else {
                const idEntry = await this.createEntry(this.entry)
                this.$router.push({ name: 'entry', params: { id : idEntry } })
            }

            this.file = null  //purgar imagen - no quede pegada
            //sweetAlert2
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')

        },
        async onDeleteEntry(){

            const { isConfirmed } = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Sí, estoy seguro'
            })

            if( isConfirmed ){
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                
                await this.deleteEntry(this.entry.id)
                this.$router.push({name: 'no-entry'})

                Swal.fire('Eliminado', '', 'success')
                
            }

        },

        onSelectedImage( event ){
            
            const file = event.target.files[0]
            
            if( !file ){
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            //FileReader() = objeto con el único porpósito de leer datos desde objetos de tipo Blob (por lo tanto File también)
            const fr = new FileReader()  //instanciando FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )

        },
        //método que permite usar el input/file por referencia
        onSelectImage() {
            this.$refs.imageSelector.click()
        }
    },
    created(){
        // console.log(this.id);
        this.loadEntry()
    },
    watch:{
        id(){
            this.loadEntry()
        }
    }

}
</script>

<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }
}
img{
    width: 300px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>