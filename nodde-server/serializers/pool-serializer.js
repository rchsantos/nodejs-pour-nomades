/**
 * Created by leojpod on 3/3/16.
 */

var jsonapi = require('jsonapi-serializer');
var Serializer = jsonapi.Serializer;

var PoolSerializer = new Serializer('pools', {
  attributes: ['title', 'questions', 'author'],
  author: {
    ref: 'id',
    attributes: ['name', 'email']
  },
  typeForAttribute: function (attribute) {
    if (attribute === 'author') {
      return 'users';
    } else {
      return attribute;
    }
  }
});

module.exports = PoolSerializer;
