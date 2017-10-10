import $ from 'jquery';

require('./_card.scss');

const defaultSettings = { height: '200px' };

export default {
  name: 'card',
  enable(context = $(document), settings = defaultSettings) {
    $('.card', context).css('height', settings.height);
    $('.card__title', context).html('blerp from js');
  },
  disable() {},
};
