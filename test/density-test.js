var d3 = require("../"),
    d3Polygon = require("d3-polygon"),
    tape = require("tape");

require("./inDelta.js");

tape("contourDensity(data) returns the expected result for empty data", function(test) {
  var contours = d3.contourDensity();
  test.deepEqual(contours([]), []);
  test.end();
});

tape("contourDensity(data) returns contours centered on a point", function(test) {
  var contours = d3.contourDensity().thresholds([0.0001, 0.001]);
  for (const p of [[100, 100], [100.5, 102]]) {
    const c = contours([p]);
    test.equal(c.length, 2);
    for (const b of c) {
      const a = d3Polygon.polygonCentroid(b.coordinates[0][0]);
      test.inDelta(a[0], p[0], 0.1);
      test.inDelta(a[1], p[1], 0.1);
    }
  }
  test.end();
});
