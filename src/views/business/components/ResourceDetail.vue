<template>
    <div>
        <a-collapse>
            <template :key="item.id" v-for="item in data">
                <a-collapse-panel :header="item.name">
                    <!--                    v-model:value="computedSelectData(baseData.selectDataForCheck)"-->
                    <!--                        :value="computedSelectData(baseData.selectDataForCheck)"-->
                    <!--                        :value="selectList"-->
                    <!--                        v-model:value="selectList"-->
                    <!--                        :value="computedSelectData2"-->
                    <a-checkbox-group
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
import {computed, reactive, watchEffect, ref} from "vue";

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
        // let selectIds = ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"]
        let selectIds = [];
        // let selectList:Set = ref({});
        const baseData = reactive({
            // checkedList: selectIds
            // checkedList: ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"]
            //内置使用， key:children 形式
            selectDataForCheck: {},
            // selectList: {}
        })
        let selectList = reactive(new Set(["414ab570-a545-4cc9-9ce8-9080a6641fce"]));

        //展现具体checkbox名称
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

        //checkboxgroup  change事件
        const onChange = (checkedId: String[], pid, children: any[]) => {
            selectList.clear();

            console.log("选择资源", checkedId, pid, children);
            //筛选pid对应的已勾选的列表数据
            let checkedData = children.filter(data => checkedId.includes(data.id));
            baseData.selectDataForCheck[pid] = checkedData;
            console.log("勾选的列表数据", checkedData, "所有的勾选数据", baseData.selectDataForCheck)
            computedSelectData(baseData.selectDataForCheck)
        }

        const computedSelectData = (selectData = []) => {
            if (selectData.length < 1) {
                return selectList;
            }
            selectData = baseData.selectDataForCheck;
            let _selectData = JSON.parse(JSON.stringify(selectData));
            // let selectList = ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"];
            if (Object.keys(_selectData).length > 0) {
                for (var [key, value] of Object.entries(_selectData)) {
                    let c: Set = value.map(v => v.id);
                    c.forEach(v2 => {
                        selectList.add(v2);
                        console.log("key", key, "v2", v2, "c", ...c, "value", value)
                    })
                }
            }
            console.log("第一次进入", selectList, "data", _selectData)
            return selectList;
        }

        const computedSelectData2 = computed(() => {
            return computedSelectData(baseData.selectDataForCheck);
        })

        //向父组件发射数据
        const dealData = (type) => {
            if (type === 'add') {
                console.log("发射的数据", baseData.selectDataForCheck);
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
            baseData,
            childrenLabel,
            computedSelectData,
            onChange,
            computedSelectData2,
            dealData,
            selectList
        }
    }
}
</script>

<style lang="stylus">

</style>