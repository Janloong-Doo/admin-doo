<template>
    <a-collapse>
        <template :key="item.id" v-for="item in data">
            <a-collapse-panel :header="item.name">
                <!--                <div :style="{ borderBottom: '1px solid #E9E9E9' }">-->
                <!--                    <a-checkbox-->
                <!--                        v-model:checked="checkAll"-->
                <!--                        :indeterminate="indeterminate"-->
                <!--                        @change="onCheckAllChange(item.children)"-->
                <!--                    >-->
                <!--                       全选-->
                <!--                    </a-checkbox>-->
                <!--                </div>-->
                <!--                <br/>-->
                <a-checkbox-group v-model:value="computedSelectData(selectDataForCheck)" :options="childrenLabel(item.children)" @change="onChange($event,item.id,item.children)"/>
                <!--                <a-checkbox-group v-model:value="baseData.checkedList" :options="childrenLabel(item.children)" @change="onChange($event,item.id,item.children)"/>-->
                <!--                <a-checkbox-group  v-model:value="baseData.checkedList" :options="childrenLabel(item.children)"/>-->
                <!--                <a-checkbox-group :options="childrenLabel(item.children)" @change="onChange($event,item.id,item.children)"/>-->
            </a-collapse-panel>
        </template>
    </a-collapse>
    <a-space>
        <a-button :style="{ marginRight: '8px' }" @click="dealData('cancel')">
            取消
        </a-button>
        <a-button type="primary" @click="dealData('add')">
            确认
        </a-button>
    </a-space>
</template>

<script>
import {computed, ref, watchEffect} from "vue";

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
    emits: {
        'dealData': {}
    },
    setup: function (props, context) {
        let selectIds = props.selectData.map(value => value.id)
        // const baseData = reactive({
        //     // checkedList: selectIds
        //     checkedList: ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"]
        // })
        let map = new Map();
        const selectDataForCheck = ref(map);
        const childrenLabel = (data) => {
            let dataC = [];
            data.forEach(d => {
                let options = {};
                options.label = d.name;
                options.value = d.id;
                dataC.push(options)
            })
            return dataC;
        };
        const onCheckAllChange = (e) => {
            // Object.assign(this, {
            //     'baseData.checkedList': e.target.checked ? plainOptions : [],
            //     indeterminate: false,
            // });
        }

        const onChange = (checkedId = [], pid, children = []) => {
            console.log("选择资源", checkedId, pid, children);
            //筛选pid对应的已勾选的列表数据
            let checkedData = children.filter(data => checkedId.includes(data.id));
            selectDataForCheck[pid] = checkedData;
            console.log("勾选的列表数据", checkedData, "所有的勾选数据", selectDataForCheck)
        }

        const computedSelectData = (selectData) => {
            // let selectList = [];
            let selectList = ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"];
            if (selectData.length > 0) {
                selectData.forEach((value, key) => {
                    selectList.push(value.map(v => v.id))
                });
            }
            return selectList;
        }

        //向父组件发射数据
        const dealData = (type) => {
            if (type === 'add') {
                context.emit('dealData', type, selectDataForCheck);
            } else if (type === 'cancel') {
                context.emit('dealData', type);
            }
        }
        const checkAll = computed(() => {
            return false;
        })
        const indeterminate = computed(() => {
            return false;
        })
        watchEffect(() => {
            console.log('props.data', props.data)
            console.log('props.selectData', props.selectData)
        })
        return {
            childrenLabel,
            onCheckAllChange,
            checkAll,
            indeterminate,
            onChange,
            computedSelectData,
            selectDataForCheck,
        }
    }
}
</script>

<style lang="stylus">

</style>