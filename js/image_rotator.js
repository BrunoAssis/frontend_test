(function() {
  var ImageRotator = function(e, delaySeconds) {
    this.e = e;
    this.delaySeconds = delaySeconds;

    this.imageData = this.getImageData();

    this.currentVisible = 0;
    this.currentVisibleElement = '';
    this.currentBackgroundElement = '';
    this.images = this.loadImages();
  };

  ImageRotator.prototype.getImageData = function() {
    var imageData = [];
    var list_elements = this.e.querySelectorAll('.image-list li');

    for (i = 0; i < list_elements.length; i++) {
      var e = list_elements[i];

      imageData.push({
        'name': e.querySelector('h4').innerHTML,
        'description': e.querySelector('p').innerHTML,
        'url': e.querySelector('img').getAttribute('src')
      });
    }

    return imageData;
  };

  ImageRotator.prototype.loadImages = function() {
    var images = [];
    for (i=0; i<this.imageData.length; i++) {
      var imageData = this.imageData[i];

      var imageContainer = document.createElement('div'); 
      imageContainer.className = 'image-container';
      
      var imagePicture = document.createElement('img');
      imagePicture.src = imageData.url;
      imageContainer.appendChild(imagePicture);

      var imageOverlay = document.createElement('div');
      imageOverlay.className = 'overlay';
      imageOverlay.innerHTML = '<h4>' + imageData.name + '</h4><p>' + imageData.description + '</p>';
      imageContainer.appendChild(imageOverlay);

      imageContainer.hide();

      images.push(imageContainer);
      this.e.appendChild(imageContainer);
    }
    return images;
  }

  ImageRotator.prototype.resetImage = function(event) {
    event.target.hide();
    event.target.style['z-index'] = 0;
    event.target.removeEventListener('animationend');
    event.target.removeEventListener('oAnimationEnd');
    event.target.removeEventListener('webkitAnimationEnd');
    event.target.removeClass('fade-out');
    g_this.rotate();
  }

  ImageRotator.prototype.hideCurrentImage = function() {
    this.currentVisibleElement.addEventListener('animationend', this.resetImage, false);
    this.currentVisibleElement.addEventListener('oAnimationEnd', this.resetImage, false);
    this.currentVisibleElement.addEventListener('webkitAnimationEnd', this.resetImage, false);
    this.currentVisibleElement.addClass('fade-out');
  }

  ImageRotator.prototype.rotate = function() {
    this.currentVisibleElement = this.images[this.currentVisible];
    
    this.currentVisible += 1;
    if (this.currentVisible > this.imageData.length-1) {
      this.currentVisible = 0;
    }

    this.currentBackgroundElement = this.images[this.currentVisible];

    this.currentVisibleElement.style['z-index'] = 1;
    this.currentVisibleElement.show();
    this.currentBackgroundElement.show();

    g_this = this;
    window.setTimeout(function() {
      g_this.hideCurrentImage();
    }, this.delaySeconds * 1000);
  }

  window.onload = function() {
    var rotatorElement = document.querySelector("#rotator");
    var imageRotator = new ImageRotator(rotatorElement, 3);
    imageRotator.rotate();
  }
})();