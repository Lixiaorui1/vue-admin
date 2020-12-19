#!/bin/sh
#######
## 前端vue框架部署脚本，会将原来老的文件 移动到 hist_html目录下 按日期划分的二级目录下，
#同时会将待发布的zip包文件，解压到html目录下，完成前端代码的部署。his_html目录下 的 APPNAME目录 按日期划分的二级目录下
## 约束：
#   重要: APPNAME 表示当前发布系统的名称，每个系统单独一个唯一的 应用名，不能重复！！！
##  1、前端要以zip压缩包格式上传文件，服务器需要安装unzip命令（yum install 安装），
##  2、前端代码是需要放置在约定目录下html目录下。
##  3、前端代码发布之前，需要将发布的zip文件拷贝到 与html 同级的目录。
##  4、该脚本放置路径 与html目录、待发布的zip文件 需要在同一级目录下
#######
APPNAME="bugmanager"
DIRNAME=`dirname $0`
PROGNAME=`basename $0`
#待迁移历史目录
HIST_FILE_NAME="html/$APPNAME"
#待发布文件名
DEPLOY_FILE_NAME=$1
#迁移一级目录名
MOVE_TARGET_FOLDER="his_html/$APPNAME"
#迁移的二级目录名
MOVE_TARGET_DATE_FOLDER=`date +%Y_%m%d_%H%M`
#执行脚本当前目录
CUR_PATH=`pwd`
echo "start execute  script current path is $CUR_PATH"

warn() {
    echo "${PROGNAME}: $*"
}

#
# Helper to puke.
#
die() {
    warn $*
    exit 1
}
if [ ! -f "$DEPLOY_FILE_NAME" ];then
  die "Missing required go his file: $DEPLOY_FILE_NAME"
fi

if [ ! -s $MOVE_TARGET_FOLDER ];then
   echo "========== $MOVE_TARGET_FOLDER not exit will create";
   mkdir $MOVE_TARGET_FOLDER
fi

#发布文件后缀名，文件格式
SUFFIX_DEPLOY_NAME="${DEPLOY_FILE_NAME##*.}"
#发布文件前缀名，文件名
PEFIX_DEPLOY_FILE="${DEPLOY_FILE_NAME%.*}"

if [[ ! "$SUFFIX_DEPLOY_NAME" == "zip" ]];then
    die "$DEPLOY_FILE_NAME suffix not zip"
fi

 cd $MOVE_TARGET_FOLDER

if [ ! -s $MOVE_TARGET_DATE_FOLDER ];then
   echo  "===========will create folder $MOVE_TARGET_DATE_FOLDER";
   mkdir $MOVE_TARGET_DATE_FOLDER
fi
   cd $MOVE_TARGET_DATE_FOLDER
   echo "===========before move, current path:`pwd` "
   echo  "==========will move his folder"
   echo  ` mv $CUR_PATH/$HIST_FILE_NAME  $CUR_PATH/$MOVE_TARGET_FOLDER/$MOVE_TARGET_DATE_FOLDER `
   echo  "=============done mv hisfile: $CUR_PATH/$HIST_FILE_NAME  $CUR_PATH/$MOVE_TARGET_FOLDER/$MOVE_TARGET_DATE_FOLDER ========="
   cd $CUR_PATH
   echo "===========before deploy,current path: `pwd`"
   echo  ` unzip -o  $DEPLOY_FILE_NAME `
   echo  "============start rename $PEFIX_DEPLOY_FILE to $HIST_FILE_NAME "
   mv   $PEFIX_DEPLOY_FILE  $HIST_FILE_NAME
   echo "===========end deploy, please check =============="