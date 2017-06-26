/*!
 * jQuery topTop - A Scroll TO TOP Plugin
 * ------------------------------------------------------------------
 *
 * toTop是一款返回顶部插件
 *
 * Licensed under hybin License
 *
 * @version        1.0
 * @author         lyq
 * @mail		   1069795183@qq.com
 *
 * ------------------------------------------------------------------
 *
 *	$obj.toTop();
 *
 */
(function($){
	//方法对象
	var methods = {
			init: function(options){
				//合并参数
				var options = $.extend({},$.fn.toTop.defaults,options);
				//css
				this.css({
					'display':'none',
					'position':'fixed',
					'cursor':'pointer',
					'bottom':options.bottom,
					'right':options.right
				});
				$_this = this;
				//滚动显示
				$(window).scroll(function(){
					var t = $(window).scrollTop();
					var h = $(window).height();
					if(t>(h/2)){
						$_this.show();
					}else{
						$_this.hide();
					}
				});
				//返回顶部
				this.click(function(){
					$('html,body').animate({scrollTop:0},options.speed);
				});
				return this;
			}
	};

	//插件入口
	$.fn.toTop = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) == 'object' || !method){
			method = methods.init;
		}else{
			$.error('Method'+method+'does not exist on jQuery.toTop');
			return this;
		}
		return method.apply(this,arguments);
	};

	//默认参数
	$.fn.toTop.defaults = {
		//postion
		bottom			:			50,
		right			:			50,
		speed			:			500
	};
})(jQuery);
