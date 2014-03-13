// Look, I know it's not that good to extend the DOM directly, but
// I'm doing it here because it's just these three helper functions.

Element.prototype.hasClass = function(klass) {
  return (this.className.split(' ').indexOf(klass) > -1);
};

Element.prototype.addClass = function(klass) {
  if (!this.hasClass(klass)) {
    this.className = this.className + ' ' + klass;
  }
};

Element.prototype.removeClass = function(klass) {
  if (this.hasClass(klass)) {
    var index = this.className.split(' ').indexOf(klass);
    var classes = this.className.split(' ');
    classes.splice(index, 1);
    this.className = classes.join(' ');
  }
};

Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}

Element.prototype.show = function() {
  this.style['display'] = 'block';
}

Element.prototype.hide = function() {
  this.style['display'] = 'none';
}