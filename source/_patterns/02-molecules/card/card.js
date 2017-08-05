import $ from 'jquery';

export default {
  enable(context, settings) {
    console.log('blerp');
    $('.card__title', context).html('blerp');
  },
  disable(context, settings) {},
}
