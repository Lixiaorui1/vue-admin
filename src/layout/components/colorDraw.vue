<template>
  <el-drawer
    :visible.sync="drawer"
    direction="rtl"
    :close-on-press-escape="false"
    :wrapperClosable="false"
    :modal="false"
    @closed="closed"
    custom-class="color_draw"
  >
    <template slot="title">
      <div>选择你喜欢的颜色</div>
    </template>
    <div class="color_draw_content">
      <el-form :model="formData" ref="form">
        <el-form-item
          label="主色"
          prop="themeColor"
          :label-width="formLabelWidth"
        >
          <el-color-picker
            v-model="formData.themeColor"
            show-alpha
            color-format="hex"
            :predefine="predefineColors"
            @change="colorItemChange('themeColor')"
          >
          </el-color-picker>
          <span class="color_txt">{{ formData.themeColor }}</span>
        </el-form-item>
        <el-form-item
          label="浅色背景"
          prop="hoverColor"
          :label-width="formLabelWidth"
        >
          <el-color-picker
            v-model="formData.hoverColor"
            show-alpha
            color-format="hex"
            :predefine="predefineColors"
            @change="colorItemChange('hoverColor')"
          >
          </el-color-picker>
          <span class="color_txt">{{ formData.hoverColor }}</span>
        </el-form-item>
        <el-form-item
          label="按钮滑过颜色"
          prop="btHoverColor"
          :label-width="formLabelWidth"
        >
          <el-color-picker
            v-model="formData.btHoverColor"
            show-alpha
            color-format="hex"
            :predefine="predefineColors"
            @change="colorItemChange('btHoverColor')"
          >
          </el-color-picker>
          <span class="color_txt">{{ formData.btHoverColor }}</span>
        </el-form-item>
        <el-form-item
          label="按钮点击颜色"
          prop="btActiveColor"
          :label-width="formLabelWidth"
        >
          <el-color-picker
            v-model="formData.btActiveColor"
            show-alpha
            color-format="hex"
            :predefine="predefineColors"
            @change="colorItemChange('btActiveColor')"
          >
          </el-color-picker>
          <span class="color_txt">{{ formData.btActiveColor }}</span>
        </el-form-item>
        <el-form-item
          label="表格头部颜色"
          prop="tableHeadColor"
          :label-width="formLabelWidth"
        >
          <el-color-picker
            v-model="formData.tableHeadColor"
            show-alpha
            color-format="hex"
            :predefine="predefineColors"
            @change="colorItemChange('tableHeadColor')"
          >
          </el-color-picker>
          <span class="color_txt">{{ formData.tableHeadColor }}</span>
        </el-form-item>
      </el-form>
      <div class="color_draw_foot">
        <el-button type="primary" @click="resetTheme">重置</el-button>
        <el-button type="primary" @click="saveTheme">保存</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import { PREDEFINE_COLORS } from "../const";
import cssVars from "css-vars-ponyfill";
import _ from "lodash";
export default {
  name: "ColorDraw",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      drawer: this.visible,
      formLabelWidth: "120px",
      formData: {},
      oldThemeColor: {},
      predefineColors: PREDEFINE_COLORS
    };
  },
  computed: { ...mapGetters(["defultTheme", "themeColor"]) },
  watch: {
    visible: function(val) {
      this.drawer = val;
    },
    drawer: function(val) {
      this.$emit("update:visible", val);
    }
  },
  created() {
    this.formData = _.cloneDeep(this.themeColor);
    this.setTheme();
  },
  methods: {
    setTheme() {
      let root = document.querySelector(":root");
      const variables = {};
      for (let item in this.formData) {
        variables[`--${item}`] = this.formData[item];
        root.style.setProperty(`--${item}`, this.formData[item]);
      }
      cssVars({
        variables
      });
    },
    closed() {
      this.formData = _.cloneDeep(this.themeColor);
    },
    saveTheme() {
      this.$store.dispatch("app/setThemeColor", this.formData);
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    resetTheme() {
      this.formData = _.cloneDeep(this.defultTheme);
      this.$store.dispatch("app/setThemeColor", this.formData);
      this.setTheme();
    },
    colorItemChange(item) {
      if (!this.formData[item]) {
        this.formData[item] = this.defultTheme[item];
      }
      this.setTheme();
    }
  }
};
</script>

<style lang="scss" scoped>
.color_draw {
  .color_txt {
    line-height: 1;
    position: relative;
    top: -14px;
    left: 12px;
  }
  .color_draw_foot {
    text-align: center;
    .el-button {
      width: 100px;
    }
  }
}
</style>
