<template>
    <b-card>
        <b-card-body>
            <b-card-title>Results</b-card-title>
            <b-button variant='primary' @click='runTests'>Run tests</b-button>
            <div class='result-row' v-for='(result, index) in testResults' :key='index'>
                <h3>
                    <i v-if='result.success' class="fas fa-check-circle"></i>
                    <i v-if='!result.success' class="fas fa-times-circle"></i>
                    <span>{{result.testName}} : {{result.deviceName}} : {{result.environment}}</span>
                </h3>
                <p v-if='result.text'>{{result.text}}</p>
                <p v-if='result.json'>{{result.json}}</p>
                <img v-if='result.src' :src='result.src' alt='test result image'/>
            </div>
            <!-- <div class='results-container'>
                <h2>Home Page</h2>
                <div class='result-row'>
                    <h3>Pixel 2 - Chromium</h3>
                    <div class='result-contents'>
                        <img width='411' src='https://placekitten.com/1000/300' />
                    </div>
                </div>

                <div class='result-row'>
                    <h3>Desktop Medium - Chromium</h3>
                    <div class='result-contents'>
                        <img width='1400' src='https://placekitten.com/1000/300' />
                    </div>
                </div>
            </div> -->
        </b-card-body>
    </b-card>
</template>
<style scoped>
.result-row{
    overflow:auto;
}

</style>
<script>
export default {
    name:'Results',
    computed:{
        selectedSuite(){
            return this.$store.getters.getSelectedSuite
        }
    },
    data(){
        return{
            testResults: []
        }
    },
    methods:{
        runTests: async function(){
            const testEntries = this.selectedSuite.testEntries;
            const testDevices = this.selectedSuite.testDevices;

            const request = await fetch(
                'http://localhost:9090/test-script/run/collection',
                {
                    method:'POST',
                    body:JSON.stringify({
                        baseUrl:'https://row-board-task.com',
                        tests:testEntries.filter(test => test.active),
                        devices:[
                            ...testDevices.chromium.filter(test => test.active),
                            ...testDevices.firefox.filter(test => test.active),
                            ...testDevices.webkit.filter(test => test.active),
                        ]
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            );

            const response = await request.json();
            console.log(response);
            this.testResults = response.testResults;
        }
    }
}
</script>