<template>
  <div id="app">
    <AppBar />
    <div class='page-body'>
      <SideBar />
      <Page />
    </div>
    
  </div>
</template>

<style scoped>
  .page-body{
    display:flex;
    height:100%;
  }
</style>

<script>
import SideBar from './components/SideBar';
import Page from './components/Page';
import AppBar from './components/AppBar';

export default {
  name: 'App',
  components: {
    SideBar,
    Page,
    AppBar
  },
  async beforeMount(){
    console.log('AHHHHHH')
    fetch('http://localhost:9090/test-suites', {method:'get'})
      .then(res => {
        console.log('res.json()')
        return res.json()
      })
      .then((res) => {
        console.log('AHH')
        console.log(res);
        this.$store.commit('setTestSuites', res.testSuites);
      })
    this.$store.commit
  }
}
</script>


