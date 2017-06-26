/*!
 * jQuery popup - A Popup Plugin
 * ------------------------------------------------------------------
 *
 * popup是一款弹窗插件
 *
 * Licensed under hybin License
 *
 * @version        1.0
 * @author         lyq
 * @mail		   1069795183@qq.com
 *
 * ------------------------------------------------------------------
 *
 *	$obj.popup({
 *			type		:		'list',
 *			url			:		'data.php',
 *			opName		:		'派驻',
 *			callback	:		function(o, i){
 *				console.log(o.parent().find("td").eq(1).text() + '==' + i + 'from button:' + from);
 *			}
 *		});
 *
 */
(function($){
	//方法对象
	var methods = {
			init: function(options){
				//合并参数
				var options = $.extend({},$.fn.popup.defaults,options);
				//点击事件
				this.bind('click', function(){
					var $from = $(this).index();	//按钮索引
					//属性
					var $doc_width = $(document).width();
					var $doc_height = $(document).height();
					var $win_height = $(window).height();
					//1包裹层
					var $wrap = $("<div id='popupWrap'>");
					//1.1遮罩层
					if(options.mask == 1){
						var $mask = $("<div>").css({
							'position'	:	'fixed',
							'z-index'	:	99998,
							'width'		:	$doc_width,
							'height'	:	$doc_height,
							'background':	'#000',
							'opacity'	:	0.5,
						}).bind('click',function(){
							$(this).parent().remove();
						});
						$wrap.append($mask);
					}
					//1.2弹框层
					var $pop = $("<div>").css({
							'position'	:	'fixed',
							'top'		:	5*($win_height-options.height)/12,
							'left'		:	($doc_width-options.width)/2,
							'z-index'	:	99999,
							'width'		:	options.width,
							'height'	:	options.height,
							'background':	options.bgColor,
							'border'	:	'3px solid '+options.brColor,
							'overflow-y':	'auto'
						});
					//1.2.1弹框标题层
					var $title = $("<div>").css({
							'border-bottom'	:	'1px solid '+options.brColor,
							'width'			:	'100%',
							'height'		:	0.1*options.height,
							'line-height'	:	0.1*options.height+'px',
							'color'			:	options.tColor,
							'text-indent'	:	'8px',
							'margin-bottom'	:	'5px'
						}).text(options.title);
					//1.2.1.1退出层
					$("<span>").text("　x　").css({
							'float'		:		'right',
							'color'		:		options.eColor,
							'cursor'	:		'pointer',
						}).appendTo($title).bind('click',function(){
							$wrap.remove();
						});
					//1.2.2内容层
					switch(options.type){
						case 'alert':break;
						case 'confirm':break;
						case 'input':break;

						case 'list':
							$.ajax({
								type	:	'get',
								url		:	options.url,
								dataType:	'json',
								success	:	function(data){
									if(data.status == 0){
										//table
										var $table = $("<table>").css({
												'width'			:	"100%",
												'color'			:	options.tdColor,
												'font-size'		:	'13px',
												'borderCollapse': 	'collapse',
											});
										//tr
										for(i in data.data){
											var $tr = $("<tr>");
											for(j in data.data[i]){
												//td添加到tr中
												//console.log(j +'='+ data.data[i][j]); return false;
												$("<td>").css({
													'padding'	:	'5px',
													'border-bottom'	:	'1px solid '+options.tdBrColor,
												}).text(data.data[i][j]).appendTo($tr);
											}
											//tr操作
											var $op = $("<td>").css({
													'text-align':	'right',
													'border-bottom'	:	'1px solid '+options.tdBrColor,
													'padding'	:	'5px 20px 5px 5px',
													'color'		:	options.opColor,
													'cursor'	:	'pointer',
												}).text(options.opName).bind('click', function(){
													var $index = $(this).parent().index();
													options.callback.call(this, $(this), $index, $from);
												}).appendTo($tr);
											//tr添加到table中
											$tr.appendTo($table);
										}
										$table.appendTo($pop);
									}else{
										alert("数据加载失败");return false;
									}
								}
							})
							break;
						default:
							alert("不支持的弹框类型");return false;
							break;
					}
					//显示
					$pop.append($title);
					$wrap.append($pop);
					$wrap.prependTo("body");
				});
				return this;
			}
	};

	//插件入口
	$.fn.popup = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) == 'object' || !method){
			method = methods.init;
		}else{
			$.error('Method'+method+'does not exist on jQuery.popup');
			return this;
		}
		return method.apply(this,arguments);
	};

	//默认参数
	$.fn.popup.defaults = {
		type		:		'confirm',	//弹框类型，支持list、confirm、alert、input
		mask		:		1,			//是否需要遮罩
		bgColor		:		'#fff',		//弹框背景色
		brColor		:		'#e0e0e0',	//边框颜色
		tColor		:		'#333',		//标题颜色
		eColor		:		'#c82e31',	//退出颜色
		height		:		350,		//弹框高度
		width		:		500,		//弹框宽度
		title		:		'标题',
		//list参数
		url			:		'',			//list数据源
		callback	:		'',			//tr操作回调
		opName		:		'确定',		//tr操作名称，目前只支持单一操作
		opColor		:		'green',	//tr操作字体颜色
		tdColor		:		'#555',		//td字体颜色
		tdBrColor	:		'#eee'		//td边框颜色
	};
})(jQuery);
