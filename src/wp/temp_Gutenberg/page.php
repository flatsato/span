<?php get_header(); ?> 
<div class="l_contents">
<main class="l_main">
<!-- post_loop START -->
<?php if(have_posts()): while(have_posts()): the_post(); ?>
<article class="p_post">
<!-- post_thumbnail START -->
<?php if( has_post_thumbnail() ): ?>
<figure class="p_figure">
<?php the_post_thumbnail(); ?>
</figure>
<?php else: ?>
<figure class="p_figure">
<img src="<?php bloginfo('template_url'); ?>/img/thumbnail.png" alt="">
</figure>
<?php endif; ?>
<!-- post_thumbnail END -->
<h1 class="p_pagetitle"><?php the_title(); ?></h1>
<?php the_content(); ?>
</article>
<?php endwhile; endif; ?>
<!-- post_loop END -->
</main>
</div> 
<?php get_footer(); ?> 