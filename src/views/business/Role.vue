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
                    layout="vertical"
                    ref="addRoleForm"
                    :model="addRoleData"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-item label="名称:" v-bind="validateInfos.roleName">
                        <a-input placeholder="请输入角色名称" v-model:value="modelRef.roleName"></a-input>
                    </a-form-item>
                    <a-form-item label="值:" v-bind="validateInfos.roleValue">
                        <a-input placeholder="请输入角色值" v-model:value="modelRef.roleValue"></a-input>
                    </a-form-item>
                    <a-form-item label="描述:" v-bind="validateInfos.roleDes">
                        <a-input placeholder="请输入描述信息" v-model:value="modelRef.roleDes"></a-input>
                    </a-form-item>
                    <a-form-item label="排序:" v-bind="validateInfos.sort">
                        <a-input placeholder="请输入排序信息" v-model:value="modelRef.sort"></a-input>
                    </a-form-item>

                    <!--菜单信息-->
                    <a-form-item label="菜单信息:" v-bind="validateInfos.menuInfo">
                        <color-tag v-model:value="modelRef.menuInfo" :tag-list="menTagList">
                            <template #name="item">
                                {{ item.scope.title }}
                            </template>
                        </color-tag>
                    </a-form-item>
                    <a-button :style="{ marginRight: '8px' }" @click="onMenuDrawerOpen('menu')">
                        分配菜单
                    </a-button>
                    <a-form-item label="资源信息:" v-bind="validateInfos.resourceInfo">
                        <color-tag v-model:value="modelRef.resourceInfo" :tag-list="modelRef.resourceInfo"></color-tag>
                    </a-form-item>
                    <a-button :style="{ marginRight: '8px' }" @click="onMenuDrawerOpen('resource')">
                        分配资源
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
                    :title="isMenuType ? '分配菜单' : '分配资源'"
                    :width="720"
                    :visible="menuDradwervisible"
                    :closable="false"
                    :body-style="{ paddingBottom: '80px' }"
                    @close="onMenuDrawerClose('normal')"
                >
                    <!--自定义穿梭框-->
                    <template v-if="isMenuType">
                        <custom-tree-transfer
                            :tree-data-d="menuDrawerData.menuTreeData"
                            :select-id="menuDrawerData.selectId"
                            @dealData="selectMenuData"
                        >
                        </custom-tree-transfer>
                    </template>
                    <template v-else>
                        <resource-detail2 :data="menuDrawerData.resourceDrawerData" :select-data="modelRef.resourceInfo" @dealData="receiveSrouceData"></resource-detail2>
                    </template>
                </a-drawer>

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

                <template #menus="{text, record, index}">
                    <color-tag :tag-list="text">
                        <template #name="item">
                            {{ item.scope.title }}
                        </template>
                    </color-tag>
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
import {message} from 'ant-design-vue';
import {useForm} from "@ant-design-vue/use";
import {computed, reactive, ref, toRefs, watchEffect} from 'vue';
import CustomTreeTransfer from "../../components/CustomTreeTransfer.vue";
import ColorTag from "../../components/ColorTag.vue";
import ResourceDetail from "./components/ResourceDetail.vue";
import ResourceDetail2 from "./components/ResourceDetail2.vue";
import {addRole, changeRoleStatus, delRole, editRole, getRoleList} from "/@/api/Role";
import {getResourceGroupByType} from "/@/api/Resource.ts";
import {getMenuList} from "/@/api/menu";

