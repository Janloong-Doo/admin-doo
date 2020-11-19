<template>
    <div id="index">

        <a-space direction="vertical" size="middle">
            <a-row type="flex" justify="space-between" align="middle" :gutter="1">
                <a-col :span="1">
                    <span>角色列表</span>
                </a-col>
                <a-col v-if="firstData" :span="1">
                    <a-button type="primary" @click="onDrawerOpen('add')">新增</a-button>
                </a-col>
            </a-row>

            <!--  新增角色抽屉显示  -->
            <a-drawer
                :title="addRoleData.isEditType?'编辑角色':'新增角色'"
                :width="720"
                :closable="false"
                :visible="addRoleDradwrvisible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onDrawerClose('normal')"
            >
                <a-form
                    layout="horizontal"
                    ref="addRoleForm"
                    :model="addRoleData"
                >
                    <a-form-item label="名称:" v-bind="validateInfos.roleName">
                        <a-input placeholder="请输入角色名称" v-model:value="modelRef.roleName"></a-input>
                    </a-form-item>
                    <a-form-item label="描述:" v-bind="validateInfos.roleDes">
                        <a-input placeholder="请输入描述信息" v-model:value="modelRef.roleDes"></a-input>
                    </a-form-item>
                    <a-form-item label="排序:" v-bind="validateInfos.sort">
                        <a-input placeholder="请输入排序信息" v-model:value="modelRef.sort"></a-input>
                    </a-form-item>


                    <a-button :style="{ marginRight: '8px' }" @click="onMenuDrawerOpen">
                        分配菜单
                    </a-button>

                    <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                        取消
                    </a-button>
                    <a-button type="primary" @click="saveData">
                        确认
                    </a-button>
                </a-form>

                <!--菜单资源抽屉-->
                <a-drawer
                    title="分配菜单"
                    :width="720"
                    :visible="menuDradwervisible"
                    :closable="false"
                    :body-style="{ paddingBottom: '80px' }"
                    @close="onMenuDrawerClose('normal')"
                >

                </a-drawer>
                <!--自定义穿梭框-->
                <custom-tree-transfer :tree-datad="menuDrawerData.menuTreeData" :select-data="menuDrawerData.selectData">

                </custom-tree-transfer>

            </a-drawer>


            <!-- 主体列表部分 -->
            <a-table
                :columns="columnsDefines"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                :scroll="{ x: '120%' }"
                @change="handleTableChange"
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
                                <a-menu-item key="menuResource">
                                    菜单资源
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

