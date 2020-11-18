<template>
    <div id="index">
        <a-space direction="vertical" size="middle">
            <!--            <a-row type="flex" justify="end" :gutter="1">-->
            <a-row type="flex" justify="space-between" :gutter="1">
                <a-col :span="1">
                    <span>组织列表</span>
                </a-col>
                <a-col v-if="firstData" :span="1">
                    <a-space>
                        <a-button type="primary" @click="onDrawerOpen('add')">新增</a-button>
                        <!--                        <a-button type="primary" @click="editMenu">编辑</a-button>-->
                    </a-space>
                </a-col>
            </a-row>
            <!--  新增组织抽屉显示  -->
            <a-drawer
                :title="isEditType?'编辑组织':'新增组织'"
                :width="512"
                :visible="addDataDradwrvisible"
                :body-style="{ paddingBottom: '100px' }"
                @close="onDrawerClose('normal')"
            >
                <a-form
                    ref="addMenuForm"
                    layout="vertical"
                    :label-col="labelCol" :wrapper-col="wrapperCol"
                >
                    <a-form-item label="组织名称:" v-bind="validateInfos.organizeName">
                        <a-input  placeholder="请输入组织名称" v-model:value="modelRef.organizeName"></a-input>
                    </a-form-item>
                    <a-form-item  label="描述:" v-bind="validateInfos.description">
                        <a-input placeholder="请输入描述信息" v-model:value="modelRef.description"></a-input>
                    </a-form-item>
                    <a-form-item  label="排序:" v-bind="validateInfos.sort">
                        <a-input placeholder="请输入排序信息" v-model:value="modelRef.sort"></a-input>
                    </a-form-item>
                    <a-form-item v-if="!firstData&&!isEditType" label="根子节点选择:" name="isRootMenu">
                        <!--                        <a-switch checked-children="根" un-checked-children="子" :checked="addMenuData.isRootMenu"/>-->
                        <a-switch checked-children="根" un-checked-children="子" @change="rootMenuCheck"/>
                    </a-form-item>

                    <a-form-item>
                        <a-button :style="{ marginRight: '8px' }" @click="resetFields">
                            重置
                        </a-button>
                        <a-button :style="{ marginRight: '8px' }" @click="onDrawerClose('reset')">
                            取消
                        </a-button>
                        <a-button type="primary" @click="saveData">
                            确认
                        </a-button>
                    </a-form-item>
                </a-form>

            </a-drawer>

            <a-table
                :columns="columnsDefines"
                :row-key="record => record.id"
                :data-source="data"
                :loading="loading"
                :pagination="pagination"
                @change="handleTableChange"
                :scroll="{ x: '120%' }"
                tableLayout="fixed"
            >
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
                    <template  v-if="(text!=null&&text.length>0)" v-for="(item,index) in text" :key="item.id">
                        <a-tag  :color="this.tagColor[Math.floor((Math.random() * this.tagColor.length) + 1) % this.tagColor.length]">
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
import Api from "../../assets/api/api.ts";
import {CloseOutlined, DownOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, RollbackOutlined} from '@ant-design/icons-vue';
import {message, Modal, TreeSelect} from 'ant-design-vue';
import DataUtils from "../../assets/js/DataUtils";
import {useForm} from "@ant-design-vue/use";
import {createVNode, reactive} from 'vue';

