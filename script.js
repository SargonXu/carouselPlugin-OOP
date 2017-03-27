function Carousel(){
	this.oC = document.getElementById("carousel");
	this.oCarousel = this.oC.getElementsByTagName("ul")[0];
	this.aCarousels = this.oCarousel.getElementsByTagName("li");
	this.iNow = 0;
	this.len = this.aCarousels.length;
	this.iW = parseInt(getStyle(this.oC,"width"));
	this.aCtrl = getElementsByClass(this.oC,"carousel-controller");
	this.timer = null;
	this.oCarousel.style.width = this.iW * this.len + "px";
	for(var i=0;i<this.len;i++){
		this.aCarousels[i].style.width = this.iW + "px";
	}
	for(var i=0;i<this.aCtrl.length;i++){
		var _this = this;
		this.aCtrl[i].index = i;
		this.aCtrl[i].onclick = function(){
			_this.click(this.index);
		};
		this.aCtrl[i].onmouseout = function(){
			_this.run();
		}
	}
}
Carousel.prototype = {
	run : function(){
		var _this = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			_this.iNow++;
			if(_this.len == _this.iNow){
				_this.iNow = 0;
			}
			animate(_this.oCarousel,{"left":-_this.iW * _this.iNow});
		},3000);
	},
	click : function(index){
		clearInterval(this.timer);
		if(index == 0){
			this.iNow--;
			if(this.iNow < 0){
				this.iNow = this.len - 1;
			}
		}else{
			this.iNow++;
			if(this.iNow == this.len){
				this.iNow = 0;
			}
		}
		animate(this.oCarousel,{"left":-this.iW * this.iNow});
	}
};

function animate(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			var iPos = null;
			var iPos = "opacity" == attr ? parseInt(getStyle(obj,attr)*100) : parseInt(getStyle(obj,attr));
			var iFin = json[attr];
			var speed = (iFin - iPos) > 0 ? Math.ceil((iFin - iPos)/10) :　Math.floor((iFin - iPos)/10);
			iPos += speed;
			if(iPos >= iFin && speed > 0 || iPos <= iFin && speed < 0){
				iPos = iFin;
			}
			obj.style[attr] = "opacity" == attr ? iPos/10 : iPos + "px";
			if(iPos != iFin){
				flag = false;
			}
		}
		if(flag){
			clearInterval(obj.timer);
			fn && fn();
		}
	},20);
}
function getStyle(obj,attr){
	return obj.currentStyle? obj.currentStyle(attr) : getComputedStyle(obj,null)[attr];
}
function getElementsByClass(obj,classname){
	var nodes = obj.getElementsByTagName("*");
	var res = [];
	for(var i = 0,len = nodes.length; i < len; i++){
		var classArr = nodes[i].className.split(" ");
		for(var j=0,lens=classArr.length; j<lens; j++){
			if(classname == classArr[j]){
				res.push(nodes[i]);
				break;
			}
		}
	}
	return res;
}