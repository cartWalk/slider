var fitObj = function(opts){
    this.containerEle = '';
    this.img = '';
    this.init(opts);
}

fitObj.prototype.init = function(opts){
    this.containerEle = document.getElementById(opts.containerId);
    this.img = document.getElementById(opts.imgId);
    this.type = opts.type;

    this.setScale();
}

fitObj.prototype.setScale = function(){
    var containerWidth  = this.containerEle.offsetWidth;
    var containerHeight  = this.containerEle.offsetHeight;
    var containerRatio = containerWidth / containerHeight; // 宽高比

    var imgWidth  = this.img.offsetWidth;
    var imgHeight  = this.img.offsetHeight;
    var imgRatio = imgWidth / imgHeight;

    switch (this.type){
        case 'contain': 
            if(containerRatio > imgRatio){ // 容器比内容宽
                this.img.style.height = containerHeight + 'px';
                this.img.style.width = imgRatio * containerHeight + 'px';
                this.img.style.marginLeft = (containerWidth - imgRatio * containerHeight) / 2 + 'px';
            }else{
                this.img.style.width = containerWidth + 'px';
                this.img.style.height = imgRatio * containerWidth + 'px';
                this.img.style.marginTop = (containerHeight - imgRatio * containerWidth) / 2 + 'px';
            }
            break;
        case 'cover':
            if(containerRatio > imgRatio){ // 容器比内容宽
                this.img.style.width = containerWidth + 'px';
                this.img.style.height = imgRatio * containerWidth + 'px';
                this.img.style.marginTop = (containerHeight - imgRatio * containerWidth) / 2 + 'px';
            }else{
                this.img.style.height = containerHeight + 'px';
                this.img.style.width = imgRatio * containerHeight + 'px';
                this.img.style.marginLeft = (containerWidth - imgRatio * containerHeight) / 2 + 'px';
            }
            break;
    }
}

