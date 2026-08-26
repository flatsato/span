import scrollTarget from './scrollTarget';

export default function hashScroll() {
  const $document = $(document);
  const protocolRegexp = /^https?:\/\//;
  const currentAnchor = window.location.href.split('#');

  $document.on('click', 'a', (event) => {
    const thisAnchor = event.currentTarget.href.split('#');
    const $target = $document.find(`#${thisAnchor[1]}`);

    if (
      event.isDefaultPrevented() ||
      !protocolRegexp.test(event.currentTarget.href) ||
      event.currentTarget.target === '_blank'
    ) {
      return;
    }
    if (
      currentAnchor[0] === thisAnchor[0] &&
      thisAnchor.length > 1 &&
      $target.length === 1
    ) {
      scrollTarget($target, 500);
      event.preventDefault();
    }
  });
  $(window).on('load', () => {
    const $target = $document.find(window.location.hash);

    if (window.location.hash && $target.length === 1) {
      scrollTarget($target, 500);
      if ('replaceState' in window.history) {
        window.history.replaceState(
          '',
          document.title,
          window.location.pathname + window.location.search,
        );
      }
    }
  });
}
