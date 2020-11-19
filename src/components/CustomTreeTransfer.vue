<template>
    <div>
        <a-transfer
            class="tree-transfer"
            :data-source="data.dataSource"
            :target-keys="data.targetKeys"
            :render="item => item.title"
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
                    :checkedKeys="[...selectedKeys, ...targetKeys]"
                    :treeData="treeData"
                    @check="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect);
            }
          "
                    @select="
            (_, props) => {
              onChecked(_, props, [...selectedKeys, ...targetKeys], onItemSelect);
            }
          "
                />
            </template>
        </a-transfer>
    </div>
</template>

<script lang="ts">
import {reactive, computed} from 'vue';

export default {
    name: "CustomTreeTransfer",
    props: ['treeDatad', 'selectData'],

    setup() {
        const transferDataSource = [];
        const data = reactive({
            targetKeys: [],
            dataSource: transferDataSource,
        })

        const treeData2 = [
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
        const treeData=computed(ctx => {
            return handleTreeData(treeData, this.targetKeys);
        })
        function flatten(list = []) {
            list.forEach(item => {
                transferDataSource.push(item);
                flatten(item.children);
            });
        }
        flatten(JSON.parse(JSON.stringify(treeData)));

        function isChecked(selectedKeys, eventKey) {
            return selectedKeys.indexOf(eventKey) !== -1;
        }

        // function handleTreeData(data, targetKeys = []) {
        function handleTreeData(data, targetKeys ) {
            data.forEach(item => {
                item['disabled'] = targetKeys.includes(item.key);
                if (item.children) {
                    handleTreeData(item.children, targetKeys);
                }
            });
            return data;
        }

        const onChange = (targetKeys) => {
            console.log('Target Keys:', targetKeys);
            this.targetKeys = targetKeys;
        };
        const onChecked = (_, e, checkedKeys, onItemSelect) => {
            const {eventKey} = e.node;
            onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
        };

        return {
            data,
            treeData,
            onChange,
            onChecked,
            flatten,
            transferDataSource,
        }
    }
}
</script>

<style lang="stylus">

</style>