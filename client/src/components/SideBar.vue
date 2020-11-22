<template>
        <div class='sidebar bg-light'>
            <b-list-group flush>
                <b-list-group-item v-for='(testSuite) in testSuites' :key='testSuite.id' button variant='dark' @click='selectTestSuite(testSuite.id)'>{{testSuite.name}}</b-list-group-item>
                <b-button @click='createTestSuite' squared class='add-suite-button' variant='dark'>
                    <i class="fas fa-plus-square"></i>
                    <span>Create</span>
                </b-button>
            </b-list-group>
        </div>
</template>

<style scoped>
    .sidebar{
        width:20%;
        border-right: 2px solid darkslategray;
        height:100%;
    }

    .add-suite-button{
        display:flex;
        align-items:center;
    }
    .add-suite-button i{
        margin-right: 5px;
    }
    .add-suite-button i, .add-suite-button span{
        font-size:24px;
    }
</style>

<script>
export default {
    name:'SideBar',
    computed:{
        testSuites(){
            return this.$store.getters.getTestSuites
        }
    },
    methods:{
        createTestSuite:function(){
            this.$store.commit('createTestSuite')
        },
        selectTestSuite:function(id){
            this.$store.commit('selectSuite', id)
        }
    }
}
</script>