<script>
import Api from '../../assets/api/api'
import {CloseOutlined, DownOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {message} from 'ant-design-vue';
import {useForm} from "@ant-design-vue/use";
import {reactive} from 'vue';
import DataUtils from "../../assets/js/DataUtils";
import CustomTreeTransfer from "../../components/CustomTreeTransfer.vue";

export default {
    name: "Role",
    props: [],
    components: {DownOutlined, PlusOutlined, EditOutlined, CloseOutlined, CustomTreeTransfer},
    setup() {
        const columnsDefines = [{
            title: '角色名称',
            dataIndex: 'roleName',
            sorter: true,
            fixed: 'left',
            align: 'center'
        },
            {
                title: '角色描述',
                dataIndex: 'roleDes',
                align: 'center',
                ellipsis: true,
                sorter: true,
            },
            {
                title: '排序',
                dataIndex: 'sort',
                align: 'center',
                ellipsis: true,
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
                key: 'operation',
                fixed: 'right',
                // dataIndex: 'operation',
                slots: {customRender: 'operation'},
            }
        ];
        //表单数据相关
        const modelRef = reactive({
            roleName: '',
            roleDes: '',
            sort: 0,
        });
        const rulesRef = reactive({
            roleName: [
                {
                    required: true,
                    message: '请输入角色名称',
                    trigger: ['change', 'blur']
                },
            ],
        });
        const {resetFields, validate, validateInfos} = useForm(modelRef, rulesRef, {immediate: true});

        //菜单抽屉数据
        const menuDrawerData =reactive({
        //穿梭框数据
            menuTreeData: [],
            selectData: []
        }) ;
        return {
            columnsDefines,
            modelRef,
            rulesRef,
            resetFields,
            validate,
            validateInfos,
            menuDrawerData,
        }
    },

    watch: {
        '$route'(to, from) {
            console.log(to);
            console.log(from)
        }
    },
    data() {
        let page = 0;
        let size = 10;
        let pagination = {
            //单页时隐藏分页
            "hideOnSinglePage": true,
            "defaultPageSize": size,
            "showSizeChanger": true
        };
        const replaceMenuTreeFields = {
            title: "name",
            key: "id",
            children: "children",
        }
        return {
            replaceMenuTreeFields: replaceMenuTreeFields,
            //基础数据
            id: '',
            page: page,
            size: size,
            sortName: 'sort',
            orderType: 'asc',
            pagination: pagination,
            loading: false,
            //页面数据
            //表格数据
            data: [],
            addRoleDradwrvisible: false,
            menuDradwervisible: false,
            addRoleData: {
                roleName: '',
                roleDes: '',
                isEditType: false,
            },
            addParamData: {
                isEditeType: false
            },

        }
    },
    wathch: {

    },
    computed: {
        firstData() {
            if (this.data.length > 0) {
                return false;
            }
            return true;
        },

    },
    created() {
        this.getRoleData();
        this.getMenuData()
    },

    mounted() {
    },
    methods: {
        saveData() {
            if (this.addParamData.isEditType) {
                this.editRole();
            } else {
                this.addRole();
            }
        },
        addRole() {
            this.validate().then(value => {
                let param = {
                    "roleName": this.modelRef.roleName,
                    "roleDes": this.modelRef.roleDes,
                    "sort": this.modelRef.sort
                }
                Api.addRole(param).then(value => {
                    if (value.code === 0) {
                        message.success(value.msg);
                        this.addRoleDradwrvisible = false;
                        this.resetFields();
                        this.getRoleData();
                    } else {
                        message.error(value.msg);
                    }
                }).catch(reason => {
                })
            }).catch(reason => {
            })
        },


        editRole() {
            this.onDrawerOpen()
            this.addRoleData.isEditType = true;
            let param = {
                "id": this.id,
                "roleName": this.modelRef.roleName,
                "roleDes": this.modelRef.roleDes,
                "sort": this.modelRef.sort
            }
            Api.editRole(param).then(value => {
                if (value.code === 0) {
                    this.onDrawerClose('reset')
                    message.success(value.msg)
                    this.getRoleData();
                } else {
                    message.error(value.msg)
                }
            }).catch(reason => {
            })
        },
        delRole(data) {
            let that = this;
            let content = "确认删除'" + data.roleName + "'吗？";
            this.$confirm({
                title: '删除角色',
                content: content,
                onOk() {
                    return Api.delRole(data.id).then(value => {
                        if (value.code === 0) {
                            message.success(value.msg)
                            that.getRoleData();
                        } else {
                            message.error(value.msg)
                        }
                    }).catch(reason => {
                        message.error("请求异常")
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
                "sort": this.sortName,
                "direction": this.orderType,
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
        changeRoleStatus(data) {
            let that = this;
            let content = "确认修改角色'" + this.modelRef.roleName + "'的状态吗？";
            this.$confirm({
                title: '修改角色',
                content: content,
                onOk() {
                    return Api.changeRoleStatus({'id': data.id}).then(value => {
                        if (value.code === 0) {
                            message.success(value.msg)
                            that.getRoleData();
                        } else {
                            message.error(value.msg)
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    });
                }

            })
        },

        //处理啊表格切换事件
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

        //操作选项
        handleSelectMenu(event, text, record, index) {
            switch (event) {
                case 'add':
                    this.onDrawerOpen('add')
                    this.addParamData.isEditType = false;
                    this.resetFields()
                    break;
                case 'edit':
                    this.addParamData.isEditType = true;
                    //打开编辑窗口
                    this.onDrawerOpen()
                    //初始化数据
                    this.id = text.id;
                    this.modelRef.roleName = text.roleName;
                    this.modelRef.roleDes = text.roleDes;
                    this.modelRef.sort = text.sort;
                    break;
                case 'del':
                    this.delRole(text);
                    break;
                case 'open':
                    this.changeRoleStatus(text);
                    break;
                case 'menuResource':

                    break;
                default :
                    message.error("无效操作")
                    return false;
            }
        },
        addMenuInit(data) {
            console.log(data);
            this.onDrawerOpen('add')
            this.addParamData.isEditType = false;
            this.initEmptyData();
            this.addParamData.pid = data.id;
            this.addParamData.level = parseInt(data.level) + 1;
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
        },
        onMenuDrawerOpen() {
            this.menuDradwervisible = true;
            // this.getMenuData()
        },
        onMenuDrawerClose() {
            this.menuDradwervisible = false;
        },
        getMenuData() {
            this.loading = true;
            let params = {
                "page": 0,
                "size": 100,
                "sort": 'sort',
                "direction ": 'asc',
            }
            console.log(params);
            Api.getMenuList(params).then(value => {
                if (value.code === 0) {
                    this.menuDrawerData.menuTreeData = DataUtils.initTreeData(value.data.content);
                    console.log('menuTreeData', this.menuDrawerData.menuTreeData);
                } else {
                    console.log("获取失败")
                    console.log(value)
                }
                this.loading = false;
            }).catch(reason => {

            });
        },

    }

}
</script>

<style scoped>

</style>