<template>
    <div>
        <a-transfer
            class="tree-transfer"
            :rowKey="item => item.id"
            :data-source="sourcedata.dataSource"
            :target-keys="sourcedata.targetKeys"
            :render="item => item.name"
            :titles="['菜单列表','已选择']"
            :show-select-all="false"
            @change="onChange"
        >
            <template #children="{ direction, selectedKeys, onItemSelect }">
                <a-tree
                    v-if="direction === 'left'"
                    blockNode
                    checkable
                    checkStrictly
                    defaultExpandAll
                    :replace-fields="replaceFields"
                    :checkedKeys="[...selectedKeys, ...sourcedata.targetKeys]"
                    :treeData="treeData"
                    @check="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...sourcedata.targetKeys], onItemSelect);
            }
          "
                    @select="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...sourcedata.targetKeys], onItemSelect);
            }
          "
                />
            </template>
        </a-transfer>
    </div>
</template>

<script lang="ts">
import {computed, reactive, toRefs, watchEffect} from 'vue';
import DataUtils from "../assets/js/DataUtils.js";

export default {
    name: "CustomTreeTransfer",
    props: {
        treeDataD: {
            type: Array
        },
        selectData: {
            type: Array
        }
    },

    setup(props) {
        const sourceRefProp = toRefs(props.treeDataD)
        //左侧原始数据
        let normalData = JSON.parse(JSON.stringify(props.treeDataD));
        // normalData=props.treeDataD;
        console.log("normalData2", normalData)
        let treeDataSource = [];
        treeDataSource  = DataUtils.initTreeData(normalData);
        console.log("normalData222", normalData)
        console.log("treeDataSource", treeDataSource)
        const replaceFields = {
            children: 'children',
            title: 'name',
            key: 'id'
        }
        const treeData23 = [
            {key: '0-0', title: '0-0'},
            {
                key: '0-1',
                title: '0-1',
                children: [
                    {key: '0-1-0', title: '0-1-0'},
                    {key: '0-1-1', title: '0-1-1'},
                ],
            },
            {key: '0-2', title: '0-3'},
        ];
        // const transferDataSource = ref([]);
        const sourcedata = reactive({
            //选择的属性
            targetKeys: [],
            //穿梭框默认的原始数据源（自定义后的右侧）
            dataSource: normalData,
        })

        const treeData = computed(() => {
            return handleTreeData(treeDataSource, sourcedata.targetKeys);
            // return treeDataSource;
        })
        // function flatten(list = []) {
        // function flatten(list ) {
        // function flatten(list: object[]) {
        //     if (list) {
        //         list.forEach(item => {
        //             normalData.push(item);
        //             flatten(item.children);
        //         });
        //     }
        // }
        // flatten(JSON.parse(JSON.stringify(props.treeDataD)));


        function isChecked(selectedKeys, eventKey) {
            console.log("selectedKeys", selectedKeys, "eventKey", eventKey)
            return selectedKeys.indexOf(eventKey) !== -1;
        }

        // function handleTreeData(data, targetKeys = []) {
        function handleTreeData(data, targetKeys) {
            data.forEach(item => {
                item['disabled'] = targetKeys.includes(item.key);
                if (item.children) {
                    handleTreeData(item.children, targetKeys);
                }
            });
            return data;
        }

        const onChange = (targetKeys) => {
            sourcedata.targetKeys = targetKeys;
            console.log('Target Keys:', targetKeys, sourcedata.targetKeys,'sourcedata.dataSource',sourcedata.dataSource);
        };
        const onChecked = (_, e, checkedKeys, onItemSelect) => {
            const {eventKey} = e.node;
            onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
        };
        // 进来就会执行，每次更新也会立即执行
        watchEffect(() => {
            console.log("props取出的数据", props)
            console.log("props取出的数据,normalData", props.treeDataD);
            console.log("定义为变量的treeDataD", sourceRefProp)
            console.log("原始tree数据", treeDataSource)
            console.log("计算属性treeData", treeData)
            console.log("datasource", sourcedata.dataSource)
        })
        return {
            sourcedata,
            treeData,
            onChange,
            onChecked,
            isChecked,
            replaceFields,
        }
    }
}
</script>

<style lang="stylus">
.tree-transfer .ant-transfer-list:first-child {
    width: 50%
    flex: none
}
</style>