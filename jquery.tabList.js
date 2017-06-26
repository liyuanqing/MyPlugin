/*!
 * jQuery TabList - A Tab Plugin
 * ------------------------------------------------------------------
 *
 * tabList是一款选项卡插件
 *
 * Licensed under hybin License
 *
 * @version        1.1
 * @author         lyq
 * @mail		   1069795183@qq.com
 *
 * ------------------------------------------------------------------
 *	*{margin:0;padding:0}
 *  <div>
 *		<div>
 *			<ul>
 *			<li>11111</li>
 *			<li>22222</li>
 *			</ul>
 * 		</div>
 *		<div>
 *			<div>c1111111111</div>
 *			<div>c2222222222</div>
 *		</div>
 *	</div>
 *
 *  $('div').tabList();
 *
 */
;(function($){
	//插件方法
	var methods = {
		init: function(options){
			//合并参数
			var options = $.extend({},$.fn.tabList.defaults,options);
			//合并边框
			var border = options.borderWidth+'px '+options.borderStyle+' '+options.borderColor;
		//初始化--样式初始化
			//外部容器
			this.css({
				'width':options.width,
				'height':options.height,
				'border':border
			});
			var $menu = $(this).children('div:eq(0)');	//选项卡菜单对象
			var $tabs = $(this).children('div:eq(1)');	//选项卡对象
			$menu.css('height',options.navH*options.height);
			$tabs.css({
					'height':(1-options.navH)*options.height,
					'background':options.tabBg
				});
			//选项卡菜单
				var $li_len = $menu.find('ul li').length;
				$menu.find('ul li').not(':last').css({
					'list-style-type':'none',
					'float':'left',
					'text-align':'center',
					'cursor':'pointer',
					'overflow':'hidden',
					'background':options.navBg,
					'color':options.navColor,
					'border-right':border,
					'height':options.navH*options.height,
					'line-height':options.navH*options.height+'px',
					'width':Math.floor(options.width/$li_len)-options.borderWidth,
				});
				$menu.find('ul li:last').css({
					'list-style-type':'none',
					'float':'left',
					'text-align':'center',
					'cursor':'pointer',
					'overflow':'hidden',
					'background':options.navBg,
					'color':options.navColor,
					'border-right':'none',
					'height':options.navH*options.height,
					'line-height':options.navH*options.height+'px',
					'width':options.width-($li_len-1)*Math.floor(options.width/$li_len),
				});
			//初始化--初状
				$menu.find('ul li:first').css({
					'background':options.tabBg,
				});
				$tabs.children('div').not(':first').css('display','none');
			//切换选项卡
			if(options.animate=='click'){
					$menu.find('ul li').each(function(i){
					$(this).click(function(){
						$menu.find('ul li').css('background',options.navBg);
						$(this).css('background',options.tabBg);
						$tabs.children('div').hide();
						$tabs.children('div').eq(i).show();
					});
				});
				}else if(options.animate=='mouseover'){
					$menu.find('ul li').each(function(i){
						$(this).mouseover(function(){
							$menu.find('ul li').css('background',options.navBg);
							$(this).css('background',options.tabBg);
							$tabs.children('div').hide();
							$tabs.children('div').eq(i).show();
						});
					});
				}else{
					$menu.find('ul li').each(function(i){
					$(this).click(function(){
						$menu.find('ul li').css('background',options.navBg);
						$(this).css('background',options.tabBg);
						$tabs.children('div').hide();
						$tabs.children('div').eq(i).show();
					});
				});
				}
			return this;
		}
	};
	//插件入口
	$.fn.tabList = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) == 'object' || !method){
			method =  methods.init;
		}else{
			$.error('Method'+method+'does not exist on jQuery.tabList ');
			return this;
		}
			return method.apply(this,arguments);
	};
	//插件默认参数
	$.fn.tabList.defaults = {
		height		:		300,				//选项卡高度
		width		:		400,				//选项卡宽度
		navH		:		0.1,				//选项卡导航高度
		navBg		:		'#E0E2EB',			//导航背景
		tabBg		:		'#fff',				//选项卡背景
		navColor	:		'#666',				//导航字体颜色
		borderColor:		'#ccc',				//边框颜色
		borderStyle:		'solid',			//边框样式
		borderWidth:		1,					//边框粗细
		animate		:		'click'				//事件支持click mouseover
	};
})(jQuery);
