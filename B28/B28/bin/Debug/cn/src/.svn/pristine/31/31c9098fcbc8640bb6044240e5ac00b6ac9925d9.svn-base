function Player(wrapId) {
	this.$wrap = $('#' + wrapId);
	this.$effectWrap = null;
	this.$loading = $("<div class='loading-tip'>正在加载...</div>").appendTo(this.$wrap).hide();
	this.items = [];
	this.elemItems = this.$wrap.find(".play-item");
	this.count = this.elemItems.length;
	this.currentIndex = 0;
	this.nextIndex = 0;
	this.handler = null;//设置控制器
	this.effectTime = 1000;
	this.playing = false;
	this.observers = [];
	this.init();
}


Player.prototype.init = function() {
	this.$wrap.css('height', this.$wrap.outerWidth() * (9/16));

	var that = this;
	window.onresize = function() {
		(function() {this.$wrap.css('height', this.$wrap.outerWidth() * (9/16));}).call(that);
	}

	for (var i = 0; i < this.count; i++) {
		this.items[i] = new Item(this.elemItems[i]);
		this.items[i].addObserver(function() {
			that.hideLoading();
		});
	}

	$(this.elemItems[this.currentIndex]).show();
	this.items[this.currentIndex].show();
	this.handler = new Handler(this);
}

Player.prototype.hideLoading = function(item) {
	if (this.items[this.currentIndex] == item) {
		this.$loading.hide();
	}
}

Player.prototype.play = function(index) { //console.log(index);
	//Effect.prototype.playEffect = function(picNow, picNext, durTime, wrapId)
	//使用当前效果对象播放效果

	var that = this,
		dir = 1;//1左，-1右

	if (this.playing) {return false;}
	if (this.currentIndex == index) {
		for (var i = 0; i < that.observers.length; i++) {
			if (typeof that.observers[i] == "function") {
				that.observers[i]();
			}
		}
		return true;
	}

	this.nextIndex = index;
	this.playing = true;

	if (!this.items[index].show()) {
		this.$loading.show();
	} else {
		this.$loading.hide();
	}


	if ((this.currentIndex==0&&this.nextIndex==this.count-1)||this.currentIndex<this.nextIndex) {
		dir = -1;
	} else {
		dir = 1;
	}

	var currentIndex = this.currentIndex;
	$(this.elemItems[currentIndex]).animate({"left": dir*100+"%"}, this.effectTime,"easeInOutExpo");
	$(this.elemItems[this.nextIndex]).css({"left": -dir*100+"%"}).show().animate({"left": "0%"}, this.effectTime,"easeInOutExpo", function() {
		$(that.elemItems[currentIndex]).hide();		
		that.playing = false;
		for (var i = 0; i < that.observers.length; i++) {
			if (typeof that.observers[i] == "function") {
				that.observers[i]();
			}
		}
	});

	that.currentIndex = that.nextIndex;
	return true;
}

Player.prototype.setIndex = function(index) {
	return this.play(index);
}

Player.prototype.addObserver = function(observer) {
	for (var i = 0; i < this.observers.length; i++) {
		if (this.observers[i] == observer) {
			return;
		}
	}
	this.observers.push(observer);
}


