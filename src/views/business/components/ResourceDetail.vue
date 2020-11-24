<template>
    <a-collapse>
        <template v-for="item in data">
            <a-collapse-panel :key="item.id" :header="item.name">
                <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox
                        v-model:checked="checkAll(item.children)"
                        :indeterminate="indeterminate(item.children)"
                        @change="onCheckAllChange"
                    >
                       全选
                    </a-checkbox>
                </div>
                <br/>
<!--                <a-checkbox-group v-model:value="checkedList"  :options="childrenLabel(item.children)" @change="onChange"/>-->
                <a-checkbox-group  v-model:value="baseData.checkedList" :options="childrenLabel(item.children)"/>
            </a-collapse-panel>
        </template>
    </a-collapse>
</template>

<script>

import {computed,watchEffect,reactive} from "vue";

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
        let selectIds=props.selectData.map(value => value.id)
        const baseData=reactive({
            checkedList: selectIds
        })

        const childrenLabel = (data) => {
            let dataC = [];
            data.forEach(d=>{
                let options = {};
                options.label = d.name;
                options.value = d.id;
                dataC.push(options)
            })
            return dataC;
        };
        const onCheckAllChange=(e)=>{
            Object.assign(this, {
                'baseData.checkedList': e.target.checked ? plainOptions : [],
                indeterminate: false,
            });
        }

        const checkAll=computed((item) => {
            console.log("checkAll-item",item)
            return false;
        })
        const indeterminate=computed((item) => {
            console.log("indeterminate-item",item)
            return false;
        })
        watchEffect(() => {
            console.log('props.data', props.data)
            console.log('props.selectData', props.selectData)
        })
        return {
            baseData,
            childrenLabel,
            onCheckAllChange,
            checkAll,
            indeterminate,
        }
    }
}
</script>

<style lang="stylus">

</style>