export default {
    name: "Role",
    props: [],
    components: {ResourceDetail, ResourceDetail2, ColorTag, DownOutlined, PlusOutlined, EditOutlined, CloseOutlined, CustomTreeTransfer},
    setup() {
        const columnsDefines = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                sorter: true,
                fixed: 'left',
                align: 'center'
            },
            {
                title: '角色值',
                dataIndex: 'roleValue',
                sorter: true,
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
                title: '菜单',
                dataIndex: 'menus',
                align: 'center',
                ellipsis: true,
                sorter: true,
                slots: {customRender: 'menus'}
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
            roleValue: '',
            roleDes: '',
            sort: 0,
            menuInfo: [],
            resourceInfo: [],
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
        const isMenuType = ref(true);
        //菜单抽屉数据
        const menuDrawerData = reactive({
            //穿梭框数据
            menuTreeData: [],
            selectId: [],
            //分配资源数据
            resourceDrawerData: []

        });
        const menuRefData = toRefs(menuDrawerData)
        // const useRefStat = toRefs(state)
        watchEffect(() => {
            // console.log("menuDrawerData.menuTreeData", menuDrawerData.menuTreeData)
            // console.log("menuDrawerData.selectId", menuDrawerData.selectId)
            console.log("resourceDrawerData", menuDrawerData.resourceDrawerData)
            console.log("modelRef.resourceInfo", modelRef.resourceInfo)
        })
        const menTagList = computed(() => {
            let ts = menuDrawerData.menuTreeData.filter((value) => menuDrawerData.selectId.includes(value.id));
            modelRef.menuInfo = ts;
            return ts;
        });
        const getResourceGroupByTypeInfo = () => {
            getResourceGroupByType().then(value => {
                if (value.code === 0) {
                    menuDrawerData.resourceDrawerData = value.data;
                } else {
                    console.log("修改失败")
                }
            }).catch(reason => {

            })
        };

        return {
            columnsDefines,
            modelRef,
            rulesRef,
            resetFields,
            validate,
            validateInfos,
            menuDrawerData,
            menuRefData,
            menTagList,
            isMenuType,
            getResourceGroupByTypeInfo
        }
    },

    watch: {
        '$route'(to, from) {
            console.log(to);
            console.log(from)
        },
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
            labelCol: {span: 4},
            wrapperCol: {span: 14},
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
                let menus = [];
                this.modelRef.menuInfo.forEach(value1 => {
                    menus.push({"id": value1.id})
                })
                let _resources = [];
                this.modelRef.resourceInfo.forEach(value1 => {
                    _resources.push({"id": value1.id})
                })
                // console.log("menus", menus)
                let param = {
                    "roleName": this.modelRef.roleName,
                    "roleValue": this.modelRef.roleValue,
                    "roleDes": this.modelRef.roleDes,
                    "sort": this.modelRef.sort,
                    "menus": menus,
                    "resources": _resources
                }
                addRole(param).then(value => {
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
            this.onDrawerOpen('edit')
            this.addRoleData.isEditType = true;

            let menus = [];
            this.modelRef.menuInfo.forEach(value1 => {
                menus.push({"id": value1.id})
            })

            let _resources = [];
            this.modelRef.resourceInfo.forEach(value1 => {
                _resources.push({"id": value1.id})
            })
            let param = {
                "id": this.id,
                "roleName": this.modelRef.roleName,
                "roleValue": this.modelRef.roleValue,
                "roleDes": this.modelRef.roleDes,
                "sort": this.modelRef.sort,
                "menus": menus,
                "resources": _resources
            }
            editRole(param).then(value => {
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
                    return delRole(data.id).then(value => {
                        if (value.code === 0) {
                            message.success(value.msg)
                            that.getRoleData();
                        } else {
                            message.error(value.msg)
                        }
                    }).catch(reason => {
                        message.error("请求异常")
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
            getRoleList(params).then(value => {
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
                    message.error(value.msg)
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
                    return changeRoleStatus({'id': data.id}).then(value => {
                        if (value.code === 0) {
                            message.success(value.msg)
                            that.getRoleData();
                        } else {
                            message.error(value.msg)
                        }
                    }).catch(reason => {
                        message.error('请求异常')
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
                    this.modelRef.roleValue = text.roleValue;
                    this.modelRef.roleDes = text.roleDes;
                    this.modelRef.sort = text.sort;
                    //选择的菜单数据
                    this.modelRef.menuInfo = text.menus;
                    this.menuDrawerData.selectId = text.menus.map(value => value.id);
                    //选择的资源数据
                    this.modelRef.resourceInfo = text.resources;
                    break;
                case 'del':
                    this.delRole(text);
                    break;
                case 'open':
                    this.changeRoleStatus(text);
                    break;
                default :
                    message.error("无效操作")
                    return false;
            }
        },
        // addMenuInit(data) {
        //     console.log(data);
        //     this.onDrawerOpen('add')
        //     this.addParamData.isEditType = false;
        //     this.initEmptyData();
        //     this.addParamData.pid = data.id;
        //     this.addParamData.level = parseInt(data.level) + 1;
        // },
        onDrawerOpen(type) {
            if (type === 'add') {
                this.addRoleData.isEditType = false;
            }
            this.addRoleDradwrvisible = true;
        },

        onDrawerClose(type) {
            if (type === 'reset') {
                this.addRoleData.isEditType = false;
            }
            this.addRoleDradwrvisible = false;
        },
        onMenuDrawerOpen(type) {
            this.menuDradwervisible = true;
            if (type === 'menu') {
                this.isMenuType = true;
            } else if (type === 'resource') {
                this.isMenuType = false;
                this.getResourceGroupByTypeInfo();
            }
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
            //TODO 【分配菜单部分数据获取】  by Janloong_Doo
            getMenuList(params).then(value => {
                if (value.code === 0) {
                    // this.menuDrawerData.menuTreeData = DataUtils.initTreeData(value.data.content);
                    this.menuDrawerData.menuTreeData = value.data.content;
                } else {
                    message.error(value.msg)
                }
                this.loading = false;
            }).catch(reason => {

            });
        },
        //分配菜单的内容
        selectMenuData(type, data) {
            if (type === 'add') {
                this.menuDrawerData.selectId = data;
                // this.modelRef.menuInfo = data;
                this.onMenuDrawerClose();
            } else if (type === 'cancel') {
                this.onMenuDrawerClose();
            }
        },

        receiveSrouceData(type, data) {
            console.log("接收rescouce数据：", type, data);
            if (type === 'add') {
                this.modelRef.resourceInfo = data;
                this.onMenuDrawerClose();
            } else if (type === 'cancel') {
                this.onMenuDrawerClose();
            }
        }
    }

}
</script>

<style scoped>

</style>