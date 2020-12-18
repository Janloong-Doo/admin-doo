<template>
    <div id="index">
        <a-space direction="vertical" size="middle">
            <!--            <a-row type="flex" justify="end" :gutter="1">-->
            <a-row type="flex" justify="space-between" :gutter="1">
                <a-col :span="6">
                    <span>资源列表</span>
                </a-col>
                <a-col v-if="addParamData.firstData" :span="1">
                    <a-space>
                        <a-button type="primary" @click="onDrawerOpen('first')">新增</a-button>
                        <!--                        <a-button type="primary" @click="editMenu">编辑</a-button>-->
                    </a-space>
                </a-col>
            </a-row>

            <!--  新增角色抽屉显示  -->
            <a-drawer
                :title="addParamData.isEditType?'编辑资源':'新增资源'"
                :width="512"
                :visible="addMenuDradwrvisible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onDrawerClose('normal')"
            >
                <a-form
                    layout="horizontal"
                    ref="addMenuForm"
                    :model="addParamData"
                    :rules="addParamData.rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >

                    <a-form-item label="分类:" name="pid">
                        <a-select showArrow v-model:value="addParamData.pid" :size="selectData.size" placeholder="请选择分类"
                                  @change="selectResourceType">
                            <a-select-option v-for="items in selectData" :key="items.id" :value="items.id">{{ items.name }}</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="名称:" name="name">
                        <a-input placeholder="请输入资源名称" v-model:value="addParamData.name"></a-input>
                    </a-form-item>
                    <a-form-item label="编码:" name="code">
                        <a-input placeholder="请输入资源编码" v-model:value="addParamData.code"></a-input>
                    </a-form-item>
                    <a-form-item label="url:" name="url">
                        <a-input placeholder="请输入资源url信息" v-model:value="addParamData.url"></a-input>
                    </a-form-item>
                    <a-form-item label="描述:" name="description">
                        <a-input placeholder="请输入资源描述信息" v-model:value="addParamData.description"></a-input>
                    </a-form-item>
                    <a-form-item label="资源值:" name="webValue">
                        <a-input placeholder="请输入页面资源值" v-model:value="addParamData.webValue"></a-input>
                    </a-form-item>
                    <a-form-item label="排序:" name="sort">
                        <a-input placeholder="请输入资源序号" v-model:value="addParamData.sort"></a-input>
                    </a-form-item>

                    <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                        取消
                    </a-button>
                    <a-button type="primary" @click="saveMenu('addMenuForm')">
                        确认
                    </a-button>
                </a-form>

            </a-drawer>

            <!-- 主体列表部分 -->
            <a-table
                :columns="columns"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                :rowSelection="rowSelection"
                @change="handleTableChange"
                :scroll="{ x: '110%' }"
            >
                <template #isOpenSlot="{text, record, index}">
                    <a-switch disabled :checked="text===0"></a-switch>
                </template>
                <template #operation="{text, record, index}">
                    <a-dropdown>
                        <template #overlay>
                            <a-menu @click="handleSelectMenu($event.key,text,record,index)">
                                <a-menu-item key="add">
                                    新增
                                    <PlusOutlined/>
                                </a-menu-item>
                                <a-menu-item key="edit">
                                    编辑
                                    <EditOutlined/>
                                </a-menu-item>
                                <a-menu-item key="del">
                                    删除
                                    <CloseOutlined/>
                                </a-menu-item>
                                <a-menu-item key="open">
                                    {{ record.isOpen === 0 ? '停用' : '启用' }}
                                    <EditOutlined/>
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button type="primary" style="margin-left: 8px"> 选项
                            <down-outlined></down-outlined>
                        </a-button>
                    </a-dropdown>
                </template>
            </a-table>

        </a-space>
    </div>
</template>

