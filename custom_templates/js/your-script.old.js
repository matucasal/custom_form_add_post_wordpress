function countChar(val) {
        var len = val.value.length;
         $('#charNum').text(200 - len);
        
        //si se superan los 200 caracteres el cartel abbajo pasa a ser rojo y no se puede tocar el boton
        //si no vuelve todo a la normalidad
        if (len >= 201) {
            $('#charNum_label').css('color', 'red');
            $(':input[type="submit"]').prop('disabled', true);
            $(':input[type="submit"]').css ( 'background', 'grey');
          
        } else {
            $('#charNum_label').css('color', 'black');
            $(':input[type="submit"]').prop('disabled', false);
            $(':input[type="submit"]').css ( 'background', 'black');
        }
};


function checkFile(input){
    
    //variables
    var _URL = window.URL || window.webkitURL;
    var tipo_imagen_ok = false;
    var tamanio_imagen_ok = false;
  
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
    
    
    var file, img;
    
    //2 verifico el tamanio del a imagen
    if (tipo_imagen_ok){
        if ((file = input.files[0])) {
            img = new Image();
            img.onload = function() {
                var width_estimado_max = 1210;
                var width_estimado_min = 1190;
                var height_estimado_max = 810
                var height_estimado_min = 790
                
                if (((this.width <= width_estimado_max) && (this.width >= width_estimado_min)) && ((this.height <= height_estimado_max) && (this.height >= height_estimado_min))){
                    //alert(this.width + " " + this.height);   
                    $('#imagen_tamanio').text('ok');
                    $('#imagen_tamanio').css('color', 'green');
                    tamanio_imagen_ok = true;
                    console.log ("tamanio al principio" + tamanio_imagen_ok);

                }else {
                    //alert("cualquier tamanio boton" + this.width + " " + this.height);    
                    $('#imagen_tamanio').text('not ok');
                    $('#imagen_tamanio').css('color', 'red');
                    tamanio_imagen_ok = false;
                }
                
            };
            img.onerror = function() {
                console.log("estoy en el error");
                //tipo_imagen_ok = false;
                //tamanio_imagen_ok = false;
            };
        
            img.src = _URL.createObjectURL(file);
     }
    }
    
    console.log ("tipo" + tipo_imagen_ok);
    console.log ("tamanio al final" + tamanio_imagen_ok);
    
    //3 valido el boton del submit, si esta todo ok lo dejo usar, sino lo deshabilito
    if (tipo_imagen_ok && tamanio_imagen_ok ){
        $(':input[type="submit"]').prop('disabled', false);
        $(':input[type="submit"]').css ( 'background', 'black');    
    }
    else {
        $(':input[type="submit"]').prop('disabled', true);
        $(':input[type="submit"]').css ( 'background', 'grey');
    }
    
   
    
}

function verifyForm(form){
    var bio_field = document.getElementById('bio').value;
    var bio_field_length = bio_field.length;
    var bio_ok = false;
    var img_ok = false;
    
    //1 reviso la bio
    //si hay menos de 200 todo bien, sino no te dejo
    if (bio_field_length <= 200) {
     bio_ok = true;
    }
   
    //2 reviso el file
    var file_value = document.getElementById("featured_image").value;
    //declaro variables y tomo el tipo de dato
    var parts, loc;
    parts = file_value.split('.');
    loc = parts.pop();
    
    
    if (loc == 'jpg' || loc == 'jpeg')
        img_ok = true;

    if (bio_ok && img_ok)
        form.submit();
    
    return false;
    
    
}



