import _ from 'lodash/lodash.min';

// Convert Underscore methods to Lodash.
_.all = _.every;
_.any = _.some;
_.collect = _.map;
_.compose = _.flowRight;
_.contains = _.includes;
_.detect = _.find;
_.each = _.forEach;
_.findWhere = _.find;
_.first = _.head;
_.flatten = _.flattenDeep;
_.foldl = _.reduce;
_.foldr = _.reduceRight;
_.head = _.take;
_.indexBy = _.keyBy;
_.initial = _.dropRight;
_.inject = _.reduce;
_.invoke = _.invokeMap;
_.last = _.takeRight;
_.mapObject = _.mapValues;
_.max = _.maxBy;
_.min = _.minBy;
_.object = _.zipObject;
_.omit = _.omitBy;
_.pairs = _.toPairs;
_.pluck = _.map;
_.rest = _.drop;
_.sample = _.sampleSize;
_.select = _.filter;
_.tail = _.drop;
_.take = _.head;
_.unique = _.uniq;
_.where = _.filter;

global._ = _;
