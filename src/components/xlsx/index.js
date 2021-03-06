import XLSX from "xlsx";
import _ from "lodash";
/**
 * @description:
 * @param {Object} json 服务端发过来的数据
 * @param {String} name 导出Excel文件名字
 * @return:
 */
export function exportExcel(json, name) {
  /* convert state to workbook */
  var data = new Array();
  var keyArray = new Array();

  for (const key1 in json) {
    if (json.hasOwnProperty(key1)) {
      const element = json[key1];
      var rowDataArray = new Array();
      for (const key2 in element) {
        if (element.hasOwnProperty(key2)) {
          const element2 = element[key2];
          rowDataArray.push(element2);
          if (keyArray.length < getLength(element)) {
            keyArray.push(key2);
          }
        }
      }
      data.push(rowDataArray);
    }
  }
  data.splice(0, 0, keyArray);
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  /* generate file and send to client */
  XLSX.writeFile(wb, name + ".xlsx");
}

/**
 * @description: 导入excel文件并返回数据
 * @param {function} 回调函数参数data,dataRef,一个是数据，一个是exce表单的索引
 * @return:
 */
export function importExcel(callback) {
  var inputObj = document.createElement("input");
  inputObj.setAttribute("id", "file");
  inputObj.setAttribute("type", "file");
  inputObj.setAttribute("name", "file");
  inputObj.setAttribute("style", "visibility:hidden");
  inputObj.setAttribute("accept", ".xlsx,.xls,.csv");
  inputObj.addEventListener("change", evt => {
    const files = evt.target.files;
    if (files && files[0])
      _file(files[0], (data, dataRef, html) => {
        callback(data, dataRef, html);
      });
    document.body.removeChild(inputObj);
  });
  document.body.appendChild(inputObj);
  inputObj.value;
  inputObj.click();
}

/**
 * @description: 处理文件
 * @param {Object} file 文件对象
 * @param {function} callback 回调函数
 * @return:
 */
function _file(file, callback) {
  const make_cols = refstr =>
    Array(XLSX.utils.decode_range(refstr).e.c + 1)
      .fill(0)
      .map((x, i) => ({
        name: XLSX.utils.encode_col(i),
        key: i
      }));

  /* Boilerplate to set up FileReader */
  const reader = new FileReader();
  reader.onload = e => {
    /* Parse data */
    const bstr = e.target.result;
    const wb = XLSX.read(bstr, {
      type: "binary"
    });
    /* Get first worksheet */
    const wsname = wb.SheetNames[14];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1
    });
    const merges = ws["!merges"] || [];
    const html = XLSX.utils.sheet_to_html(ws);

    const dataFromMerge = getDataFromMerges(data, merges);
    console.log(ws, data, merges, dataFromMerge);
    /* Update state */
    callback(dataFromMerge, make_cols(ws["!ref"]), html);
  };
  reader.readAsBinaryString(file);
}

/**
 * @description: 获取map的长度
 * @param {Object} obj map对象
 * @return: map的长度
 */
function getLength(obj) {
  var count = 0;
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      count++;
    }
  }

  return count;
}

/*
 *@description: 数据格式化
 *@data: excel数据
 *@returns : 获取格式化合并单元格后的excel数据
 */
function getDataFromMerges(data, merges) {
  if (merges.length) {
    const _data = _.cloneDeep(data);
    merges.forEach(item => {
      for (let i = item.s.c; i <= item.e.c; i++) {
        for (let m = item.s.r; m <= item.e.r; m++) {
          _data[m][i] = _data[item.s.r][item.s.c];
        }
      }
    });
    return _data;
  } else {
    return data;
  }
}
