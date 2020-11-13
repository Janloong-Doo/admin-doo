const initTreeData = (datas) => {
  let parentArray = [];
  datas.forEach((data, name, searchParams) => {
    if (data.level === 1 || data.level === '1') {
      parentArray.push(data);
    }
  })
  return data2tree(datas, parentArray);
}


const data2tree = (datas, dataArray) => {
    for (let j = 0; j < dataArray.length; j++) {
      let dataArrayIndex = dataArray[j];
      let childrenArray = [];
      let Id = dataArrayIndex.id;
      for (let i = 0; i < datas.length; i++) {
        let data = datas[i];
        // if (data.enabled == true) {
        let parentId = data.pid;
        if (parentId == Id) {//判断是否为儿子节点
          // let objTemp = {
          //   id: data.id,
          //   name: data.name,
          //   order: data.order,
          //   parentId: parentId,
          // }
          let objTemp = data;
          childrenArray.push(objTemp);
        }
        // }
      }

      if (childrenArray.length > 0) {//有儿子节点则递归
        dataArrayIndex.children = childrenArray;
        data2tree(datas, childrenArray)
      }
    }
    // this.setTree = dataArray;
    return dataArray;
  }
;

export default {
  initTreeData: initTreeData
}