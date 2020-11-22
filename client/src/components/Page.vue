<template>
    <div class='Page bg-light'>

        <!-- Test Suite Information -->
        <div class='container '>
            <div class='row'>
                <div class='col'>
                   <SuiteProperties />
                    <TestDevices />
                </div>

                <div class='col'>
                    <Tests />
                </div>
            </div>

            <div class='row'>
                <div class='col'>
                    <Results />
                </div>
            </div>

        </div>

        
    </div>

    
</template>

<style scoped>
    .Page{
        margin-left:auto;
        padding-left:10px;
        width:80%;
        height:100%;
    }
    

    .card{
        margin:10px;
    }
</style>

<script>
import SuiteProperties from './SuiteProperties';
import TestDevices from './TestDevices';
import Tests from './Tests';
import Results from './Results';

export default {
    name:'Page',
    components:{
        SuiteProperties,
        TestDevices,
        Tests,
        Results
    }
}
</script>