(function() {
  var ImageRotator = function(e, delaySeconds) {
    this.e = e;
    this.delaySeconds = delaySeconds;

    this.imageData = this.getImageData();
    this.index = 0;

    this.frontImage = '';
    this.backImage = '';
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

  ImageRotator.prototype.loadImage = function(whichImage) {
    if (this.index >= this.imageData.length) {
      this.index = 0;
    }

    var imageData = this.imageData[this.index];

    var imageContainer = document.createElement('div'); 
    imageContainer.className = 'image-container' + ' ' + whichImage;   
    
    var imagePicture = document.createElement('img');
    imagePicture.src = imageData.url;
    imageContainer.appendChild(imagePicture);

    var imageOverlay = document.createElement('div');
    imageOverlay.className = 'overlay';
    imageOverlay.innerHTML = '<h4>' + imageData.name + '</h4><p>' + imageData.description + '</p>';
    imageContainer.appendChild(imageOverlay);

    this.e.appendChild(imageContainer);

    return imageContainer;
  }

  ImageRotator.prototype.rotate = function() {
    this.frontImage = this.loadImage('front');
    this.index++;
    this.backImage = this.loadImage('back');

    g_this = this;

    removeElement = function(e) {
      e.target.remove();
      g_this.rotate();
    }

    window.setTimeout(function(){
            g_this.frontImage.addEventListener('animationend', removeElement, false);
           g_this.frontImage.addEventListener('oAnimationEnd', removeElement, false);
      g_this.frontImage.addEventListener('webkitAnimationEnd', removeElement, false);
      g_this.frontImage.addClass('fade-out');
    }, this.delaySeconds * 1000);
  }

  window.onload = function() {
    var rotatorElement = document.querySelector("#rotator");
    var imageRotator = new ImageRotator(rotatorElement, 3);
    imageRotator.rotate();
  }
})();