<script lang="ts">
import {CloseOutlined, DownOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {addResource, changeResourceStatus, delResource, editResource, getResourceList} from "/@/api/Resource";
import {getDicListByCode} from "/@/api/Dictionary";

export default {
    name: "ResourceManager",
    props: [],
    components: {DownOutlined, PlusOutlined, EditOutlined, CloseOutlined},
    watch: {
        '$route'(to, from) {
            console.log(to);
            console.log(from)
        },
        'sourceData'(to, from) {
            let b = to.length === 0;
            this.addParamData.firstData = b;
        }
    },
    computed: {
        rowSelection() {
            const {selectedRowKeys} = this;
            //表格可选
            // return {
            //     onChange: this.onSelectChange,
            //     // selections: true,
            //     selectedRowKeys,
            //     type: 'radio'
            //     // type:'checkbox'
            // }
            return null;
        }
    },
    data() {
        let col = [
            {
                title: '名称',
                dataIndex: 'name',
                sorter: true,
                // width: '40%',
                align: 'center',
                fixed: 'left'
                // scopedSlots: {customRender: 'name'},
            },
            {
                title: '编码',
                dataIndex: 'code',
                ellipsis: true,
                align: 'center',
                sorter: true,
            }, {
                title: '描述',
                dataIndex: 'description',
                ellipsis: true,
                align: 'center',
                sorter: true,
            },
            {
                title: 'url',
                dataIndex: 'url',
                align: 'center',
                sorter: true,
            },
            {
                title: '属性',
                dataIndex: 'webValue',
                align: 'center',
                sorter: true,
            },
            {
                title: '资源类型',
                dataIndex: 'type',
                align: 'center',
                sorter: true,
            }, {
                title: '资源分类',
                dataIndex: 'dictionary.name',
                align: 'center',
                sorter: true,
            },
            {
                title: '排序',
                dataIndex: 'sort',
                align: 'center',
                sorter: true,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                sorter: true,
                align: 'center'
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
                sorter: true,
                align: 'center'
            },
            {
                title: '是否启用',
                dataIndex: 'isOpen',
                fixed: 'right',
                slots: {customRender: 'isOpenSlot'}
            },
            {
                title: '操作',
                fixed: 'right',
                key: 'operation',
                // dataIndex: 'operation',
                slots: {customRender: 'operation'},
            }
        ];
        let page = 0;
        let size = 100;
        let pagination = {
            //单页时隐藏分页
            "hideOnSinglePage": true,
            "defaultPageSize": size,
            "showSizeChanger": true
        };
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            baseMould: '资源',
            page: page,
            size: size,
            sortName: 'sort',
            orderType: 'asc',
            pagination: pagination,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
            columns: col,
            // rowSelection: rowselection,
            sourceData: [],
            data: [],
            selectData: [],
            addMenuDradwrvisible: false,
            addParamData: {
                id: '',
                name: '',
                code: '',
                url: '',
                pid: '',
                sort: 0,
                webValue: '',
                description: '',
                type: 0,
                origion: 'pc',
                //base
                firstData: false,
                isEditType: false,
                isRootMenu: false,
                isMenuOpen: false,
                rules: {
                    pid: [
                        {required: true, message: '请选择资源类型', trigger: ['blur','change']},
                    ],
                    name: [
                        {required: true, message: '请输入资源名称', trigger: ['blur','change']},
                    ],
                    code: [
                        {required: true, message: '请输入资源编码', trigger: ['blur','change']},
                    ],
                    url: [
                        {required: true, message: '请输入资源url', trigger: ['blur','change']},
                    ]
                }
            }
        }
    },

    created() {
        this.getMenuData();
        this.getResourceTypeData();
    },

    mounted() {

    },
    methods: {
        saveMenu(formName) {
            if (this.addParamData.isEditType) {
                this.editMenu(formName);
            } else {
                this.addMenu(formName);
            }
        },
        addMenu(formName) {
            this.$refs[formName].validate().then(value => {
                let type = this.addParamData.type;
                if (this.addParamData.webValue) {
                    type = 1;
                }
                console.log(this.addParamData);
                let pid = this.addParamData.pid;
                let param = {
                    "name": this.addParamData.name,
                    "code": this.addParamData.code,
                    "url": this.addParamData.url,
                    "description": this.addParamData.description,
                    "webValue": this.addParamData.webValue,
                    "type": type,
                    "pid": pid,
                    "sort": this.addParamData.sort,
                    "origion": this.addParamData.origion
                }
                addResource(param).then(value => {
                    if (value.code === 0) {
                        console.log("新增成功")
                        this.$refs.addMenuForm.resetFields();
                        this.addMenuDradwrvisible = false;
                        this.getMenuData();
                    } else {
                        console.log("新增失败")
                        console.log(value)
                    }
                }).catch(reason => {
                })
            }).catch((reason => {
                console.log('error submit!!');
                return false;
            }));
        },
        editMenu(formName) {
            this.$refs[formName].validate().then(value => {
                let type = this.addParamData.type;
                if (this.addParamData.webValue) {
                    type = 1;
                }
                console.log(this.addParamData);
                let param = {
                    'id': this.addParamData.id,
                    "name": this.addParamData.name,
                    "code": this.addParamData.code,
                    "url": this.addParamData.url,
                    "description": this.addParamData.description,
                    "webValue": this.addParamData.webValue,
                    "type": type,
                    "pid": this.addParamData.pid,
                    "sort": this.addParamData.sort,
                    "origion": this.addParamData.origion
                }
                editResource(param).then(value => {
                    if (value.code === 0) {
                        console.log("修改成功")
                        this.$refs.addMenuForm.resetFields();
                        this.addMenuDradwrvisible = false;
                        this.getMenuData();
                        this.initEmptyData();
                    } else {
                        console.log("修改失败")
                        console.log(value)
                    }
                }).catch(reason => {
                })
            }).catch((reason => {
                console.log('error submit!!');
                return false;
            }));
        },
        addMenuInit(data) {
            console.log(data);
            this.onDrawerOpen('add')
            this.addParamData.isEditType = false;
            this.initEmptyData();
            // this.addParamData.pid = data.id;
        },

        editMenuInit(data) {
            this.addParamData.isEditType = true;
            this.onDrawerOpen()
            //初始化数据
            this.addParamData.id = data.id;
            this.addParamData.name = data.name;
            this.addParamData.code = data.code;
            this.addParamData.description = data.description;
            this.addParamData.url = data.url;
            this.addParamData.webValue = data.webValue;
            this.addParamData.pid = data.dictionary.id;
            this.addParamData.sort = data.sort;
        },

        delMenu(data) {
            let that = this;
            let selectedRows = data;
            if (!selectedRows) {
                console.log("请选择一条数据")
                return false;
            }
            let content = "确认删除'" + selectedRows.name + "'吗？";
            console.log(content);

            this.$confirm({
                title: '删除角色',
                content: content,
                onOk() {
                    return delResource(selectedRows.id).then(value => {
                        if (value.code === 0) {
                            console.log("删除成功")
                            that.getMenuData();
                        } else {
                            console.log("删除失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    });
                }

            })
        },

        getMenuData() {
            this.loading = true;
            let params = {
                "page": this.page,
                "size": this.size,
                "sort": this.sortName,
                "direction ": this.orderType,
            }
            console.log(params);
            getResourceList(params).then(value => {
                console.log(value);
                this.loading = false;
                if (value.code === 0) {
                    const pagination = {...this.pagination};
                    pagination.total = value.data.totalElements;
                    this.sourceData = value.data.content;
                    // this.data = DataUtils.initTreeData(value.data.content);
                    this.data = value.data.content;
                    this.pagination = pagination;

                    ////TODO 【疑问】 不显示分页信息 by Janloong_Doo
                    // this.pagination.total = value.data.totalElements;
                    // this.data = value.data.content;
                } else {
                    console.log("获取失败")
                    console.log(value)
                }
                this.loading = false;
            }).catch(reason => {

            });
        },

        handleTableChange(pagination, filters, sorter) {
            this.pagination.current = pagination.current;
            this.size = pagination.pageSize;
            this.page = pagination.current - 1;
            let order = sorter.order;
            if (order) {
                this.sortName = sorter.field;
                this.orderType = order === 'ascend' ? 'asc' : 'desc';
            }
            this.getMenuData();
            this.sortName = '';
            this.orderType = '';
            // ...filters,
        },
        onSelectChange(selectedRowKeys, selectedRows) {
            console.log(selectedRowKeys);
            console.log(selectedRows);
            this.selectedRowKeys = selectedRowKeys;
            this.selectedRows = selectedRows;
        },

        onDrawerOpen(type) {
            if (type === 'add') {
                this.addParamData.isEditType = false;
            } else if (type === 'first') {
                this.addParamData.isRootMenu = true;
                this.addParamData.firstData = true;
                this.initEmptyData();
            }
            this.addMenuDradwrvisible = true;
        },

        onDrawerClose(type) {
            console.log(type);
            if (type === 'reset') {
                console.log('重置');
                this.addParamData.isEditType = false;
            }
            this.addMenuDradwrvisible = false;
        },
        changeMenuStatus(data) {
            let that = this;
            let selectedRows = data;
            if (!selectedRows) {
                console.log("请选择一条数据")
                return false;
            }
            let content = "确认修改资源'" + selectedRows.name + "'的状态吗？";
            console.log(content);

            this.$confirm({
                title: '修改资源',
                content: content,
                onOk() {
                    return changeResourceStatus({'id': selectedRows.id}).then(value => {
                        if (value.code === 0) {
                            console.log(value.msg)
                            that.getMenuData();
                        } else {
                            console.log("修改失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    });
                }

            })
        },
        handleSelectMenu(event, text, record, index) {
            switch (event) {
                case 'add':
                    this.addMenuInit(text);
                    break;
                case 'edit':
                    this.editMenuInit(text);
                    break;
                case 'del':
                    this.delMenu(text);
                    break;
                case 'open':
                    this.changeMenuStatus(text);
                    break;
                default :
                    return false;
            }
        },
        initEmptyData() {
            this.addParamData.isEditType = false;
            this.addParamData.name = '';
            this.addParamData.pid = '';
            this.addParamData.code = '';
            this.addParamData.webValue = '';
            this.addParamData.url = '';
            this.addParamData.description = '';
            this.addParamData.sort = 0;
        },

        getResourceTypeData() {
            getDicListByCode({"code": "resourceType"}).then(value => {
                console.log(value);
                if (value.code === 0) {
                    this.selectData = value.data;
                }
            }).catch(reason => {
            })
        },
        selectResourceType(item) {
            this.addParamData.pid = item;
            console.log(this.addParamData.pid)
        }

    },

}
</script>

<style scoped>

</style>