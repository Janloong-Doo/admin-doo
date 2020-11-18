<template>
    <div id="index">
        <a-space direction="vertical" size="middle">
            <!--            <a-row type="flex" justify="end" :gutter="1">-->
            <a-row type="flex" justify="space-between" :gutter="1">
                <a-col :span="1">
                    <span>用户列表</span>
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
                :title="addParamData.isEditType?'编辑用户':'新增用户'"
                :width="512"
                :visible="addMenuDradwrvisible"
                :body-style="{ paddingBottom: '100px' }"
                @close="onDrawerClose('normal')"
            >
                <a-form
                    ref="addMenuForm"
                    layout="vertical"
                    :label-col="labelCol" :wrapper-col="wrapperCol"
                >
                    <!--                    <a-form-->
                    <!--                    layout="horizontal"-->
                    <!--                    ref="addMenuForm"-->
                    <!--                    :model="addParamData"-->
                    <!--                    :rules="addParamData.rules"-->
                    <!--                    :label-col="labelCol" :wrapper-col="wrapperCol"-->
                    <!--                >-->

                    <a-form-item label="账户:" v-bind="validateInfos['addData.userName']">
                        <a-input :disabled="addParamData.isEditType" placeholder="请输入用户账户" v-model:value="modelRef.addData.userName"></a-input>
                    </a-form-item>
                    <a-form-item v-if="!addParamData.isEditType" label="密码:" v-bind="validateInfos['addData.password']">
                        <a-input-password placeholder="请输入密码" v-model:value="modelRef.addData.password"></a-input-password>
                    </a-form-item>
                    <a-form-item v-if="!addParamData.isEditType" label="确认密码:" v-bind="validateInfos['addData.passwordRepeat']">
                        <a-input-password placeholder="请确认密码" v-model:value="modelRef.addData.passwordRepeat"></a-input-password>
                    </a-form-item>
                    <a-form-item label="电话:" v-bind="validateInfos['addData.tel']">
                        <a-input placeholder="请输入电话" v-model:value="modelRef.addData.tel"></a-input>
                    </a-form-item>
                    <a-form-item label="昵称:" v-bind="validateInfos['addData.aliaName']">
                        <a-input placeholder="请输入昵称" v-model:value="modelRef.addData.aliaName"></a-input>
                    </a-form-item>
                    <a-form-item label="姓名:" v-bind="validateInfos['addData.trueName']">
                        <a-input placeholder="请输入姓名" v-model:value="modelRef.addData.trueName"></a-input>
                    </a-form-item>
                    <a-form-item label="性别:" v-bind="validateInfos['addData.sex']" requird>
                        <a-radio-group v-model:value="modelRef.addData.sex" button-style="solid">
                            <a-radio-button value="0">男</a-radio-button>
                            <a-radio-button value="1">女</a-radio-button>
                        </a-radio-group>
                    </a-form-item>

                    <a-form-item label="组织:" v-bind="validateInfos['addData.organize']">
                        <a-tree-select
                            v-model:value="modelRef.addData.organize.id"
                            style="width: 100%"
                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                            :tree-data="departmentData"
                            placeholder="请选择组织"
                            :replaceFields="replaceFields"
                            allow-clear
                        >
                            <template #title="{ key, value }">
                                <span style="color: #08c">001{{ key }} </span>
                            </template>
                        </a-tree-select>
                    </a-form-item>
                    <a-form-item label="角色" v-bind="validateInfos['addData.roles']">
                        <a-tree-select
                            v-model:value="modelRef.addData.roles"
                            style="width: 100%"
                            :tree-data="roleData"
                            tree-checkable
                            :replaceFields="replaceFieldsRole"
                            allow-clear
                            :show-checked-strategy="SHOW_PARENT"
                            search-placeholder="请选择角色"
                        />
                    </a-form-item>


                    <a-form-item>
                        <a-button :style="{ marginRight: '8px' }" @click="resetFields">
                            重置
                        </a-button>
                        <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                            取消
                        </a-button>
                        <a-button type="primary" @click="saveMenu">
                            确认
                        </a-button>
                    </a-form-item>
                </a-form>

            </a-drawer>


            <!-- 主体列表部分 -->
            <a-table
                :columns="columnsDefines"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                :rowSelection="rowSelection"
                @change="handleTableChange"
                :scroll="{ x: '120%' }"
                tableLayout="fixed"
            >
                <!--                bordered-->
                <!--                tableLayout="auto"-->
                <template #sex="{text, record, index}">
                    <a-tag :color="text === 0?'blue':'pink'">{{ text === 0 ? '男' : '女' }}</a-tag>
                </template>
                <template #organize="{text, record, index}">
                    <span v-if="(text!=null&&text.organizeName)">{{ text.organizeName }}</span>
                    <span v-else>
                    <a-tag color="red">未分配</a-tag>
                    </span>
                </template>
                <template #roles="{text, record, index}">
                    <template v-if="(text!=null&&text.length>0)" v-for="(item,index) in text" :key="item.id">
                        <!--                        <a-tag :key="item.id" :color="randomColor">-->
                        <a-tag :color="this.tagColor[Math.floor((Math.random() * this.tagColor.length) + 1) % this.tagColor.length]">
                            {{ item.roleName }}
                        </a-tag>
                    </template>
                    <span v-else>
                    <a-tag color="red">未分配</a-tag>
                    </span>
                </template>
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
                                <a-menu-item key="resetPass">
                                    重置密码
                                    <RollbackOutlined/>
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

