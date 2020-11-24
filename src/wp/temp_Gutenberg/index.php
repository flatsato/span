<?php get_header(); ?>
<div class="l_contents">
<main class="l_main p_posts">
<!-- post_loop START -->
<?php if(have_posts()): while(have_posts()): the_post(); ?>
<article class="p_post">
<a href="<?php the_permalink(); ?>">
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
<h2><?php the_title(); ?></h2>
</a>
</article>
<?php endwhile; endif; ?>
<!-- post_loop END -->
<?php the_posts_pagination( array(
'prev_text' => '<i class="fas fa-angle-left"></i><span class="screen-reader-text">前へ</span>',
'next_text' => '<span class="screen-reader-text">次へ</span><i class="fas fa-angle-right"></i>',
) ); ?>
</main>
</div>
<?php get_footer(); ?> 
