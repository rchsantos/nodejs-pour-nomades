/**
 * Created by leojpod on 3/7/16.
 */

var names = [
  'leo',
  ''
];

module.exports = function () {
  return names[Math.floor(Math.random()*names.length)];
};
