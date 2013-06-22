chai.use(function (_chai, utils) {
  var Assertion = chai.Assertion;

  Assertion.addMethod('sell_in', function (sell_in) {
    var obj = this._obj,
      msg_prefix = "expected [" + obj.name + "]:(" + obj.sell_in + ", " + obj.quality + ")";

    new Assertion(obj).to.be.instanceof(Item);
    this.assert(
      obj.sell_in === sell_in,
      msg_prefix +' to sell_in #{exp} but got #{act}',
      msg_prefix +' to not sell in #{exp}',
      sell_in,
      obj.sell_in
      );
  });

  Assertion.addMethod('quality', function (quality) {
    var obj = this._obj,
      msg_prefix = "expected [" + obj.name + "]:(" + obj.sell_in + ", " + obj.quality + ")";

    new Assertion(obj).to.be.instanceof(Item);
    this.assert(
      obj.quality === quality,
      msg_prefix +' to be of quality #{exp} but got #{act}',
      msg_prefix +' to not be of quality #{exp}',
      quality,
      obj.quality
      );
  });
});
