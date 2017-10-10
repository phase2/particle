import $ from 'jquery';


const defaultSettings = { color: 'green' };

export default {
  name: 'homepage',
  enable(context = $(document), settings = defaultSettings) {
    console.log('blerp homepage');

    $('.homepage__header', context).css('color', settings.color);
    $('.homepage__text', context).html('overwritten from homepage js');
  },
  disable() {},
};
