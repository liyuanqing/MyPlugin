/*!
 * jQuery ajaxUploads - uploads by ajax
 * ------------------------------------------------------------------
 *
 * ajaxUploads是一款ajax上传插件
 *
 * Licensed under hybin License
 *
 * @version        1.0
 * @author         lyq
 * @mail		   1069795183@qq.com
 *
 * ------------------------------------------------------------------
 *
 *	$obj.ajaxUploads();
 *
 */
(function($){
	//方法对象
	var methods = {
			init: function(options){
				//合并参数
				var options = $.extend({},$.fn.ajaxUploads.defaults,options);
				//点击上传
				var $form = $("<form enctype='multipart/form-data' method='post'><input type='file' name='upfile'></form>");	//生成表单
				this.bind('click',function(){
					$form.find("input[type='file']").click().bind("change",function(){//点击this对象的时候去点击上传触发选择，选择完毕后自动上传
						var formData = new FormData($form[0]);
						$form.remove();	//销毁表单，防止重复上传
						$.ajax({
							type		:	"post",
							url			:	options.url,
							data		:	formData,
							dataType	:	"json",
							cache		:	false,
							processData	:	false,  // 告诉jQuery不要去处理发送的数据
							contentType	:	false,  // 告诉jQuery不要去设置Content-Type请求头
							success		:	options.success
						})
					});
				});
				return this;
			}
	};
	//插件入口
	$.fn.ajaxUploads = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) == 'object' || !method){
			method = methods.init;
		}else{
			$.error('Method'+method+'does not exist on jQuery.ajaxUploads');
			return this;
		}
		return method.apply(this,arguments);
	};
	//默认参数
	$.fn.ajaxUploads.defaults = {
			url		:	'',
			success	:	''
	};
})(jQuery);