<script>
import Api from '../../assets/api/api'
import {createVNode, reactive} from 'vue';
import {useForm} from '@ant-design-vue/use';
import {message, Modal, TreeSelect} from 'ant-design-vue';
import {CloseOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, RollbackOutlined} from '@ant-design/icons-vue';
import DataUtils from "../../assets/js/DataUtils";

let messageKey = "UserManagerKey";
export default {
    name: "UserManager",
    components: {DownOutlined, PlusOutlined, EditOutlined, CloseOutlined, RollbackOutlined, ExclamationCircleOutlined},
    props: [],
    setup() {
        const departmentData = [];
        const roleData = [];
        const replaceFields = {
            title: "organizeName",
            key: "id",
            children: "children",
            value: "id"
        };
        const replaceFieldsRole = {
            title: "roleName",
            key: "id",
            children: "children",
            value: "id"
        };
        const modelRef = reactive({
            addData: {
                userName: '',
                password: '',
                passwordRepeat: '',
                aliaName: '',
                trueName: '',
                tel: '',
                sex: "0",
                organize: {
                    id: ''
                },
                roles: []
            },
        });
        const rulesRef = reactive({
            'addData.userName': [
                {
                    required: true,
                    message: '请输入账号',
                    trigger: ['change', 'blur']
                },
            ],
            'addData.password': [
                {
                    required: true,
                    message: '请输入密码',
                    trigger: ['change', 'blur']
                }
            ],
            'addData.passwordRepeat': [
                {
                    required: true,
                    message: '请再次输入密码',
                    trigger: 'blur'
                },
                {
                    validator: async (rule, value) => {
                        console.log()
                        if (value !== modelRef.addData.password) {
                            return Promise.reject("密码不一致");
                        }
                        return Promise.resolve();
                    }
                },
            ],
        });
        const {resetFields, validate, validateInfos} = useForm(modelRef, rulesRef, {immediate: true});
        const columnsDefines = [
            {
                title: '账户',
                dataIndex: 'userName',
                sorter: true,
                // width: '40%',
                align: 'center',
                fixed: 'left'
            },
            {
                title: '昵称',
                dataIndex: 'aliaName',
                ellipsis: true,
                align: 'center',
                sorter: true,
            }, {
                title: '姓名',
                dataIndex: 'trueName',
                ellipsis: true,
                align: 'center',
                sorter: true,
            },
            {
                title: '电话',
                dataIndex: 'tel',
                align: 'center',
                sorter: true,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                align: 'center',
                slots: {customRender: 'sex'}

            },
            {
                title: '组织',
                dataIndex: 'organize',
                align: 'center',
                slots: {customRender: 'organize'}
            },
            {
                title: '角色',
                dataIndex: 'roles',
                align: 'center',
                slots: {customRender: 'roles'}
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
                key: 'operation',
                fixed: 'right',
                // dataIndex: 'operation',
                slots: {customRender: 'operation'},
            }
        ];
        const tagColor = ["blue", "pink", "orange", "red", "green", "cyan", "purple"]

        return {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
            validateInfos,
            resetFields,
            modelRef,
            // onSubmit,
            validate,
            columnsDefines,
            tagColor,
            departmentData,
            replaceFields,
            replaceFieldsRole,
            roleData,
        };
    },
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
        },
    },
    data() {
        let page = 0;
        let size = 100;
        let pagination = {
            //单页时隐藏分页
            "hideOnSinglePage": true,
            "defaultPageSize": size,
            "showSizeChanger": true
        };
        return {
            SHOW_PARENT: TreeSelect.SHOW_PARENT,
            page: page,
            size: size,
            sortName: '',
            orderType: '',
            pagination: pagination,
            selectedRowKeys: [],
            selectedRows: [],
            loading: false,
            // rowSelection: rowselection,
            sourceData: [],
            data: [],
            addMenuDradwrvisible: false,

            addParamData: {
                id: '',
                //base
                firstData: false,
                isEditType: false,
                isRootMenu: false,
                isMenuOpen: false,
            }
        }
    },

    created() {
        this.getMenuData();
        this.getDepartment();
        this.getRoleData();
    },

    mounted() {

    },
    methods: {
        saveMenu() {
            if (this.addParamData.isEditType) {
                this.editMenu();
            } else {
                this.addMenu();
            }
        },
        addMenu() {
            this.validate().then(value => {
                let roles = [];
                this.modelRef.addData.roles.forEach(value1 => {
                    roles.push({"id": value1})
                });
                let param = {
                    "userName": this.modelRef.addData.userName,
                    "password": this.modelRef.addData.password,
                    "aliaName": this.modelRef.addData.aliaName,
                    "trueName": this.modelRef.addData.trueName,
                    "sex": this.modelRef.addData.sex,
                    "tel": this.modelRef.addData.tel,
                    "organize": {"id": this.modelRef.addData.organize.id},
                    "roles": roles
                }
                Api.addUserManager(param).then(value => {
                    if (value.code === 0) {
                        console.log("新增成功")
                        this.resetFields();
                        this.addMenuDradwrvisible = false;
                        this.getMenuData();
                    } else {
                        console.log("新增失败")
                        console.log(value)
                    }
                }).catch(reason => {
                    console.log('error submit!!');
                    return false;
                })
            })
        },

        editMenu() {
            this.validate().then(value => {
                let id = this.addParamData.id;
                let roles = [];
                this.modelRef.addData.roles.forEach(value1 => {
                    roles.push({"id": value1})
                });
                let param = {
                    "id": id,
                    "aliaName": this.modelRef.addData.aliaName,
                    "trueName": this.modelRef.addData.trueName,
                    "sex": this.modelRef.addData.sex,
                    "tel": this.modelRef.addData.tel,
                    "organize": {
                        "id": this.modelRef.addData.organize.id,
                    },
                    "roles": roles
                }
                Api.editUserManagerList(param).then(value => {
                    if (value.code === 0) {
                        console.log("修改成功")
                        this.resetFields();
                        this.addMenuDradwrvisible = false;
                        this.addParamData.isEditType = false
                        this.getMenuData();
                    } else {
                        console.log("修改失败")
                        console.log(value)
                    }
                }).catch(reason => {
                    console.log('request error');
                    return false;
                })
            }).catch(reason => {
                console.log('error validate!!');
                return false;
            })
        },
        addMenuInit(data) {
            console.log(data);
            this.onDrawerOpen('add')
            this.addParamData.isEditType = false;
            this.initEmptyData();
            this.addParamData.pid = data.id;
            this.addParamData.level = parseInt(data.level) + 1;
        },

        editMenuInit(data) {
            this.addParamData.isEditType = true;
            this.onDrawerOpen()
            //初始化数据
            this.addParamData.id = data.id;
            this.modelRef.addData.userName = data.userName;
            this.modelRef.addData.password = 'data.userName';
            this.modelRef.addData.passwordRepeat = 'data.userName';
            this.modelRef.addData.aliaName = data.aliaName;
            this.modelRef.addData.trueName = data.trueName;
            this.modelRef.addData.tel = data.tel;
            this.modelRef.addData.sex = data.sex + "";
            this.modelRef.addData.organize.id = data.organize === null ? "" : data.organize.id;
            if (data.roles.length > 0) {
                data.roles.forEach(value => {
                    this.modelRef.addData.roles.push(value.id)
                })
            }
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
                    return Api.delDic(selectedRows.id).then(value => {
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
            Api.getUserManagerList(params).then(value => {
                console.log(value);
                this.loading = false;
                if (value.code === 0) {
                    const pagination = {...this.pagination};
                    pagination.total = value.data.totalElements;
                    this.sourceData = value.data.content;
                    this.data = this.sourceData;
                    this.pagination = pagination;
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
            console.log("禁用数据", data)
            let content = "确认修改用户'" + data.userName + "'的状态吗？";
            this.$confirm({
                title: '修改用户',
                content: content,
                onOk() {
                    return Api.disableUserManager({'id': data.id}).then(value => {
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
                case 'resetPass':
                    this.resetPass(text);
                    break;
                default :
                    return false;
            }
        },
        initEmptyData() {
            this.addParamData.isEditType = false;
            this.addParamData.name = '';
            this.addParamData.value = '';
            this.addParamData.menupidUrl = '';
            this.addParamData.level = '';
            this.addParamData.description = '';
            this.addParamData.sort = 0;
        },
        resetPass(data) {
            Modal.confirm({
                title: '重置密码',
                icon: createVNode(ExclamationCircleOutlined),
                content: "是否重置用户'" + data.userName + "'的密码?",
                okText: "确认",
                cancelText: "取消",
                onOk() {
                    message.loading({content: "重置中"}, messageKey)
                    return Api.resetUserManagerPassword({'id': data.id}).then(value => {
                        if (value.code === 0) {
                            message.success({content: value.msg, messageKey})
                        } else {
                            message.error({content: value.msg, messageKey})
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    });
                },

                onCancel() {
                },
            });
        },
        getDepartment() {
            Api.getDepartMentList().then(value => {
                this.resultData = value.data;
                if (value.code === 0) {
                    // 数据组装
                    this.departmentData = DataUtils.initTreeData(value.data.content);
                }
            })
        },
        getRoleData() {
            this.loading = true;
            let params = {
                "page": 0,
                "size": 100,
                "sortName": "sort",
                "orderType": "asc",
            }
            Api.getRoleList(params).then(value => {
                if (value.code === 0) {
                    this.roleData = value.data.content;
                } else {
                }
            }).catch(reason => {

            });
        },
    }

}
</script>

<style scoped>

</style>