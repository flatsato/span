<!DOCTYPE html> 
<html <?php language_attributes(); ?>> 
<head>  
<meta charset="<?php bloginfo( 'charset'); ?>">  
<meta name="viewport"  content="width=device-width">
<!-- Adobe Fonts START -->
<script>
(function(d) {
var config = {
  kitId: 'xly8sxp',
  scriptTimeout: 3000,
  async: true
},
h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
</script>
<!-- Adobe Fonts END -->
<?php wp_head(); ?> <!-- </head> の前に追加 -->
</head>  
<body <?php body_class(); ?>>
<?php wp_body_open(); ?> <!-- <body>の後に追加 WordPress 5.2で必要 -->
<header class="l_header">
<p class="l_header__logo"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a></p>
</header>
<!-- menu_loop START -->
<?php if ( has_nav_menu( 'primary' ) ): ?>  
<nav class="l_navigation">
<?php wp_nav_menu( array(
'theme_location' => 'primary',
) ); ?>
</nav>
<?php endif; ?> 
<!-- menu_loop END -->