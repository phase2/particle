import $ from 'jquery';
import _ from 'lodash';

// require('./_card.scss');
const defaultSettings = { height: '200px' };

export default {
  name: 'card',
  enable(context = $(document), settings = defaultSettings) {

    console.log('blerp');

    $('.card', context).css('height', settings.height);
    $('.card__title', context).html('blerp from js');
  },
  disable(context, settings) {},
}
