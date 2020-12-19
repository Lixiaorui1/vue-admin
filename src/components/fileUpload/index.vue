<template>
  <div class="file_upload">
    <el-upload
      class="upload-demo"
      :headers="{ 'st-cookie': token }"
      :show-file-list="false"
      :action="baseUrl + url"
      :on-success="uploadOnSuccess"
      :limit="limit"
      :on-progress="uploadOnProgress"
      :accept="accept"
      :before-upload="handleBeforeUpload"
      :on-error="onError"
      ref="upload"
    >
      <el-button type="primary">
        上传文件
      </el-button>
    </el-upload>
    <div class="el-upload-list">
      <div class="file_item" v-for="item in list" :key="item.id">
        <div>
          <i class="el-icon-paperclip"></i>
          <span class="file_item_name">{{ item.name }}</span>
          <i class="el-icon-close icon" @click="handleFileRemove(item)"></i>
          <i
            class="el-icon-success icon"
            v-if="item.percentage === 100 || !item.percentage"
          ></i>
          <el-progress
            :percentage="Math.floor(item.percentage)"
            :stroke-width="3"
            v-else
            class="file_item_progress"
          ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { URL_ENV } from "@/utils/request";
import { getToken } from "@/utils/auth";
export default {
  name: "FileUpload",
  props: ["value", "limit", "url", "accept"],
  components: {},
  data() {
    return {
      baseUrl: URL_ENV[process.env.VUE_APP_CURRENTMODE],
      token: getToken(),
      list: [],
      isUploading: false
    };
  },
  computed: {},
  watch: {
    value: function(val) {
      this.getList(val);
      if (JSON.stringify(this.value) === "[]" || !this.value) {
        this.$refs.upload.clearFiles();
      }
    }
  },
  created() {
    this.getList(this.value);
  },
  beforeDestroy() {
    this.$refs.upload.abort();
  },
  methods: {
    getList(list) {
      if (list && list.length) {
        this.list = list.map(item => ({
          url: item.url,
          uid: item.url,
          name: item.name
        }));
      } else {
        this.list = [];
      }
    },
    abort() {
      this.$refs.upload.abort();
      this.list = [];
    },
    uploadOnProgress(e, file, fileList) {
      fileList.forEach(item => {
        item.id = item.response && item.response.entity.url;
        item.url = item.response && item.response.entity.url;
      });
      if (event.percent > 99) {
        event.percent = 99;
      }
      this.list = fileList;
      this.isUploading = true;
    },
    uploadOnSuccess(response, file, fileList) {
      const { status, msg } = response;
      fileList.forEach(item => {
        if (item.response && item.response.entity) {
          item.id = item.response.entity.url;
          item.url = item.response.entity.url;
        }
      });
      this.list = fileList;
      const index = fileList.findIndex(item => item.uid === file.uid);
      if (!status) {
        this.list.splice(index, 1);
        this.$message({
          message: msg || "网络不给力，请稍后再试",
          type: "error"
        });
        this.isUploading = false;
      } else {
        fileList[index].percentage = 100;
        this.list = fileList;
        this.isUploading = false;
        this.$emit(
          "input",
          this.list.map(item => ({ url: item.url, name: item.name }))
        );
      }
    },
    onError(err, file, fileList) {
      const index = fileList.findIndex(item => item.uid === file.uid);
      this.isUploading = false;
      fileList[index].percentage = 100;
    },
    handleFileRemove(file, i) {
      const index = this.list.findIndex(item => item.uid === file.uid);
      this.$refs.upload.abort(file);
      this.list.splice(index, 1);
      this.$emit("input", this.list);
    },
    handleBeforeUpload() {
      this.$emit("beforeUpload");
    },
    validate(cb) {
      if (this.isUploading) {
        return this.$message({
          message: "请等待当前文件上传完成",
          type: "error"
        });
      }
      cb(!this.isUploading);
    }
  }
};
</script>

<style lang="scss" scoped>
.file_upload {
  .file_item {
    border-radius: 4px;
    position: relative;
    line-height: 28px;
    .el-icon-paperclip {
      margin: 0 2px 0 4px;
      position: relative;
      top: 1px;
    }
    &:hover {
      background: #f5f7fa;
      .el-icon-close {
        display: block;
      }
      .el-icon-success {
        display: none;
      }
    }
    .icon {
      position: absolute;
      right: 8px;
      top: 6px;
      font-size: 16px;
      cursor: pointer;
    }
    .el-icon-close {
      display: none;
    }
    .el-icon-success {
      display: block;
      color: #7ed321;
    }
    .file_item_progress {
      position: absolute;
      bottom: -6px;
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.file_upload {
  .file_item {
    margin-top: 8px;
    &:hover {
      .el-progress__text {
        display: none;
      }
    }

    .el-progress-bar {
      padding-right: 0;
    }
    .el-progress__text {
      position: absolute;
      right: 4px;
      top: -12px;
      display: block;
    }
  }
}
</style>
