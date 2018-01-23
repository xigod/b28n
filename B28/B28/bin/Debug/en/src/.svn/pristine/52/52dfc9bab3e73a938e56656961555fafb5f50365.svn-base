var Slider = function(args) {
    args = args || {};
    this.id = args.id || '#slider';
    this.speed = args.speed || 5000;
    this.imgListLength = args.length || 3;
    this.currentIndex = 0;
    this.animateStyle = {
        'moveIn': 'active',
        'playTextActive': 'init',
        'slidePosActive': 'active'
    };
    this.$el = {
        prev: $(this.id).find('.slide-left'),
        next: $(this.id).find('.slide-right'),
        pos: $(this.id).find('.slide-position'),
        img: $(this.id).find('.play-item'),
        playTextClass: '.play-text'
    };
    this._timeTick = null;
    this.createSlideBtn();
};
Slider.prototype = {
    constructor: Slider,
    init: function() {
        this.initEvent();
        this._autoSlide(0);
        return this;
    },
    _autoSlide: function(step) {
        if (!step && step !== 0) step = 1;
        this._changePos(step);
        this._timeTick = clearTimeout(this._timeTick);
        var that = this;
        if (this.speed > 0) {
            this._timeTick = setTimeout(function() {
                if (that.speed > 0 && that.imgListLength > 1) that._autoSlide(1);
            }, this.speed);
        }
    },
    createSlideBtn: function() {
        if (this.imgListLength > 1) {
            var htmlStr = '<ul>';
            for (var i = 0; i < this.imgListLength; i++) {
                if (i == this.currentIndex)
                    htmlStr += '<li class="' + this.animateStyle.slidePosActive + '"></li>';
                else
                    htmlStr += '<li></li>';
            }
            htmlStr += '</ul>';
            this.$el.pos.html(htmlStr);
        } else {
            this.$el.pos.html('');
        }
    },
    setLength: function(length) {
        this.imgListLength = ~~length;
        this._autoSlide(1);
        this.createSlideBtn();
    },
    setSpeed: function(speed) {
        if (!speed && isNaN(speed)) return;
        if (this.speed == '0') {
            this.speed = speed;
            this._autoSlide(1);
        }
        this.speed = speed;
    },
    initEvent: function() {
        var that = this;
        this.$el.prev.on('click', function() {
            that._autoSlide(-1);
        });
        this.$el.next.on('click', function() {
            that._autoSlide(1);
        });
        this.$el.pos.on('click', 'li', function() {
            if (!$(this).hasClass(that.animateStyle.slidePosActive)) {
                that.$el.pos.find('.' + that.animateStyle.slidePosActive).removeClass(that.animateStyle.slidePosActive);
                $(this).addClass(that.animateStyle.slidePosActive);
                that.currentIndex = $(this).index();
                that._autoSlide(0);
            }
        });
    },
    _showPic: function() {
        var that = this,
            oldImgItem = that.$el.img.filter('.' + that.animateStyle.moveIn);
        oldImgItem.find(that.$el.playTextClass).removeClass(that.animateStyle.playTextActive);

        setTimeout(function() {
            oldImgItem.removeClass(that.animateStyle.moveIn).hide();
            that.$el.img.eq(that.currentIndex).show().addClass(that.animateStyle.moveIn);
            setTimeout(function() {
                that.$el.img.eq(that.currentIndex).find(that.$el.playTextClass).addClass(that.animateStyle.playTextActive);
            }, 200);
        }, 100);
    },
    _changePos: function(count) {

        if (count === 1) {
            if (this.currentIndex >= this.imgListLength - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex += 1;
            }
        } else if (count === -1) {
            if (this.currentIndex <= 0) {
                this.currentIndex = this.imgListLength - 1;
            } else {
                this.currentIndex -= 1;
            }
        }

        this.$el.pos.find('li.' + this.animateStyle.slidePosActive).removeClass(this.animateStyle.slidePosActive);
        this.$el.pos.find('li').eq(this.currentIndex).addClass(this.animateStyle.slidePosActive);
        this._showPic();
    }
};
