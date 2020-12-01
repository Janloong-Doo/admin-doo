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
import {computed, onMounted, reactive, toRefs, watchEffect,onUpdated} from 'vue';
import DataUtils from "../assets/js/DataUtils.js";
// import {onUpdated} from "@vue/composition-api";
// import {onMounted} from "@vue/composition-api";
// import {defineComponent} from "@vue/composition-api";

export default {
    name: "CustomTreeTransfer",
    props: {
        treeDataD: {
            type: Array
        },
        selectId: {
            type: Array
        }
    },
    emits: {
        'dealData': null
    },
    setup(props: any, context: any) {
        const sourceRefProp = toRefs(props.treeDataD)
        //左侧原始数据
        let normalData = JSON.parse(JSON.stringify(props.treeDataD));
        let treeDataSource = JSON.parse(JSON.stringify(DataUtils.initTreeData(normalData)));
        let _selectId = JSON.parse(JSON.stringify(props.selectId));
        const replaceFields = {
            children: 'children',
            title: 'name',
            key: 'id'
        }

        const sourcedata = reactive({
            //选择的属性
            // targetKeys: [],
            targetKeys: _selectId,
            //穿梭框默认的原始数据源（自定义后的右侧）
            dataSource: normalData,
        })

        onUpdated(() => {
            // sourcedata.targetKeys = _selectId;
        })

        const treeData = computed(() => {
            return handleTreeData(treeDataSource, sourcedata.targetKeys);
        })

        function isChecked(selectedKeys: string[], eventKey: string) {
            // console.log("selectedKeys", selectedKeys, "eventKey", eventKey)
            return selectedKeys.indexOf(eventKey) !== -1;
        }

        function handleTreeData(data, targetKeys: string[]) {
            data.forEach(item => {
                item['disabled'] = targetKeys.includes(item.id);
                // console.log("处理单条数据:",item.name,"处理结果:",item.disabled,"item.key",item.key,"targetkeys",targetKeys)
                if (item.children) {
                    handleTreeData(item.children, targetKeys);
                }
            });
            return data;
        }

        const onChange = (targetKeys: string[]) => {
            sourcedata.targetKeys = targetKeys;
            console.log('Target Keys:', targetKeys, sourcedata.targetKeys, 'sourcedata.dataSource', sourcedata.dataSource);
        };
        const onChecked = (_, e, checkedKeys, onItemSelect) => {
            const {eventKey} = e.node;
            onItemSelect(eventKey, !isChecked(checkedKeys, eventKey));
        };

        // 进来就会执行，每次更新也会立即执行
        watchEffect(() => {
            console.log("props取出的数据(非树),normalData", props.treeDataD);
            console.log("props取出的数据,selectId", props.selectId);
            console.log("定义为变量的treeDataD", sourceRefProp)
            console.log("原始tree数据", treeDataSource)
            console.log("计算属性treeData", treeData)
            console.log("datasource", sourcedata.dataSource)
        });
        const dealData = (type: string) => {
            if (type === 'add') {
                context.emit('dealData', type, sourcedata.targetKeys);
            } else if (type === 'cancel') {
                context.emit('dealData', type);
            }
        }
        return {
            sourcedata,
            treeData,
            onChange,
            onChecked,
            isChecked,
            replaceFields,
            dealData,
            _selectId,
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