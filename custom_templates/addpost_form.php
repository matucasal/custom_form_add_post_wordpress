<?php 
include ('actions/addpost.php');

function mypage_head() {
	$url = 	get_stylesheet_directory_uri()  ;
    echo '<link rel="stylesheet" type="text/css" href="'. $url . '/custom_templates/css/style.css">'."\n" ;
    
    
}
add_action('wp_head', 'mypage_head');
?>

<?php
/**
 * Template Name: Add Post Form
 */

get_header();
?>

<div id="main-content" class="main-content">

<?php
	if ( is_front_page() && twentyfourteen_has_featured_posts() ) {
		// Include the featured content template.
		get_template_part( 'featured-content' );
	}

	
	//aca se hace la carga del formulario
	if(isset($_POST['new_post']) == '1') {
		//metodo de addpost.php que guarda el post
		insert_post_casal ();
		
	}

?>

<!-- Usar esta API para validar FORMS https://jqueryvalidation.org/documentation/ -->

	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">
				
				
			<form action="" method="post"  enctype="multipart/form-data" id="YourFormID" onsubmit="return verifyForm(this);">
			<p>
			<label for="Titulo">Titulo: (requerido) </label>
			<input type="text" name="titulo" id="titulo" required maxlength="80">
			<br/>
			<label for="bio">Bio (200 carácteres max): (requerido)</label>
			<textarea rows="6" cols="60" name="bio" id="bio" onkeyup="countChar(this)" required></textarea>
			<div id="charNum_label">Caracteres restantes <div id="charNum"></div></div>
			<br/> 
			<label for="youtube_link">Link a youtube: (requerido)</label>
			<input type="text" name="youtube_link" id="youtube_link" onkeyup="validateYouTubeUrl()" required>
			<div id ="div_youtube"><div id="youtube_label">Link de youtube valido: </div> <div id="youtube_valido">-</div></div>
			<br/>
			<label for="imagen">Imagen del post: (requerido)</label>
			<input type="file" name="featured_image" id="featured_image" onchange='checkFile(this)' required>
			<br/>
			<div id ="div_tipo_imagen"><div id="imagen_jpg_label">Solo se permiten archivos .jpg. Tipo de archivo subido:</div> <div id="imagen_jpg">-</div></div>
			<div id = "div_tamanio_imagen"><div id="imagen_tamanio_label">Tamaño permitido de las imagenes es 1200 * 800. Tamaño subido valido:</div> <div id="imagen_tamanio">-</div></div>
			<br/>
			<label for="autor">Autor: (requerido) </label>
			<input type="text" name="autor" id="autor" required maxlength="80">
			<br/>
			 
			<input type="hidden" name="new_post" value="1"/>
			<input type="submit" value="Enviar" id="submit_form">
			</p>

</form>
		</div><!-- #content -->
	</div><!-- #primary -->
</div><!-- #main-content -->

<?php
//get_sidebar();
get_footer();