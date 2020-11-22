import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX);

export const store = new VueX.Store({
    state:{
        testSuiteId:2,
        testSuites:[
            
            
        ],
        selectedSuiteId:null,
    },
    mutations:{
        setTestSuites(state, suites){
            console.log('SUITES ', suites)
            state.testSuites = suites;
        },
        createTestSuite(state){
            state.testSuites = [
                ...state.testSuites,
                {
                    id:state.testSuiteId,
                    name:'New Test Suite',
                    baseUrl:'',
    
                    testDevices:{
                        chromium:[],
                        firefox:[],
                        webkit:[]
                    },
    
                    testEntries:[
    
                    ],
                    results:[
    
                    ]
                }
            ]
            state.testSuiteId++;
        },
        editTestSuite(state, updatedSuite){
            state.testSuites = state.testSuites.map(testSuite => {
                if(testSuite.id === updatedSuite.id){
                    return updatedSuite;
                }
                return testSuite;
            })
        },

        selectSuite(state, suiteId){
            state.selectedSuiteId = suiteId;
        }
    },
    getters:{
        getTestSuites: state => state.testSuites,
        getSelectedSuite: state => state.testSuites.find(suite => suite.id === state.selectedSuiteId)
    }
})