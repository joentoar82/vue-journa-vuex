<template>
  <Navbar/>
  <template v-if="isLoading">
    <div class="row justify-content-md-center">
      <div class="clo-3 alert-info text-center mt-5">
        Espere por favor...
        <h3 class="mt-2">
          <i class="fa fa-spin fa-sync"></i>
        </h3>
      </div>
    </div>
  </template>

  <div v-else class="d-flex">
    <div class="col-4">
      <EntryList/>
    </div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import { defineAsyncComponent } from '@vue/runtime-core'
import { mapActions, mapState } from 'vuex'

export default {

  computed:{
    ...mapState('journal', ['isLoading'])
  }, 
  components:{    
    Navbar: defineAsyncComponent(() => import('@/modules/daybook/components/Navbar.vue')),
    
    EntryList: defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'))
  },
  methods:{
    ...mapActions('journal', ['loadEntries'])
  },
  created(){
    this.loadEntries()
  }
}
</script>

