<template>
  <div id="index">
    <a-form-model
        :layout="department.layout"
        :model="department.data"
        v-bind="formItemLayout"
        :rules="department.rules"
        ref="departmentRef">
      <!--      <a-form-model-item label="Form Layout">-->
      <!--        <a-radio-group v-model="form.layout">-->
      <!--          <a-radio-button value="horizontal">-->
      <!--            Horizontal-->
      <!--          </a-radio-button>-->
      <!--          <a-radio-button value="vertical">-->
      <!--            Vertical-->
      <!--          </a-radio-button>-->
      <!--          <a-radio-button value="inline">-->
      <!--            Inline-->
      <!--          </a-radio-button>-->
      <!--        </a-radio-group>-->
      <!--      </a-form-model-item>-->

      <a-form-model-item label="新增类型" prop="deptType">
        <a-radio-group v-model="department.data.deptType" has-feedback>
          <a-radio-button value="0">
            同级节点
          </a-radio-button>
          <a-radio-button value="1">
            子节点
          </a-radio-button>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="组织" prop="rightNodeId">
        <a-tree-select
            v-model="department.data.rightNodeId"
            style="width: 30%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="department.departmentData"
            :replaceFields="department.departmentFiled"
            placeholder="选择节点"
            @select="departmentSelect"
            has-feedback
        >
        </a-tree-select>
      </a-form-model-item>

      <a-form-model-item label="内容" prop="deptName" has-feedback>
        <a-input v-model="department.data.deptName"
                 style="width: 30%"
                 autocomplete="off"
        ></a-input>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4}">
        <a-space size="middle">
          <a-button type="primary" @click="addDepartment('departmentRef')">新增节点</a-button>
          <a-button type="primary" @click="delDepartment('departmentRef')">删除节点</a-button>
        </a-space>
      </a-form-model-item>


    </a-form-model>
  </div>
</template>

<script>
import Api from "../../assets/api/api.js";
import {Message} from "ant-design-vue";
import DataUtils from "../../assets/js/DataUtils";

export default {
  name: "Department",
  props: [],
  watch: {
    '$route'(to, from) {
      // console.log(to);
      // console.log(from)
    },

    'department.rightNodeId'(newValue, oldValue) {
      // console.log("watch-rightNode");
      // console.log(newValue);
    },
  },
  data() {

    let deptRuleValidate = (rule, value, callback) => {
      console.log("开始校验")
      console.log(value)
      if (value === '') {
        console.log("空")
        Message.error("空asdasd")
        callback(new Error('请输入名称'));
      } else {
        callback();
      }
    };

    return {
      department: {
        resultData: [],
        departmentData: [],
        departmentFiled: {},
        layout: 'horizontal',
        data: {
          rightNodeId: '',
          deptType: '',
          deptName: '',
        },
        rules: {
          deptName: [
            // {validator: deptRuleValidate, trigger: 'blur'}
            {required: true, message: '请输入内容', trigger: 'blur'},
            {min: 2, max: 8, message: '允许长度2-8位', trigger: 'blur'},
          ],
          deptType: [
            {required: true, message: '请选择节点类型', trigger: 'change'},
          ],
          rightNodeId: [
            {required: true, message: '请选择节点', trigger: 'change'},
          ]
        }
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
    }

  },

  methods: {
    //获取用户组织结构树
    getDepartment() {
      Api.getDepartMentList().then(value => {
        this.resultData = value.data;
        if (value.code === 0) {
          this.department.departmentFiled.title = "organizeName";
          this.department.departmentFiled.key = "id";
          this.department.departmentFiled.children = "children";
          this.department.departmentFiled.value = "id";
          // 数据组装
          this.department.departmentData = DataUtils.initTreeData(value.data);
        }
      })
    },
    addDepartment(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let deptType = this.department.data.deptType;
          let rightNodeIdC = this.department.data.rightNodeId;
          let s = this.resultData.filter(value => value.id === rightNodeIdC)[0];
          console.log(deptType);
          let param = {
            "organizeName": this.department.data.deptName,
            "pid": deptType === '0' ? s.pid : s.id,
            "level": deptType === '0' ? s.level : s.level + 1,
            "sort": "0"
          }
          Api.addDepartMent(param).then(value => {
            console.log(value)
            if (value.code === 0) {
              console.log("新增成功")
              this.getDepartment();
            } else {
              console.log("新增失败")
              console.log(value)
            }
          });
          this.$refs.departmentRef.resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    delDepartment(formName) {
      console.log("dianji")
      let rightNodeIdC = this.department.data.rightNodeId;
      let s = this.resultData.filter(value => value.id === rightNodeIdC)[0];
      let content = "确认删除'" + s.organizeName + "'吗？";
      this.$confirm({
        title: '删除节点',
        content: content,
        onOk() {
          return Api.delDepartMent(rightNodeIdC).then(value => {
            if (value.code === 0) {
              console.log("删除成功")
            } else {
              console.log("删除失败")
              console.log(value)
            }
          }).catch(reason => {
            console.log('请求异常');
            console.log(reason);
          })
        },
        onCancel() {
        }

      });
      this.$refs.departmentRef.resetFields();
      this.getDepartment();
    },
    departmentSelect(value, node, extra) {
      console.log("antd选择树");
      console.log(value);
      console.log(node.title);
      this.department.data.rightNodeId = value;
    }

  }
}
</script>

<style scoped>

</style>