export default {
    name: "Department",
    props: [],
    components: {DownOutlined, PlusOutlined, EditOutlined, CloseOutlined, RollbackOutlined, ExclamationCircleOutlined},
    setup() {
        const modelRef = reactive({
            organizeName: '',
            description: '',
            sort: 0,
        });
        const rulesRef = reactive({
            organizeName: [
                {
                    required: true,
                    message: '请输入名称',
                    trigger: ['change', 'blur']
                },
            ],
        });
        const {resetFields, validate, validateInfos} = useForm(modelRef, rulesRef, {immediate: true});
        const columnsDefines = [
            {
                title: '组织名称',
                dataIndex: 'organizeName',
                sorter: true,
                align: 'center',
                fixed: 'left'
            },
            {
                title: '描述',
                dataIndex: 'description',
                ellipsis: true,
                align: 'center',
                sorter: true,
            },
            {
                title: '层级',
                dataIndex: 'level',
                align: 'center',
                sorter: true,
            }, {
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
                key: 'operation',
                fixed: 'right',
                // dataIndex: 'operation',
                slots: {customRender: 'operation'},
            }
        ];
        return {
            validateInfos,
            resetFields,
            modelRef,
            // onSubmit,
            validate,
            columnsDefines,
        }
    },
    watch: {
        '$route'(to, from) {
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
            page: page,
            size: size,
            sortName: 'sort',
            orderType: 'asc',
            labelCol: {span: 6},
            wrapperCol: {span: 14},
            pagination : pagination,
            id: '',
            pid: '',
            level: '',
            data: [],
            loading: false,
            addDataDradwrvisible: false,
            isEditType: false,
            isRootMenu: false,
            department: {
                resultData: [],
                departmentData: [],
                departmentFiled: {},
            },
        }
    },
    beforeCreate() {

    },
    created() {
        this.getDepartment();
    },

    mounted() {

    },
    updated() {
    },
    computed: {
        formItemLayout() {
            const {layout} = this.department;
            return layout === 'horizontal'
                ? {
                    labelCol: {span: 4},
                    wrapperCol: {span: 14},
                }
                : {};
        },
        firstData() {
            if (this.data.length > 0) {
                return false;
            }
            return true;
        }
    },

    methods: {
        saveData() {
            if (this.isEditType) {
                this.editData();
            } else {
                this.addData();
            }
        },
        //获取组织组织结构树
        getDepartment() {
            let param={
                "page": this.page,
                "size": this.size,
                "sort": this.sortName,
                "direction ": this.orderType,
            }
            Api.getDepartMentList(param).then(value => {
                if (value.code === 0) {
                    this.data = DataUtils.initTreeData(value.data.content);
                }
            })
        },
        addData() {
            this.validate().then(value => {
                let pid = this.isRootMenu ? '0' : this.pid;
                let level = this.isRootMenu ? '1' : this.level;
                let param = {
                    "organizeName": this.modelRef.organizeName,
                    "pid": pid,
                    "description": this.modelRef.description,
                    "level": level,
                    "sort": this.modelRef.sort
                }
                Api.addDepartMent(param).then(value => {
                    console.log(value)
                    if (value.code === 0) {
                        message.success(value.msg)
                        this.addDataDradwrvisible = false;
                        this.resetFields();
                        this.getDepartment();
                    } else {
                        message.error(value.msg)
                    }
                });
                this.$refs.departmentRef.resetFields();
            }).catch(reason => {
            });
        },
        editData() {
            this.onDrawerOpen()
            this.isEditType = true;
            let param = {
                "id": this.id,
                "organizeName": this.modelRef.organizeName,
                "sort": this.modelRef.sort,
                "description": this.modelRef.description,
            }
            Api.editOrg(param).then(value => {
                if (value.code === 0) {
                    this.onDrawerClose('reset')
                    message.success(value.msg)
                    this.getDepartment();
                } else {
                    message.error(value.msg)
                }
            }).catch(reason => {
            })
        },
        delDepartment(data) {
            let that = this;
            let content = "确认删除'" + data.organizeName + "'吗？";
            Modal.confirm({
                title: '删除节点',
                content: content,
                onOk() {
                    return Api.delDepartMent(data.id).then(value => {
                        if (value.code === 0) {
                            message.success(value.msg)
                            that.getDepartment();
                        } else {
                            message.error(value.msg)
                        }
                    }).catch(reason => {
                        console.log('请求异常');
                        console.log(reason);
                    })
                },
                onCancel() {
                }

            });
        },
        changeOrgStatus(data){
            let that = this;
            let content = "确认修改角色'" + data.organizeName + "'的状态吗？";
            this.$confirm({
                title: '修改角色',
                content: content,
                onOk() {
                    return Api.changeOrgStatus({'id': data.id}).then(value => {
                        if (value.code === 0) {
                            message.success(value.msg)
                            that.getDepartment();
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
        //操作选项
        handleSelectMenu(event, text, record, index) {
            switch (event) {
                case 'add':
                    this.onDrawerOpen('add')
                    this.isEditType = false;
                    this.pid = text.id
                    this.level = parseInt(text.level) + 1;
                    this.resetFields()
                    break;
                case 'edit':
                    this.isEditType = true;
                    //打开编辑窗口
                    this.onDrawerOpen()
                    //初始化数据
                    this.id = text.id;
                    this.level = text.level;
                    this.pid = text.pid;
                    this.modelRef.organizeName = text.organizeName;
                    this.modelRef.description = text.description;
                    this.modelRef.sort = text.sort;
                    break;
                case 'del':
                    this.delDepartment(text);
                    break;
                case 'open':
                    this.changeOrgStatus(text);
                    break;
                default :
                    message.error("无效操作")
                    return false;
            }
        },

        departmentSelect(value, node, extra) {
            console.log("antd选择树");
            console.log(value);
            console.log(node.title);
            this.department.data.rightNodeId = value;
        },
        onDrawerOpen(type) {
            if (type === 'add') {
                this.isEditType = false;
            }
            this.addDataDradwrvisible = true;
        },
        onDrawerClose(type) {
            console.log(type);
            if (type === 'reset') {
                console.log('重置');
                this.isEditType = false;
            }
            this.addDataDradwrvisible = false;
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
            this.getDepartment();
            this.sortName = '';
            this.orderType = '';
            // ...filters,
        },
        //根子节点切换
        rootMenuCheck(check) {
            this.isRootMenu = check;
        }
    }
}
</script>

<style scoped>

</style>