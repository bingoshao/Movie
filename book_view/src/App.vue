<template>
  <div id="app">
    <Header :title="title"/>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from 'components/common/header.vue'
export default {
  name: 'app',
  components: {
    Header,
  },
  data(){
    return {
      title:'movie'
    }
  },
  created() {
  }
}
</script>

<style style="less">

</style>
