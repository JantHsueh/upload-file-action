# Upload File Action

 Upload file via http request. This is a Js action. Use axios to send and send requests. There is no limit on file size.


## Usage

This is an example of upload apk to pgyer.com(蒲公英网站)
```yaml
 - name: Upload File
   id: upload
   uses: JantHsueh/upload-file-action@master
   with:
    url: https://www.pgyer.com/apiv2/app/upload
    forms: '{"_api_key":"${{ secrets.pgyer_key }}","buildInstallType":3}'
    fileForms: '{"file":"app/build/outputs/apk/release/app-release.apk"}'
```


## Inputs

| Parameter  | Required | Info                                                         |
| ---------- | -------- | ------------------------------------------------------------ |
| `url`      | `true`   | Web request URL endpoint                                     |
| `forms`  | `false`  | Data to be transmitted,such as key, pwd, etc. Use json format |
| `fileForms`  | `false`  | Files to be transferred,such as 'file','image' etc. Use json format |


## Outputs

Output format: `JSON`

```json
{
  "output": {
    "url": "<str url>",
    "method": "<str method>",
    "statusCode": "<int statusCode>",
    "data": "object/array data from API"
  }
}
```
>There is no return time , because this is running on Amazon server,there are some time zone issues. use [get-time-action](https://github.com/JantHsueh/get-time-action) to get the time in your current time zone 



### Example output usage

```yaml
run: |
  $output = '${{ steps.upload.outputs.output }}' | ConvertFrom-Json
  Write-Host "Time from output $($output.time) statusCode $($output.statusCode) data $($output.data)"
```

## License

[MIT](LICENSE)
