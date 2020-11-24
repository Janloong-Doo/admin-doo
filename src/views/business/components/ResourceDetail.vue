<template>
    <a-collapse v-model:activeKey="activeKey">
        <template v-for="item in data">
            <a-collapse-panel :key="item.id" :header="item.name">
                <!--                <div :style="{ borderBottom: '1px solid #E9E9E9' }">-->
                <!--                <a-checkbox-->
                <!--                    v-model:checked="checkAll"-->
                <!--                    :indeterminate="indeterminate"-->
                <!--                    @change="onCheckAllChange"-->
                <!--                >-->
                <!--                    Check all-->
                <!--                </a-checkbox>-->
                <!--                </div>-->
                <!--                <br />-->
                <!--                <a-checkbox-group v-model:value="checkedList" :options="plainOptions" @change="onChange" />-->
            </a-collapse-panel>
        </template>
    </a-collapse>
</template>

<script>

import {watchEffect} from "vue";

export default {
    name: "ResourceDetail",
    props: {
        data: {
            type: Array
        },
        selectData: {
            type: Array
        }
    },
    setup(props, context) {
        const activeKey = (key) => {
            console.log(key);
        };
        watchEffect(() => {
            console.log('props.data',props.data)
            console.log('props.selectData',props.selectData)
        })
        return {
            activeKey
        }
    }
}
</script>

<style lang="stylus">

</style>