$('input#src').attr("readonly","readonly")

var domain = ''
$.ajax({
  dataType: "json",
  url: "/qiniu/file_domain",
  success: function(r){
    domain = r['domain']
  }
});

var uploader = Qiniu.uploader({
  runtimes: 'html5,flash,html4',    //上传模式,依次退化
  browse_button: 'pickfiles',       //上传选择的点选按钮，**必需**
  uptoken_url: '/qiniu/upload_token',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
  //uptoken: 'AUa4hByyxtp6BU6LXEfxZKU8t_-UpZmkCQKgAJvL:LUBVhn5-9fHm8nLEFgyt_uauGeA=:eyJzY29wZSI6Imhhb2JhY2t1cCIsImRlYWRsaW5lIjoxNDg0NjY5Njc2fQ==', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
  unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
  // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
  domain: 'http://7xishc.com1.z0.glb.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
  get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
  container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
  max_file_size: '100mb',           //最大文件体积限制
  flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
  max_retries: 3,                   //上传失败最大重试次数
  dragdrop: true,                   //开启可拖曳上传
  drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
  chunk_size: '4mb',                //分块上传时，每片的体积
  auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
  init: {
    'FilesAdded': function (up, files) {
      plupload.each(files, function (file) {
        // 文件添加进队列后,处理相关的事情
      });
    },
    'BeforeUpload': function (up, file) {
      // 每个文件上传前,处理相关的事情
    },
    'UploadProgress': function (up, file) {
      // 每个文件上传时,处理相关的事情
    },
    'FileUploaded': function (up, file, info) {
      $("#src").val(domain + file['target_name'])
    },
    'Error': function (up, err, errTip) {
      //上传出错时,处理相关的事情
    },
    'UploadComplete': function () {
      //队列文件处理完毕后,处理相关的事情
    },
    'Key': function (up, file) {
      // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
      // 该配置必须要在 unique_names: false , save_key: false 时才生效

      var key = "";
      // do something with key here
      return key
    }
  }
});
