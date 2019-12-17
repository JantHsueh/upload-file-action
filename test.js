const uploadFile = require('./uploadFile');

test('webrequest post', async () => {

  //这是蒲公英上传apk的示例
  const formsMap = jsonToMap({"_api_key":"使用你自己的key","buildInstallType":3});
  const fileFormsMap = jsonToMap({"file":"app-debug.apk"});
  const res = await uploadFile('https://www.pgyer.com/apiv2/app/upload',
      formsMap,fileFormsMap);
});


function objToStrMap(obj){
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k,obj[k]);
  }
  return strMap;
}
/**
 *json转换为map
 */
function jsonToMap(jsonStr){
  return objToStrMap(jsonStr);
}