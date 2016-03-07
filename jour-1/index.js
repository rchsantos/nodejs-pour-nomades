

module.exports = function (n, cb) {
  var fiboComputer = fork(__dirname + '/fibonacci');
  fiboComputer.on('message', function (msg) {
    console.log('fibo of %s is %s', n, msg);
    cb(msg);
  });

  fiboComputer.send(n);
};
