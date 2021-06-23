; (function ($) {
    $.extend({
        'foucs': function (con) {
            var $container = $('#index_b_hero')
            var $container_width = $('#index_b_hero img').width()
                , $imgs = $container.find('li.hero')
            , $leftBtn = $container.find('a.prev')
            , $rightBtn = $container.find('a.next')
			,pauseBtn = $container.find('a.pause')
            , config = {
                interval: con && con.interval || 3500,
                animateTime: con && con.animateTime || 500,
                direction: con && (con.direction === 'right'),
                _imgLen: $imgs.length
            }
            , i = 0
            , getNextIndex = function (y) { return i + y >= config._imgLen ? i + y - config._imgLen : i + y; }
            , getPrevIndex = function (y) { return i - y < 0 ? config._imgLen + i - y : i - y; }
            , silde = function (d) {
                $imgs.eq((d ? getPrevIndex(2) : getNextIndex(2))).css('left', (d ? 0-2*$container_width + 'px' : 2*$container_width + 'px'))
                $imgs.animate({
                    'left': (d ? '+' : '-') + '='+$container_width+'px'
                }, config.animateTime);
                //alert($container_width);
                i = d ? getPrevIndex(1) : getNextIndex(1);
            }
            , s = setInterval(function () { silde(config.direction); }, config.interval);
            var h = document.documentElement.clientHeight,
			mybody = document.getElementById('index_b_hero');
//			mybody.style.height = h + 'px';
			//返回角度
			function GetSlideAngle(dx, dy) {
				return Math.atan2(dy, dx) * 180 / Math.PI;
			}
			//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
			function GetSlideDirection(startX, startY, endX, endY) {
				var dy = startY - endY;
				var dx = endX - startX;
				var result = 0;
				//如果滑动距离太短
				if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
					return result;
				}
				var angle = GetSlideAngle(dx, dy);
				if(angle >= -45 && angle < 45) {
					result = 4;
				} else if(angle >= 45 && angle < 135) {
					result = 1;
				} else if(angle >= -135 && angle < -45) {
					result = 2;
				} else if((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
					result = 3;
				}
				return result;
			}
			
            $imgs.eq(i).css('left', 0).end().eq(i + 1).css('left', $container_width + 'px').end().eq(i - 1).css('left', 0-$container_width + 'px');
            $container.find('.hero-wrap').add($leftBtn).add($rightBtn).hover(function () { clearInterval(s); }, function () { s = setInterval(function () { silde(config.direction); }, config.interval); });
            //滑动处理
			var startX, startY;
			mybody.addEventListener('touchstart', function(ev) {
				ev.preventDefault();
				startX = ev.touches[0].pageX;
				startY = ev.touches[0].pageY;
			}, false);
			mybody.addEventListener('touchmove', function(ev) {
				var endX, endY;
				ev.preventDefault();
				endX = ev.changedTouches[0].pageX;
				endY = ev.changedTouches[0].pageY;
				var directionFX = GetSlideDirection(startX, startY, endX, endY);
				switch(directionFX) {
					case 0:
//						alert("没滑动");
						break;
					case 1:
//						alert("向上");
						if ($(':animated').length === 0) {silde(false);}
						break;
					case 2:
						if ($(':animated').length === 0) {silde(true);}
//						alert("向下");
						break;
					case 3:
						if ($(':animated').length === 0) {silde(false);}
						break;
					case 4:
						if ($(':animated').length === 0) {silde(true);}
						break;
					default:
				}
			}, false);
			$("#index_b_hero").delegate("a" ,"touchstart",function(){
				var $t= $(this);
				var href=$t.attr("href");
				document.location.href=href;
			});
			
			$leftBtn.on('click touchstart',function() {
                if ($(':animated').length === 0) {
                    silde(false);
                }
            });
            
            $rightBtn.on('click touchstart',function() {
                if ($(':animated').length === 0) {
                    silde(true);
                }
            });
            
        }
    });
}(jQuery));