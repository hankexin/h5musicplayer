(function($,root){
	var $scope = $(document.body);
	var controlmanger;
	var $playList = $('<div class="play-list">'+
			'<div class="line-head">播放列表</div>'+
			'<ul class="play-list-wrap"></ul>'+
			'<div class="close-btn">关闭</div>'+
		'</div>');
	function render(data){
		var html = '';
		var len = data.length;
		for(var i = 0; i < len; i++){
			html += '<li><h3>'+data[i].song+'-<span>'+data[i].singer+'</span></h3></li>'
		}
		$playList.find('ul').html(html);
		$scope.append($playList);
		bindEvent();
	}
	function bindEvent(){
		$playList.on('click','.close-btn',function(){
			$playList.removeClass('show');
		})
		$playList.on('click','li',function(){
			var index = $(this).index();
			signSong(index);
			controlmanger.index = index;
			$scope.trigger("play:change",[index,true]);
			$scope.find('.play-btn').addClass('playing');
			setTimeout(function(){
				$playList.removeClass('show');
			},1000)
		})
	}
	function show(control){
		controlmanger = control;
		var index = controlmanger.index;
		$playList.addClass('show');
		signSong(index);
	}
	function signSong(index){
		$playList.find('.playing').removeClass('playing');
		$playList.find('li').eq(index).addClass('playing');
	}
	root.playlist = {
		render : render,
		show : show
	}
}(window.Zepto,window.player || (window.player = {})))