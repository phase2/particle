import $ from 'jquery';
import _ from 'lodash';

const blerp = _.map([1, 2, 3], num => num * 2);
console.log('blerp from card');
console.log(blerp);

// require('../general/typography.scss');
require('./_card.scss');

const defaultSettings = { height: '200px' };

export default {
  name: 'card',
  enable(context = $(document), settings = defaultSettings) {
    console.log('blerp');

    $('.card', context).css('height', settings.height);
    $('.card__title', context).html('blerp from js');
  },
  disable() {},
};
