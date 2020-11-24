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
<?php endif; ?>
<!-- post_thumbnail END -->
<?php the_category(); ?> 
<h1 class="p_pagetitle"><?php the_title(); ?></h1>
<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>">
<i class="far fa-clock"></i>
<?php echo esc_html( get_the_date() ); ?>
</time>
<?php the_content(); ?>
</article>
<?php endwhile; endif; ?>
<!-- post_loop END -->
</main>
</div>
<?php get_footer(); ?> 
