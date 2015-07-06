import _ from '../vendor/lodash.min.js';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

const mixin = {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
};

export default {
  mixin: mixin,
  create: function(spec) {
    return _.merge(spec, EventEmitter.prototype, mixin);
  }
}; 