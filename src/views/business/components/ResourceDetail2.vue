<template>
	<div>
		<a-collapse>
			<template :key="item.id" v-for="item in data">
				<a-collapse-panel :header="item.name">
					<template :key="detail.id" v-for="detail in item.children">
						<a-checkable-tag :checked="checkAble(detail.id)" @change="onChange($event,item.id,detail)">
							{{ detail.name }}
						</a-checkable-tag>
					</template>
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
    name: "ResourceDetail2",
    props: {
        data: {
            type: Array
        },
        selectData: {
            type: Array
        }
    },
    emits: {
        'dealData': null
    },
    setup(props: any, context: any) {
        let _ids: String[] = props.selectData.map(value => value.id);
        let _selectDataMap = new Map();
        props.selectData.forEach(value => {
            _selectDataMap.set(value.id, value)
        })
        console.log("ssssss", _ids)
        const baseData = reactive({
            //内置使用， key:children 形式
            selectDataForCheck: new Map(_selectDataMap.entries()),
        })
        let selectList: Set<string> = reactive(new Set(_ids));

        //checkboxgroup  change事件
        const onChange = (checkedAble: boolean, pid: string, children: any[]) => {
            // selectList.clear();
            console.log("选择资源", checkedAble, pid, children);
            if (checkedAble) {
                //筛选pid对应的已勾选的列表数据
                // baseData.selectDataForCheck[pid] = children;
                baseData.selectDataForCheck.set(children.id, children);
                console.log("勾选的列表数据", selectList, "所有的勾选数据", baseData.selectDataForCheck)
                // computedSelectData(baseData.selectDataForCheck)
                console.log("选中", selectList)
                selectList.add(children.id);
            } else {
                console.log("取消")
                selectList.delete(children.id);
                baseData.selectDataForCheck.delete(children.id)
            }
        }

        const computedSelectData = (selectData: Map<string, any>) => {
            if (selectData.size < 1) {
                return selectList;
            }
            selectData = baseData.selectDataForCheck;
            let _selectData = JSON.parse(JSON.stringify(selectData));
            // let selectList = ["414ab570-a545-4cc9-9ce8-9080a6641fce", "a0167d88-69dd-437a-9727-27f65a3e7266", "b38269ed-8e7d-4c40-8ef1-f5e312936c0b"];
            if (Object.keys(_selectData).length > 0) {
                for (var [key, value] of Object.entries(_selectData)) {
                    let c: Set<string> = value.map(v => v.id);
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
        const checkAble = (id: string) => {
            console.log("选择框id:", id)
            let b = selectList.has(id)
            console.log("选择框状态:", id, b, selectList)
            return b;
        };
        const handlerSendData = (data: Map<string, object>) => {
            let _data = new Array<object>();
            data.forEach((value, key) => {
                console.log("asdasdasd", key, value)
                _data.push(value);
            });
            return _data;
        }
        //向父组件发射数据
        const dealData = (type: string) => {
            if (type === 'add') {
                let data = handlerSendData(baseData.selectDataForCheck);
                console.log("发射的数据", data);
                context.emit('dealData', type, data);
                // context.emit('update:modelValue', baseData.selectDataForCheck)
            } else if (type === 'cancel') {
                context.emit('dealData', type);
            }
        }

        watchEffect(() => {
            console.log('selectList', selectList)
            console.log('baseData.selectDataForCheck', baseData.selectDataForCheck)
        })
        return {
            baseData,
            computedSelectData,
            onChange,
            computedSelectData2,
            dealData,
            selectList,
            checkAble
        }
    }
}
</script>

<style lang="stylus">

</style>