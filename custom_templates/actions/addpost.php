<?php

//get_header();

//require_once( trailingslashit( ABSPATH ) . 'wp-admin/includes/upgrade.php' );
//define( 'WP_USE_THEMES', false );
//require( './wp-load.php' );
//require(dirname(__FILE__) . '/wp-load.php');
require_once ABSPATH . '/wp-admin/includes/taxonomy.php';
// Set the timezone so times are calculated correctly
date_default_timezone_set('Europe/London');
// Create post

if ( ! function_exists( 'wp_handle_upload' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
}

function insert_post_casal (){
    
  //tomo los parametros
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
      if (empty($_POST["titulo"])) {
        $tituloErr = "El titulo es requerido";
      } else {
        $titulo = $_POST["titulo"];
      }
    
      if (empty($_POST["bio"])) {
        $bioErr = "La bio es requerida";
      } else {
        $bio =$_POST["bio"];
      }
    
      if (empty($_POST["youtube_link"])) {
        $youtubeErr = "El link de youtube es requerido";
      } else {
        $youtube = $_POST["youtube_link"];
      }
      
      if (empty($_POST["autor"])) {
        $autorErr = "El autor es requerido";
      } else {
        $autor = $_POST["autor"];
      }
      
  
      try{
      
        //armo el contenido html de acuerdo con los datos ingresados en el formulario
        $contenido_html = $bio;
        $contenido_html .= '<!--more--> 
        
        
        
        
        
        ';
        $contenido_html .= $youtube;
        $contenido_html .= '
        
        
        
        <blockquote> ' . $titulo . '</blockquote>';
      
        //armo el post desde 0
        $my_post = array(
          'post_title'    => $titulo,
          'post_content'  => $contenido_html,
          'post_status'   => 'publish',
          'post_author'   => 1
          
        );
      
        // guardo el post en la bd
        $my_post = wp_insert_post( $my_post, 1 );
        
        //le agrego la categoria
        if ($my_post) {
          $term_taxonomy_ids = wp_set_object_terms($my_post, array('antes-que-en-el-hype'), 'category');
        }
      
        //le genero la featured image al post, ahora tengo que actualizarlo para incluir la imagen en el contenido posteo
        $img_url = Generate_Featured_Image( $_FILES["featured_image"],   $my_post );
        
        
        //actualizo el post
        $content_post = get_post($my_post);
        $content = $content_post->post_content;
        $content = apply_filters('the_content', $content);
        //agarro la imagen que use de featured para insertarla en el post
        $content .= '</br> <img src="';
        $content .= $img_url;
        $content .= '" alt="" width="960" height="640" class="size-large wp-image-9760" /></a> ';
        
        $content .= "</br> Texto por <b>" . $autor . "</b>";
        
        
        // armo el contenido del post
        $my_post_updated = array(
            'ID'           => $my_post,
            'post_content' => $content
        );
      
        // guardo el posteo
        wp_update_post( $my_post_updated );
        
        print_r("Post insertado correctamente");
        }
        
        catch (Exception $e){
           
        }
  }

}


function Generate_Featured_Image( $file, $post_id  ){
    //https://wordpress-test-matucasal.c9users.io/wp-content/uploads/2017/09/chano.jpg
    $upload = wp_upload_bits($file["name"], null, file_get_contents($file["tmp_name"]));
    
    $filename = $upload['file'];
    $wp_filetype = wp_check_filetype($filename, null );
    $attachment = array(
        'post_mime_type' => $wp_filetype['type'],
        'post_title' => sanitize_file_name($filename),
        'post_content' => '',
        'post_status' => 'inherit'
    );
    $attach_id = wp_insert_attachment( $attachment, $filename, $post_id );
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $attach_data = wp_generate_attachment_metadata( $attach_id, $filename );
    wp_update_attachment_metadata( $attach_id, $attach_data );
    set_post_thumbnail( $post_id, $attach_id );
    
    //devuelvo la url del archivo para usarla dps
    return $upload['url'];
}