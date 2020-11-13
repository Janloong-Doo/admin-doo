<template>
    <div id="Activiti">
        <a-tabs type="card" @change="callback">
            <template v-for="item in tabResult">
                <a-tab-pane :key="item.key" :tab="item.tab">
                   <Login v-if="item.key==1"></Login>
                   <user v-else-if="item.key==2"></user>
                   <index v-else-if="item.key==3"></index>
                   <authenticate v-else-if="item.key==4"></authenticate>
                </a-tab-pane>
            </template>
        </a-tabs>

    </div>
</template>
<script>


export default {
    name: "Activiti",
    components: {},
    data() {
        let returnTabResult = [
            {
                'key': 1,
                'tab': 'login'
            }, {
                'key': 2,
                'tab': 'user'
            }, {
                'key': 3,
                'tab': 'index'
            }, {
                'key': 4,
                'tab': 'authenticate'
            }
        ]
        return {
            tabResult: returnTabResult
        }
    },
    methods: {
        callback(key) {
            console.log(key);
        },

    }
}
</script>

<style lang="stylus">
</style>