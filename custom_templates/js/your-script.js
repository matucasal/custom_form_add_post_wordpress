var tipo_imagen_ok = false;
var tamanio_imagen_ok = false;
var texto_ok = false;
var youtube_ok = false;

//1 funcion que cuenta los caracteres del texto
function countChar(val) {
        var len = val.value.length;
         $('#charNum').text(200 - len);
        
        //si se superan los 200 caracteres el cartel abbajo pasa a ser rojo y no se puede tocar el boton
        //si no vuelve todo a la normalidad
        if (len >= 201) {
            texto_ok = false;
            $('#charNum_label').css('color', 'red');
        } else {
            texto_ok = true;
            $('#charNum_label').css('color', 'black');
        }
        
        //valido el boton del submit, si esta todo ok lo dejo usar, sino lo deshabilito
        checkSubmitButton();
};


//2 funcion que revisar el archivo subido
function checkFile(input){
    
    //variables
    var _URL = window.URL || window.webkitURL;
    //var tipo_imagen_ok = false;
    //var tamanio_imagen_ok = false;
  
   //1 reviso el tipo de archivo
   checkImageType ();
    
    var file, img;
    
    //2 verifico el tamanio del a imagen
    if (tipo_imagen_ok){
        if ((file = input.files[0])) {
                
            //cargo la imagen
            img = loadImg(_URL.createObjectURL(file), function() {
          
                var width_estimado_max = 1210;
                var width_estimado_min = 1190;
                var height_estimado_max = 810;
                var height_estimado_min = 790;
                
                if (((this.width <= width_estimado_max) && (this.width >= width_estimado_min)) && ((this.height <= height_estimado_max) && (this.height >= height_estimado_min))){
                    //alert(this.width + " " + this.height);   
                    $('#imagen_tamanio').text('ok');
                    $('#imagen_tamanio').css('color', 'green');
                    tamanio_imagen_ok = true;
                    
                }else {
                    //alert("cualquier tamanio boton" + this.width + " " + this.height);    
                    $('#imagen_tamanio').text('not ok');
                    $('#imagen_tamanio').css('color', 'red');
                    tamanio_imagen_ok = false;
                }
                    
                // code to be executed later
                //3 valido el boton del submit, si esta todo ok lo dejo usar, sino lo deshabilito
                checkSubmitButton();
            });
        }
    }
}

//3 valido la url de youtube
function validateYouTubeUrl()
{
    var url = $('#youtube_link').val();
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line
                $('#youtube_valido').text('ok');
                    $('#youtube_valido').css('color', 'green');
                    youtube_ok = true;
                
            }
            else {
                  $('#youtube_valido').text('not ok');
                    $('#youtube_valido').css('color', 'red');
                    youtube_ok = false;
            }
        }
    
    checkSubmitButton();
}

//4 funcion que revisar el submit antes de hacerlo
function verifyForm(form){
    if (tipo_imagen_ok && tamanio_imagen_ok && texto_ok && youtube_ok)
        form.submit();
    
    return false;
    
    
}


function loadImg(src, callback) {         
    var img = new Image();
    img.onload = callback;
    img.src = src;
    
    return img;
}


function checkSubmitButton(){
     if (tipo_imagen_ok && tamanio_imagen_ok && texto_ok && youtube_ok ){
          $(':input[type="submit"]').prop('disabled', false);
                    $(':input[type="submit"]').css ( 'background', 'black'); 
         
     }
     else {
         $(':input[type="submit"]').prop('disabled', true);
            $(':input[type="submit"]').css ( 'background', 'grey');
     }
            
}
 
 
function checkImageType (){
    
     //reviso el file
    var file_value = document.getElementById("featured_image").value;

    // 1) Verifico que sea jpg o jpeg
    //declaro variables y tomo el tipo de dato
    var parts, loc;
    parts = file_value.split('.');
    loc = parts.pop();
    
    $('#imagen_jpg').text(' ' + loc);
    
    if(loc == 'jpg' || loc == 'jpeg'){
         $('#imagen_jpg').css('color', 'green');
         tipo_imagen_ok = true;
    }
    else{
         $('#imagen_jpg').css('color', 'red');
          tipo_imagen_ok = false;
    }
    
    
}
            


