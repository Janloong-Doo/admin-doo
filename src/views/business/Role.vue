<template>
    <div id="index">
        <a-space direction="vertical" size="middle">
            <a-row type="flex" justify="end" align="middle" :gutter="1">
                <a-col :span="1">
                    <a-button type="primary" @click="onDrawerOpen('add')">新增</a-button>
                    <!--  新增角色抽屉显示  -->
                    <a-drawer
                        :title="addRoleData.isEditType?'编辑角色':'新增角色'"
                        :width="720"
                        :visible="addRoleDradwrvisible"
                        :body-style="{ paddingBottom: '80px' }"
                        @close="onDrawerClose('normal')"
                    >
                        <a-form
                            layout="horizontal"
                            ref="addRoleForm"
                            :model="addRoleData"
                            :rules="addRoleData.rules">
                            <a-form-item label="名称:" name="roleName">
                                <a-input placeholder="请输入角色名称" v-model="addRoleData.roleName"></a-input>
                            </a-form-item>
                            <a-form-item label="描述:" name="roleDes">
                                <a-input placeholder="请输入描述信息" v-model="addRoleData.roleDes"></a-input>
                            </a-form-item>
                            <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                                取消
                            </a-button>
                            <a-button type="primary" @click="addRole('addRoleForm')">
                                确认
                            </a-button>
                        </a-form>

                    </a-drawer>

                </a-col>
                <a-col :span="1">
                    <a-button type="primary" @click="editRole">
                        编辑
                    </a-button>
                </a-col>
                <a-col :span="2">
                    <a-button type="danger" @click="delRole">
                        删除
                    </a-button>
                </a-col>
            </a-row>

            <!-- 主体列表部分 -->
            <a-table
                :columns="columns"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                :rowSelection="rowSelection"
                @change="handleTableChange"
            >
                <!--      <template slot="name" slot-scope="name"> {{ name.first }} {{ name.last }}</template>-->
            </a-table>

        </a-space>
    </div>
</template>

<script>
import Api from '../../assets/api/api'
import {CloseOutlined, DownOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
    name: "Role",
    props: [],
    components: {DownOutlined,PlusOutlined,EditOutlined,CloseOutlined},
    watch: {
        '$route'(to, from) {
            console.log(to);
            console.log(from)
        }
    },
    data() {
        let col = [{
            title: '角色名称',
            dataIndex: 'roleName',
            sorter: true,
            width: '20%',
            align: 'center'
            // scopedSlots: {customRender: 'name'},
        },
            {
                title: '角色描述',
                dataIndex: 'roleDes',
                align: 'center',
                ellipsis: true,
                sorter: true,
                width: '20%',
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

            }
        ];
        let page = 0;
        let size = 10;
        let pagination = {
            //单页时隐藏分页
            "hideOnSinglePage": true,
            "defaultPageSize": size,
            "showSizeChanger": true
        };
        return {
            page: page,
            size: size,
            sortName: '',
            orderType: '',
            pagination: pagination,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
            columns: col,
            // rowSelection: rowselection,
            data: [],
            addRoleDradwrvisible: false,
            addRoleData: {
                roleName: '',
                roleDes: '',
                isEditType: false,
                rules: {
                    roleName: [
                        {required: true, message: '请输入角色名称', trigger: 'blur'},
                    ]
                }
            }
        }
    },
    computed: {
        rowSelection() {
            const {selectedRowKeys} = this;
            return {
                onChange: this.onSelectChange,
                // selections: true,
                selectedRowKeys,
                type: 'radio'
                // type:'checkbox'
            }
        }
    },
    created() {
        this.getRoleData();

    },

    mounted() {

    },
    methods: {
        addRole(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.addRoleData);
                    let param = {
                        "roleName": this.addRoleData.roleName,
                        "roleDes": this.addRoleData.roleDes
                    }
                    Api.addRole(param).then(value => {
                        if (value.code === 0) {
                            console.log("新增成功")
                            this.$refs.addRoleForm.resetFields();
                            this.addRoleDradwrvisible = false;
                            this.getRoleData();
                        } else {
                            console.log("新增失败")
                            console.log(value)
                        }
                    }).catch(reason => {
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },

        editRole() {
            this.onDrawerOpen()
            this.addRoleData.isEditType = true;
        },
        delRole() {
            let that = this;
            let selectedRows = this.selectedRows[0];
            if (!selectedRows) {
                console.log("请选择一条数据")
                return false;
            }
            let content = "确认删除'" + selectedRows.roleName + "'吗？";
            console.log(content);

            this.$confirm({
                title: '删除角色',
                content: content,
                onOk() {
                    return Api.delRole(selectedRows.id).then(value => {
                        if (value.code === 0) {
                            console.log("删除成功")
                            that.getRoleData();
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

        getRoleData() {
            this.loading = true;
            let params = {
                "page": this.page,
                "size": this.size,
                "sortName": this.sortName,
                "orderType": this.orderType,
            }
            console.log(params);
            Api.getRoleList(params).then(value => {
                console.log(value);
                this.loading = false;
                if (value.code === 0) {
                    const pagination = {...this.pagination};
                    pagination.total = value.data.totalElements;
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
            this.getRoleData();
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
                this.addRoleData.isEditType = false;
            }
            this.addRoleDradwrvisible = true;
        },

        onDrawerClose(type) {
            console.log(type);
            if (type === 'reset') {
                console.log('重置');
                this.addRoleData.isEditType = false;
            }
            this.addRoleDradwrvisible = false;
        }
    }

}
</script>

<style scoped>

</style>