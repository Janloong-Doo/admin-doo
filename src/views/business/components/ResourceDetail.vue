<template>
    <div>
        <a-collapse>
            <template :key="item.id" v-for="item in data">
                <a-collapse-panel :header="item.name">
                    <!--                    v-model:value="computedSelectData(baseData.selectDataForCheck)"-->
                    <a-checkbox-group
                        v-model:value="computedSelectData2"
                        :options="childrenLabel(item.children)"
                        @change="onChange($event,item.id,item.children)"
                    />
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
    </div>
</template>

<script lang="ts">
import {computed, reactive, watchEffect} from "vue";

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
        // let selectIds = props.selectData.map(value => value.id)
        const baseData = reactive({
            // checkedList: selectIds
            // checkedList: ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"]
            selectDataForCheck: {}
        })
        const childrenLabel = (data: any) => {
            let dataC: Array<object> = [];
            data.forEach((d: any) => {
                let options = {};
                options.label = d.name;
                options.value = d.id;
                dataC.push(options)
            })
            return dataC;
        };

        const onChange = (checkedId: String[], pid, children: any[]) => {
            console.log("选择资源", checkedId, pid, children);
            //筛选pid对应的已勾选的列表数据
            let checkedData = children.filter(data => checkedId.includes(data.id));
            baseData.selectDataForCheck[pid] = checkedData;
            console.log("勾选的列表数据", checkedData, "所有的勾选数据", baseData.selectDataForCheck)
        }

        const computedSelectData = async (selectData) => {
            // let selectList = [];
            let selectList = ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"];
            if (selectData.length > 0) {
                selectData.forEach((value, key) => {
                    selectList.push(value.map(v => v.id))
                });
            }
            console.log("第一次进入", selectList)
            return selectList;
        }
        const computedSelectData2 = computed(ctx => {
            return computedSelectData(baseData.selectDataForCheck);
        })
        //向父组件发射数据
        const dealData = (type) => {
            if (type === 'add') {
                context.emit('dealData', type, baseData.selectDataForCheck);
                // context.emit('update:modelValue', baseData.selectDataForCheck)
            } else if (type === 'cancel') {
                context.emit('dealData', type);
            }
        }

        watchEffect(() => {
            console.log('props.data', props.data)
            console.log('props.selectData', props.selectData)
        })
        return {
            childrenLabel,
            computedSelectData,
            onChange,
            computedSelectData2,
        }
    }
}
</script>

<style lang="stylus">

</style>