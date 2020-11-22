<template>
     <b-card>
        <b-card-body>
            <b-card-title>Suite Properties</b-card-title>
            <b-form>
                <b-form-group
                    id="input-group-name"
                    label="Name"
                    label-for="input-name"
                >
                    <b-form-input
                    id="input-name"   
                    :value='selectedSuite.name'
                    @keyup='debounceEdit("name", $event)'                                
                    required
                    placeholder="Name for test suite"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-baseUrl"
                    label="Base URL"
                    label-for="input-baseUrl"
                >
                    <b-form-input
                    id="input-baseUrl"
                    :value='selectedSuite.baseUrl' 
                    @keyup='debounceEdit("baseUrl", $event)'                                
                    required
                    placeholder="Base URL of application"
                    ></b-form-input>
                </b-form-group>
            </b-form>
        </b-card-body>
    </b-card>
</template>

<style scoped>
    
</style>

<script>
export default {
    name:'SuiteProperties',
    computed:{
        selectedSuite(){
            return this.$store.getters.getSelectedSuite
        }
    },
    data(){
        return{
            debounce:null
        }
    },
    methods:{
        debounceEdit:function(key, e){
            if(this.debounce){
                clearTimeout(this.debounce);
            }
            this.debounce = setTimeout(() => {
                this.selectedSuite[key] = e.target.value
                this.$store.commit('editTestSuite', this.selectedSuite);
            }, 300);
        }
    }
}
</script>