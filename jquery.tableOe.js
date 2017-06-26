/*!
 * jQuery TableOe - A Table Plugin
 * ------------------------------------------------------------------
 *
 * TableOe是一款给表格奇偶行上背景色，以及鼠标指向行变色的插件
 *
 * Licensed under hybin License
 *
 * @version        1.0
 * @author         lyq
 * @mail		   1069795183@qq.com
 *
 * ------------------------------------------------------------------
 *
 *  <table></table>
 *
 *  $('table').tableOe();
 *
 */
;(function($){
	//插件方法
	var methods = {
		//只需要奇偶变色,手动编写css样式
		init: function(options){
			//合并参数
			var options = $.extend({},$.fn.tableOe.defaults,options);
			this.find('tr:first').css('background-color',options.thBg);
			this.find('th').css('background-color',options.thBg);
			this.find('tr:even').not(':first').css('background-color',options.even);
			this.find('tr:odd').css('background-color',options.odd);
			//鼠标移到tr上变化
			this.find('tr').not(':first').each(function(){
			var default_bg = $(this).css('background-color');
				$(this).hover(function(){
					$(this).css('background-color',options.hover);
				},function(){
					$(this).css('background-color',default_bg);
				});
			});
				return this;
		},
		//自动完成表格样式
		auto: function(options){
			//合并参数
			var options = $.extend({},$.fn.tableOe.defaults,options);
			//添加颜色
			this.css({
				'font-famliy':options.fontFamily,
				'font-size':options.fontSize,
				'border-collapse':options.borderCollapse,
				'color':options.color
			});
			this.find('th').css('background-color',options.thBg);
			this.find('th,td').css({
				'cursor':options.cursor,
				'border':options.border,
				'width':options.width,
				'padding':options.padding
			});
			this.find('tr:first').css('background-color',options.thBg);
			this.find('tr:even').not(':first').css('background-color',options.even);
			this.find('tr:odd').css('background-color',options.odd);
			//鼠标移到tr上变化
			this.find('tr').not(':first').each(function(){
			var default_bg = $(this).css('background-color');
				$(this).hover(function(){
					$(this).css('background-color',options.hover);
				},function(){
					$(this).css('background-color',default_bg);
				});
			});
				return this;
		}
	};
	//插件入口
	$.fn.tableOe = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) == 'object' || !method){
			method = methods.auto;
		}else{
			$.error('Method'+method+'does not exist on jQuery.tableOe');
			return this;
		}
			return method.apply(this,arguments);
	};
	//默认参数，开放参数
	$.fn.tableOe.defaults = {
		//table
		fontFamliy		:		'verdana,arial,sans-serif',			//字体
		fontSize		:		'14px',								//字体大小
		color			:		'#333333',							//字体颜色
		borderCollapse	: 		'collapse',							//合并单元格边框
		cursor			:		'pointer',
		//table-th-td
		padding			:		'8px',								//单元格内边距
		border			:		'1px solid #666666',				//单元格边框
		width			:		'120px',							//单元格长度
		//table-th
		thBg			:		'#A0A0A0',							//th背景色
		//table-odd-even-hover
		odd 			:		'#D7D7D7',							//奇索引背景颜色
		even 			:		'#B7B7B7',							//偶索引背景颜色
		hover			:		'#ffffff'							//鼠标移上去变化
	};
})(jQuery);
