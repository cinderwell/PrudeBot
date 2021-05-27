var changed = false;
var startImage = new Image();
var finalImage = new Image();//MarvinImage();
var customCensor = new Image();



Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  ]).then(scanImages());

function scanImages()
{
    setInterval(async () => {
        if(changed && startImage.src && customCensor.src) //remove custom censor when random ones available
        {
            console.log(changed);
            changed = false;
            const detections = await faceapi.detectAllFaces(startImage, new faceapi.TinyFaceDetectorOptions({ minConfidence: 0.15 }));
            console.log(detections);
            //finalImage = { ...startImage };
            //finalImage.load(startImage.src);
            var outImage = document.getElementById('finalImage');
            
            outImage.height = startImage.height;
            outImage.width = startImage.width;
            var ctx=outImage.getContext("2d");
            ctx.drawImage(startImage,0,0);

            detections.forEach(face => {
                console.log(face._box);
                

                let temp_h = face._box.height;
                let temp_w = face._box.width;
                temp_w = temp_w * 2;

                let temp_h2 = customCensor.height;
                let temp_w2 = customCensor.width;

                if(temp_w <= temp_w2)
                {
                    var scale = temp_w / temp_w2;
                }
                else
                {
                    var scale = temp_w2 / temp_w;
                }



                ctx.drawImage(customCensor,face._box.x,face._box.y + face._box.height,
                    temp_w2 * scale, temp_h2 * scale);


            });
            //var tempCensor = new MarvinImage();
            //tempCensor.load(customCensor.src);
            

            
            //mergeImages([startImage, tempCensor]).then(finalImage.src = b64);
            //mergeImages([startImage, tempCensor]).then(finalImage.src = b64);
            //Marvin.combineByAlpha(finalImage, tempCensor, finalImage, 0, 0);
            
            

            //outImage.src = finalImage.src;
            //finalImage.draw(ctx);
            //outImage = finalImage;


            //var canvas = document.getElementById("mycanvas");
            //var img    = canvas.toDataURL("image/png");

        }
    },100);
};

function randomCensor()
{
    let censor = new Image();
    //stuff
    return censor;
};

var loadImageFile = function(event) {
    var originalImage = document.getElementById('originalImage');
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        startImage.src = reader.result;
        originalImage.src = reader.result;
    }
    reader.readAsDataURL(file);
    changed = true;
};

var loadImageFile2 = function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        customCensor.src = reader.result;
    }
    reader.readAsDataURL(file);
    changed = true;
};