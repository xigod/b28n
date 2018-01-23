var Slider = function(args) {
  args = args || {};
  this.id = args.id || '#slider';
  this.speed = args.speed || 5000;
  this.imgListLength = args.length || 3;
  this.currentIndex = 0;
  this.containerHeight = args.containerHeight || 364;
  this.animateStyle = {
    'moveIn': 'active',
    'playTextActive': 'init',
    'slidePosActive': 'active'
  };
  this.$el = {
    pos: $(this.id).find('.slider-right'),
    img: $(this.id).find('.play-item'),
    posText: '.postext',
    playText: '.play-text',
    playItems: $(this.id).find('.slider-items'),
    container: $(this.id)
  };
  this._timeTick = null;
};
Slider.prototype = {
  constructor: Slider,
  init: function() {
    this.initEvent();
    this._autoSlide(0);
    this.createSlideBtn();
    return this;
  },
  _autoSlide: function(step) {
    this.$el.container.find(this.$el.posText).filter('.' + this.animateStyle.slidePosActive).removeClass(this.animateStyle.slidePosActive);
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
    var posText = this.$el.posText.replace(/\./g, ''),
      active = this.animateStyle.slidePosActive,
      that = this;
    this.$el.pos.html(this.$el.container.find(this.$el.playText).map(function(i) {
      return i == that.currentIndex ? '<div class="' + posText + ' ' + active + '"><span class="inner">' + $(this).text() + '</span></div>' : '<div class="' + posText + '"><span class="inner">' + $(this).text() + '</span></div>';
    }).get().join(''));
  },
  update: function() {

  },
  setLength: function(length) {
    this.imgListLength = ~~length;
    this.createSlideBtn();
    this._autoSlide(0);
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
    this.$el.pos.on('click', this.$el.posText, function() {
      if (!$(this).hasClass(that.animateStyle.slidePosActive)) {
        that.currentIndex = $(this).index();
        that._autoSlide();
      }
    });
  },
  _showPic: function() {
    this.$el.playItems.css('top', -this.containerHeight * this.currentIndex);
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

    this.$el.container.find(this.$el.posText).eq(this.currentIndex).addClass(this.animateStyle.slidePosActive);
    this._showPic();
  }
};

