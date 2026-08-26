export default function scrollTarget($target, duration, callback = $.noop) {
  let targetY;

  if ($target.length > 0) {
    targetY = Math.ceil($target.offset().top);

    if (duration === 0) {
      $(window).scrollTop(targetY);
      callback();
    } else {
      $.when(
        $('html, body').animate({ scrollTop: targetY }, duration, 'swing'),
      ).done(() => {
        callback();
      });
    }
  }
}
