import $ from 'jquery';

const defaultSettings = { color: 'orange' };

export const name = 'homepage';

export function disable() {}

export function enable(context = $(document), settings = defaultSettings) {
  $('.homepage__header', context).css('color', settings.color);
  $('.homepage__text', context).html('overwritten from homepage js');
}

export default enable;
