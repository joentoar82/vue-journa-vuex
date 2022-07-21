<template>
  <div class="entry-container mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id:10}})">
    <!-- title -->
    <div class="entry-title d-flex">
        <span class="text-success fs-5 fw-bold">15</span>
        <span class="mx-1 fs-5">Julio</span>
        <span class="mx-2 fw.light">2021, jueves</span>
    </div>
    <div class="entry-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut minus laboriosam quo eos, commodi vel ea laborum sint, perspiciatis, placeat nostrum. Nostrum assumenda ut dolor, cumque repellat rerum error repudiandae?
        Ut ullam iure aliquam dolorem accusantium. Dicta fuga, exercitationem earum repellat numquam qui quisquam accusamus consequuntur ipsum asperiores pariatur, quas assumenda ducimus culpa optio consectetur laborum ex sapiente provident officia!
        Reiciendis eaque aperiam impedit qui laboriosam, corrupti quas accusamus esse aliquid possimus ipsum dolorum, asperiores eveniet! Reiciendis, dolore reprehenderit modi labore fuga animi nobis odit quo consectetur earum facere maxime.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.entry-container{
    
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }

    .entry-description{
        font-size: 12px;
    }
}

</style>