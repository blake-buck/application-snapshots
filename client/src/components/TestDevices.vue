<template>
    <b-card>
        <b-card-body>
            <b-card-title>Test Devices</b-card-title>

            <div>
                <h4>Chromium</h4>
                <b-list-group>
                    <b-list-group-item v-for='(device, index) in selectedSuite.testDevices.chromium' :key='index'>
                        
                        <h3 v-b-toggle='"tdc" + index.toString()'>{{device.name}}</h3>

                        <b-collapse :id='"tdc" + index.toString()'>
                            <b-form>
                                <div class='environment-row'>
                                    <b-form-checkbox @keyup='debounceEdit("active", $event, index, "chromium")' v-model='device.active'>Active</b-form-checkbox>
                                    <i @click='deleteTestDevice(index, "chromium")' class="fas fa-trash"></i>
                                </div>

                                <b-form-group label="Name">
                                    <b-form-input @keyup='debounceEdit("name", $event, index, "chromium")' required placeholder="e.g. Pixel 2" :value='device.name'></b-form-input>
                                </b-form-group>

                                <b-form-group label="Screen width">
                                    <b-form-input @keyup='debounceEdit("width", $event, index, "chromium")' required placeholder="e.g. 1400" :value='device.width'></b-form-input>
                                </b-form-group>

                                <b-form-group label="Screen height">
                                    <b-form-input @keyup='debounceEdit("height", $event, index, "chromium")' required placeholder="e.g. 1024" :value='device.height'></b-form-input>
                                </b-form-group>
                            </b-form>
                        </b-collapse>
                    </b-list-group-item>

                    <b-button @click='addDevice("chromium")'>Add Device</b-button>
                </b-list-group>

            </div>

            <div>
                <h4>Firefox</h4>
                <b-list-group>
                    <b-list-group-item v-for='(device, index) in selectedSuite.testDevices.firefox' :key='index'>
                        
                        <h3 v-b-toggle='"tdf" + index.toString()'>{{device.name}}</h3>

                        <b-collapse :id='"tdf" + index.toString()'>
                            <b-form>
                                <div class='environment-row'>
                                    <b-form-checkbox @keyup='debounceEdit("active", $event, index, "firefox")' v-model='device.active'>Active</b-form-checkbox>
                                    <i @click='deleteTestDevice(index, "firefox")' class="fas fa-trash"></i>
                                </div>

                                <b-form-group label="Name">
                                    <b-form-input @keyup='debounceEdit("name", $event, index, "firefox")' required placeholder="e.g. Pixel 2" :value='device.name'></b-form-input>
                                </b-form-group>

                                <b-form-group label="Screen width">
                                    <b-form-input @keyup='debounceEdit("width", $event, index, "firefox")' required placeholder="e.g. 1400" :value='device.width'></b-form-input>
                                </b-form-group>

                                <b-form-group label="Screen height">
                                    <b-form-input @keyup='debounceEdit("height", $event, index, "firefox")' required placeholder="e.g. 1024" :value='device.height'></b-form-input>
                                </b-form-group>
                            </b-form>
                        </b-collapse>
                    </b-list-group-item>

                    <b-button @click='addDevice("firefox")'>Add Device</b-button>
                </b-list-group>
            </div>

            <div>
                <h4>Webkit</h4>
                <b-list-group>
                    <b-list-group-item v-for='(device, index) in selectedSuite.testDevices.webkit' :key='index'>
                        
                        <h3 v-b-toggle='"tdw" + index.toString()'>{{device.name}}</h3>

                        <b-collapse :id='"tdw" + index.toString()'>
                            <b-form>
                                <div class='environment-row'>
                                    <b-form-checkbox @keyup='debounceEdit("active", $event, index, "webkit")' v-model='device.active'>Active</b-form-checkbox>
                                    <i @click='deleteTestDevice(index, "webkit")' class="fas fa-trash"></i>
                                </div>

                                <b-form-group label="Name">
                                    <b-form-input @keyup='debounceEdit("name", $event, index, "webkit")' required placeholder="e.g. Pixel 2" :value='device.name'></b-form-input>
                                </b-form-group>

                                <b-form-group label="Screen width">
                                    <b-form-input @keyup='debounceEdit("width", $event, index, "webkit")' required placeholder="e.g. 1400" :value='device.width'></b-form-input>
                                </b-form-group>

                                <b-form-group label="Screen height">
                                    <b-form-input @keyup='debounceEdit("height", $event, index, "webkit")' required placeholder="e.g. 1024" :value='device.height'></b-form-input>
                                </b-form-group>
                            </b-form>
                        </b-collapse>
                    </b-list-group-item>

                    <b-button @click='addDevice("webkit")'>Add Device</b-button>
                </b-list-group>
            </div>

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
    name:'TestDevices',
    computed:{
        selectedSuite(){
            return this.$store.getters.getSelectedSuite
        }
    },
    data(){
        return {
            debounce:null
        }
    },
    methods:{
        debounceEdit:function(key, e, index, env){
            if(this.debounce){
                clearTimeout(this.debounce);
            }
            this.debounce = setTimeout(() => {
                this.selectedSuite.testDevices[env][index][key] = e.target ? e.target.value : e;
                this.$store.commit('editTestSuite', this.selectedSuite);
            }, 300);
        },
        deleteTestDevice: function(index, env){
            this.selectedSuite.testDevices[env] = this.selectedSuite.testDevices[env].filter((val, i) => i !== index);
            this.$store.commit('editTestSuite', this.selectedSuite)
        },
        addDevice(env){
            this.selectedSuite.testDevices[env] = [...this.selectedSuite.testDevices[env], {active:true, name:'New Device', width:'', height:'', environment:env}]
            this.$store.commit('editTestSuite', this.selectedSuite);
        }
    }
}
</script>