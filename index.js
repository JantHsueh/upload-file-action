const core = require('@actions/core');
const uploadFile = require('./uploadFile');

async function main() {
  try {
    // inputs from action
    const url = core.getInput('url');
    const methodInput = core.getInput('method');
    const method = methodInput.toLowerCase();
    const forms = core.getInput('forms');
    const formsMap = jsonToMap(forms);
    const fileForms = core.getInput('fileForms');
    const fileFormsMap = jsonToMap(fileForms);

    console.log(forms);
    console.log(fileForms);

    // http request to external API
    const response = await uploadFile(url, formsMap, fileFormsMap);

    const statusCode = response.status;
    const data = response.data;
    const outputObject = {
      url,
      method,
      statusCode,
      data
    };

    const consoleOutputJSON = JSON.stringify(outputObject, undefined, 2);
    console.log(consoleOutputJSON);

    if (statusCode >= 400) {
      core.setFailed(`HTTP request failed with status code: ${statusCode}`);
    } else {
      const outputJSON = JSON.stringify(outputObject);
      core.setOutput('output', outputJSON);
    }
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
}


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
  return objToStrMap(JSON.parse(jsonStr));
}


main();
