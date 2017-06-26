/*!
 * jQuery dragDrop - A Drag Plugin
 * ------------------------------------------------------------------
 *
 * dragDrop是一款拖拽插件
 *
 * Licensed under hybin License
 *
 * @version        1.0
 * @author         lyq
 * @mail		   1069795183@qq.com
 *
 * ------------------------------------------------------------------
 *
 *	$obj.dragDrop();
 *
 */
;(function($){
	//函数
	var methods = {
		init: function(options){
			//合并参数
			var options = $.extend({},$.fn.dragDrop.defaults,options);
			this.on('mousedown',function(e){
			var $_this = $(this);		//****
			var $nowTop = $_this.offset().top;		//对象距屏幕可视区域顶端距离
			var $nowLeft = $_this.offset().left;	//对象距屏幕可视区域左端距离
			var $diffX = e.pageX-$nowLeft;			//鼠标距元素左边距离
			var $diffY = e.pageY- $nowTop;			//鼠标距元素上边距离
			var $width = $_this.width();			//对象宽度
			var $height = $_this.height();			//对象高度
			var $win_width = $(window).width();		//可视区域宽度
			var $win_height = $(window).height();	//可视区域高度

			/*
			*	可移动范围参数
			*/
			var $borderLeft = (options.maxLeft!=0)?options.maxLeft:0;
			var $borderRight = (options.maxRight!=0)?options.maxRight:$win_width;
			var $borderTop = (options.maxTop!=0)?options.maxTop:0;
			var $borderBottom = (options.maxBottom!=0)?options.maxBottom:0;

				//鼠标移动
				$(document).on('mousemove',function(e){
					var $top,$left;
					if(e.pageX-$diffX<$borderLeft){
						$left = $borderLeft;
					}else if(e.pageX-$diffX+$width>$borderRight){
						$left = $borderRight-$width;
					}else{
						$left = e.pageX-$diffX;
					}

					if($borderBottom==0){		//向下无限制
						if(e.pageY-$diffY<$borderTop){
							$top = $borderTop;
						}else{
							$top = e.pageY-$diffY;
						}
					}else{						//向下有限制
						if(e.pageY-$diffY<$borderTop){
							$top = $borderTop;
						}else if(e.pageY-$diffY+$height>$borderBottom){
							$top = $borderBottom-$height;
						}else{
							$top = e.pageY-$diffY;
						}
					}

					$_this.css({'left':$left,'top':$top,
								'z-index':'9999',
								//'width':$width,
								//'height':$height
								});
				});

				//鼠标放开
				$(document).on('mouseup',function(){
					$(document).unbind('mousemove');
					$(document).unbind('mouseup');
					$_this.css('z-index','1');
				});

			}).css({'cursor':'move',
					'position':'absolute',
					'display':'block'
					});
			return this;
		},
	};
	//入口
	$.fn.dragDrop = function(){
		var method = arguments[0];
		if(methods[method]){
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments,1);
		}else if(typeof(method) == 'object' || !method){
			method = methods.init;
		}else{
			$.error('Method'+method+'does not exist on jQuery.dragDrop');
			return this;
		}
		return method.apply(this,arguments);
	};
	//默认参数
	$.fn.dragDrop.defaults = {
		maxLeft			:		0,
		maxRight		:		0,
		maxTop			:		0,
		maxBottom		:		0
	};
})(jQuery);
