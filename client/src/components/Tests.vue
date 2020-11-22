<template>
    <b-card>
        <b-card-body>
            <b-card-title>Tests</b-card-title>
            <b-list-group>
                <b-list-group-item v-for='(test, index) in selectedSuite.testEntries' :key='index'>
                    <h3 v-b-toggle='index.toString()'>{{test.name}}</h3>
                    <b-collapse :id='index.toString()'>
                        <b-form>
                            <div class='environment-row'>
                                <b-form-checkbox @change='debounceEdit("active", $event, index)' v-model='test.active'>Active</b-form-checkbox>
                                <i @click='deleteTestEntry(index)' class="fas fa-trash"></i>
                            </div>
                            <b-form-group label='Name'>
                                <b-form-input @keyup='debounceEdit("name", $event, index)' required :value='test.name' placeholder='e.g. Home Page'></b-form-input>
                            </b-form-group>
                            <b-form-group label='Path'>
                                <b-form-input @keyup='debounceEdit("path", $event, index)' required :value='test.path' placeholder='e.g. /'></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input @keyup='debounceEdit("script", $event, index)' required :value='test.script' placeholder='e.g. navigateAndScreenshot'></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-collapse>
                </b-list-group-item>
                
                <b-button @click='addTestEntry'>Add Test</b-button>

            </b-list-group>
        </b-card-body>
    </b-card>
</template>

<style scoped>
    .environment-row{
        display:flex;
        align-items: center;
        justify-content: space-between;
        margin-top:5px;
        margin-bottom: 5px;
    }
    .environment-row i{
        font-size:20px;
    }
</style>

<script>
export default {
    name:'Tests',
    computed:{
        selectedSuite(){
            return this.$store.getters.getSelectedSuite;
        }
    },
    data(){
        return{
            debounce:null 
        }
    },

    methods:{
        debounceEdit:function(key, e, index){
            if(this.debounce){
                clearTimeout(this.debounce);
            }
            this.debounce = setTimeout(() => {
                this.selectedSuite.testEntries[index][key] = e.target ? e.target.value : e;
            }, 300);
        },
        deleteTestEntry(index){
            this.selectedSuite.testEntries = this.selectedSuite.testEntries.filter((val, i) => i !== index);
        },
        addTestEntry(){
            this.selectedSuite.testEntries = [...this.selectedSuite.testEntries, {name:'New Test', path:'', script:'', active: false}]
        }
    }
}
</script>