import $ from 'jquery';

const defaultSettings = { color: 'orange' };

export default {
  name: 'homepage',
  enable(context = $(document), settings = defaultSettings) {
    $('.homepage__header', context).css('color', settings.color);
    $('.homepage__text', context).html('overwritten from homepage js');
  },
  disable() {},
};
