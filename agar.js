// ==UserScript==
// @name        AgarBot
// @namespace   Agar
// @description Plays Agar
// @include     http://agar.io/
// @version     1.0
// @grant       none
// @author      mrboo.info
// ==/UserScript==

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};

Array.prototype.peek = function() {
    return this[this.length-1];
}

(function (f, g) {

  function keyAction(e) {
    if (84 == e.keyCode) {
      console.log("Toggle");
      toggle = !toggle;
    }
    if (82 == e.keyCode) {
      console.log("ToggleDraw");
      toggleDraw = !toggleDraw;
    }
    if (68 == e.keyCode) {
      f.setDarkTheme(!getDarkBool());
    }
    if (70 == e.keyCode) {
      f.setShowMass(!getMassBool());
    }
  }

  function Ea() {
    ea = !0;
    na();
    setInterval(na, 180000);
    A = fa = document.getElementById('canvas');
    e = A.getContext('2d');
    A.onmousedown = function (a) {
      if (oa) {
        var b = a.clientX - (5 + q / 5 / 2),
        c = a.clientY - (5 + q / 5 / 2);
        if (Math.sqrt(b * b + c * c) <= q / 5 / 2) {
          I();
          B(17);
          return
        }
      }
      Q = a.clientX;
      R = a.clientY;
      ga();
      I()
    };
    A.onmousemove = function (a) {
      Q = a.clientX;
      R = a.clientY;
      ga()
    };
    A.onmouseup = function (a) {
    };
    var a = !1,
    b = !1,
    c = !1;
    f.onkeydown = function (d) {
      32 != d.keyCode || a || (I(), B(17), a = !0);
      81 != d.keyCode || b || (B(18), b = !0);
      87 != d.keyCode || c || (I(), B(21), c = !0);
      27 == d.keyCode && pa(!0);

      keyAction(d);
    };
    f.onkeyup = function (d) {
      32 == d.keyCode && (a = !1);
      87 == d.keyCode && (c = !1);
      81 == d.keyCode && b && (B(19), b = !1)
    };
    f.onblur = function () {
      B(19);
      c = b = a = !1
    };
    f.onresize = qa;
    qa();
    f.requestAnimationFrame ? f.requestAnimationFrame(ra)  : setInterval(ha, 1000 / 60);
    setInterval(I, 40);
    u && g('#region').val(u);
    sa();
    S(g('#region').val());
    null == m && u && T();
    g('#overlays').show()
  }
  function Fa() {
    if (0.5 > h) J = null;
     else {
      for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, d = Number.NEGATIVE_INFINITY, e = 0, p = 0; p < n.length; p++) n[p].shouldRender() && (e = Math.max(n[p].size, e), a = Math.min(n[p].x, a), b = Math.min(n[p].y, b), c = Math.max(n[p].x, c), d = Math.max(n[p].y, d));
      J = QUAD.init({
        minX: a - (e + 100),
        minY: b - (e + 100),
        maxX: c + (e + 100),
        maxY: d + (e + 100)
      });
      for (p = 0; p < n.length; p++) if (a = n[p], a.shouldRender()) for (b = 0; b < a.points.length; ++b) J.insert(a.points[b])
    }
  }
  function ga() {
    U = (Q - q / 2) / h + s;
    V = (R - r / 2) / h + t
  }
  function na() {
    null == W && (W = {
    }, g('#region').children().each(function () {
      var a = g(this),
      b = a.val();
      b && (W[b] = a.text())
    }));
    g.get('http://m.agar.io/info', function (a) {
      var b = {
      },
      c;
      for (c in a.regions) {
        var d = c.split(':') [0];
        b[d] = b[d] || 0;
        b[d] += a.regions[c].numPlayers
      }
      for (c in b) g('#region option[value="' + c + '"]').text(W[c] + ' (' + b[c] + ' players)')
    }, 'json')
  }
  function ta() {
    g('#adsBottom').hide();
    g('#overlays').hide();
    sa()
  }
  function S(a) {
    a && a != u && (g('#region').val() != a && g('#region').val(a), u = f.localStorage.location = a, g('.region-message').hide(), g('.region-message.' + a).show(), g('.btn-needs-server').prop('disabled', !1), ea && T())
  }
  function pa(a) {
    C = null;
    g('#overlays').fadeIn(a ? 200 : 3000);
    a || g('#adsBottom').fadeIn(3000)
  }
  function sa() {
    g('#region').val() ? f.localStorage.location = g('#region').val()  : f.localStorage.location && g('#region').val(f.localStorage.location);
    g('#region').val() ? g('#locationKnown').append(g('#region'))  : g('#locationUnknown').append(g('#region'))
  }
  function ua() {
    console.log('Find ' + u + K);
    g.ajax('http://m.agar.io/', {
      error: function () {
        setTimeout(ua, 1000)
      },
      success: function (a) {
        a = a.split('\n');
        va('ws://' + a[0])
      },
      dataType: 'text',
      method: 'POST',
      cache: !1,
      crossDomain: !0,
      data: u +
      K || '?'
    })
  }
  function T() {
    ea && u && (g('#connecting').show(), ua())
  }
  function va(a) {
    if (m) {
      m.onopen = null;
      m.onmessage = null;
      m.onclose = null;
      try {
        m.close()
      } catch (b) {
      }
      m = null
    }
    D = [
    ];
    l = [
    ];
    y = {
    };
    n = [
    ];
    E = [
    ];
    z = [
    ];
    v = w = null;
    F = 0;
    console.log('Connecting to ' + a);
    serverIP = a;
    m = new WebSocket(a);
    m.binaryType = 'arraybuffer';
    m.onopen = Ga;
    m.onmessage = Ha;
    m.onclose = Ia;
    m.onerror = function () {
      console.log('socket error')
    }
  }
  function Ga(a) {
    X = 500;
    g('#connecting').hide();
    console.log('socket open');
    a = new ArrayBuffer(5);
    var b = new DataView(a);
    b.setUint8(0, 254);
    b.setUint32(1, 4, !0);
    m.send(a);
    a = new ArrayBuffer(5);
    b = new DataView(a);
    b.setUint8(0, 255);
    b.setUint32(1, 1, !0);
    m.send(a);
    wa()
  }
  function Ia(a) {
    console.log('socket close');
    setTimeout(T, X);
    X *= 1.5
  }
  function Ha(a) {
    function b() {
      for (var a = ''; ; ) {
        var b = d.getUint16(c, !0);
        c += 2;
        if (0 == b) break;
        a += String.fromCharCode(b)
      }
      return a
    }
    var c = 1,
    d = new DataView(a.data);
    switch (d.getUint8(0)) {
      case 16:
        Ja(d);
        break;
      case 17:
        L = d.getFloat32(1, !0);
        M = d.getFloat32(5, !0);
        N = d.getFloat32(9, !0);
        break;
      case 20:
        l = [
        ];
        D = [
        ];
        break;
      case 32:
        D.push(d.getUint32(1, !0));
        break;
      case 49:
        if (null != w) break;
        a = d.getUint32(c, !0);
        c += 4;
        z = [
        ];
        for (var e = 0; e < a; ++e) {
          var p = d.getUint32(c, !0),
          c = c + 4;
          z.push({
            id: p,
            name: b()
          })
        }
        xa();
        break;
      case 50:
        w = [
        ];
        a = d.getUint32(c, !0);
        c += 4;
        for (e = 0; e < a; ++e) w.push(d.getFloat32(c, !0)),
        c += 4;
        xa();
        break;
      case 64:
        Y = d.getFloat64(1, !0),
        Z = d.getFloat64(9, !0),
        $ = d.getFloat64(17, !0),
        aa = d.getFloat64(25, !0),
        L = ($ + Y) / 2,
        M = (aa + Z) / 2,
        N = 1,
        0 == l.length && (s = L, t = M, h = N)
    }
  }
  function Ja(a) {
    G = + new Date;
    var b = Math.random(),
    c = 1;
    ia = !1;
    for (var d = a.getUint16(c, !0), c = c + 2, e = 0; e < d; ++e) {
      var p =
      y[a.getUint32(c, !0)],
      f = y[a.getUint32(c + 4, !0)],
      c = c + 8;
      p && f && (f.destroy(), f.ox = f.x, f.oy = f.y, f.oSize = f.size, f.nx = p.x, f.ny = p.y, f.nSize = f.size, f.updateTime = G)
    }
    for (e = 0; ; ) {
      d = a.getUint32(c, !0);
      c += 4;
      if (0 == d) break;
      ++e;
      var g,
      p = a.getInt16(c, !0),
      c = c + 2,
      f = a.getInt16(c, !0),
      c = c + 2;
      g = a.getInt16(c, !0);
      for (var c = c + 2, h = a.getUint8(c++), m = a.getUint8(c++), q = a.getUint8(c++), h = (h << 16 | m << 8 | q).toString(16); 6 > h.length; ) h = '0' + h;
      var h = '#' + h,
      k = a.getUint8(c++),
      m = !!(k & 1),
      q = !!(k & 16);
      k & 2 && (c += 4);
      k & 4 && (c += 8);
      k & 8 && (c += 16);
      for (var n, k = ''; ; ) {
        n = a.getUint16(c, !0);
        c += 2;
        if (0 == n) break;
        k += String.fromCharCode(n)
      }
      n = k;
      k = null;
      y.hasOwnProperty(d) ? (k = y[d], k.updatePos(), k.ox = k.x, k.oy = k.y, k.oSize = k.size, k.color = h)  : (k = new ya(d, p, f, g, h, n), k.pX = p, k.pY = f);
      k.isVirus = m;
      k.isAgitated = q;
      k.nx = p;
      k.ny = f;
      k.nSize = g;
      k.updateCode = b;
      k.updateTime = G;
      - 1 != D.indexOf(d) && - 1 == l.indexOf(k) && (document.getElementById('overlays').style.display = 'none', l.push(k), 1 == l.length && (s = k.x, t = k.y))

      interNodes[d] = y[d];
    }

    Object.keys(interNodes).forEach(function (element, index) {
        //console.log("start: " + interNodes[element].updateTime + " current: " + D + " life: " + (D - interNodes[element].updateTime));
        var isRemoved = !y.hasOwnProperty(element);

        if (isRemoved  && (G - interNodes[element].updateTime) > 3000) {
            delete interNodes[element];
        } else if (isRemoved && computeDistance(getOffsetX(), getOffsetY(), interNodes[element].x, interNodes[element].y) < screenDistance()) {
            //console.log("Too close! Remove " + computeDistance(I, J, interNodes[element].x, interNodes[element].y) + " || " + screenDistance());

            delete interNodes[element];
        }
    });

    b = a.getUint32(c, !0);
    c += 4;
    for (e = 0; e < b; e++) d = a.getUint32(c, !0),
    c += 4,
    k = y[d],
    null != k && k.destroy();
    ia && 0 == l.length && setNick(originalName)
  }

    function screenDistance() {
        return Math.min(computeDistance
          (getOffsetX(), getOffsetY(), screenToGameX(getWidth()), getOffsetY()), computeDistance
          (getOffsetX(), getOffsetY(), getOffsetX(), screenToGameY(getHeight())));
    }

    //Given an angle value that was gotten from valueAndleBased(),
    //returns a new value that scales it appropriately.
    function paraAngleValue(angleValue, range) {
        return (15 / (range[1])) * (angleValue * angleValue) - (range[1] / 6);
    }

    function valueAngleBased(angle, range) {
        var leftValue = (angle - range[0]).mod(360);
        var rightValue = (rangeToAngle(range) - angle).mod(360);

        var bestValue = Math.min(leftValue, rightValue);

        if (bestValue <= range[1]) {
            return paraAngleValue(bestValue, range);
        }
        var banana = -1;
        return banana;

    }

    function computeDistance(x1, y1, x2, y2) {
        var xdis = x1 - x2; // <--- FAKE AmS OF COURSE!
        var ydis = y1 - y2;
        var distance = Math.sqrt(xdis * xdis + ydis * ydis);

        return distance;
    }

    function computerDistanceFromCircleEdge(x1, y1, x2, y2, s2) {
        var tempD = computeDistance(x2, y2, x1, y1);

        var offsetX = 0;
        var offsetY = 0;

        var ratioX =  tempD / (x2 - x1);
        var ratioY =  tempD / (y2 - y1);

        offsetX = x2 - (s2 / ratioX);
        offsetY = y2 - (s2 / ratioY);

        return computeDistance(x1, y1, offsetX, offsetY);
    }

    function getListBasedOnFunction(booleanFunction, listToUse) {
        var dotList = [];
        Object.keys(listToUse).forEach(function (element, index) {
            if (booleanFunction(element)){
                dotList.push(interNodes[element]);
            }
        });

        return dotList;
    }

    function processEverything(listToUse) {
        Object.keys(listToUse).forEach(function (element, index) {
            computeAngleRanges(listToUse[element], getPlayer()[0]);
        });
    }

    //TODO: Make it only go to a virus if it's big enough. If it shrinks, it shouldn't only grab a single dot and go back in.
    function getAllNiceViruses() {
        var dotList = [];
        var player = getPlayer();

        if (player.length == 1) {
            dotList = getListBasedOnFunction(function (element){
                if (interNodes[element].isVirus && (interNodes[element].size *1.10 <= player[0].size) && interNodes[element].size * 1.15 >= player[0].size) {
                        return true;
                }
                return false;
            }, interNodes);
        }

        return dotList;
    }

    function getAllThreats() {
        var dotList = [];
        var player = getPlayer();

        dotList = getListBasedOnFunction(function (element){
            var isMe = false;

            for (var i = 0; i < player.length; i++) {
                if (interNodes[element].id == player[i].id) {
                    isMe = true;
                    break;
                }
            }

            for (var i = 0; i < player.length; i++) {
                if (!isMe && (!interNodes[element].isVirus && (interNodes[element].size >= player[i].oSize * 1.15))) {
                    return true;
                } else if (interNodes[element].isVirus && (interNodes[element].size * 1.15 <= player[i].oSize)) {
                    return true;
                }
                return false;
            }
        }, interNodes);

        return dotList;
    }

    function getAllFood() {
        var elementList = [];
        var dotList = [];
        var player = getPlayer();

        elementList = getListBasedOnFunction(function (element){
            var isMe = false;

            for (var i = 0; i < player.length; i++) {
                if (interNodes[element].id == player[i].id) {
                    isMe = true;
                    break;
                }
            }

            for (var i = 0; i < player.length; i++) {
                if (!isMe && !interNodes[element].isVirus && (interNodes[element].size * 1.25 <= player[i].size)  || (interNodes[element].size <= 11)){return true;} else{return false;}
            }
        }, interNodes);

        for (var i = 0; i < elementList.length; i++) {
            dotList.push([elementList[i].x, elementList[i].y, elementList[i].size]);
        }

        return dotList;
    }

    function clusterFood(foodList, blobSize) {
        var clusters = [];
        var addedCluster = false;

        //1: x
        //2: y
        //3: size or value
        //4: Angle, not set here.

        for (var i = 0; i < foodList.length; i++) {
            for (var j = 0; j < clusters.length; j++) {
                if (computeDistance(foodList[i][0], foodList[i][1], clusters[j][0], clusters[j][1]) < blobSize * 1.5) {
                    clusters[j][0] = (foodList[i][0] + clusters[j][0]) / 2;
                    clusters[j][1] = (foodList[i][1] + clusters[j][1]) / 2;
                    clusters[j][2] += foodList[i][2];
                    addedCluster = true;
                    break;
                }
            }
            if (!addedCluster) {
                clusters.push([foodList[i][0], foodList[i][1], foodList[i][2], 0]);
            }
            addedCluster = false;
        }
        return clusters;
    }

    function getAngle(x1, y1, x2, y2) {
        //Handle vertical and horizontal lines.

        if (x1 == x2) {
            if (y1 < y2) {
                return 271;
                //return 89;
            } else {
                return 89;
            }
        }

        return (Math.round(Math.atan2(-(y1 - y2), -(x1 - x2))/Math.PI*180 + 180));
    }

    function slope(x1, y1, x2, y2) {
        var m = (y1 - y2) / (x1 - x2);

        return m;
    }

    function slopeFromAngle(degree) {
        if (degree == 270) {
            degree = 271;
        } else if (degree == 90) {
            degree = 91;
        }
        return Math.tan((degree - 180) / 180 * Math.PI);
    }

    //Given two points on a line, finds the slope of a perpendicular line crossing it.
    function inverseSlope(x1, y1, x2, y2) {
        var m = slope(x1, y1, x2, y2);
        return (-1) / m;
    }

    //Given a slope and an offset, returns two points on that line.
    function pointsOnLine(slope, useX, useY, distance) {
        var b = useY - slope * useX;
        var r = Math.sqrt(1 + slope * slope);

        var newX1 = (useX + (distance / r));
        var newY1 = (useY + ((distance * slope) / r));
        var newX2 = (useX + ((-distance) / r));
        var newY2 = (useY + (((-distance) * slope) / r));

        return [[newX1, newY1], [newX2, newY2]];
    }

    function followAngle(angle, useX, useY, distance) {
        var slope = slopeFromAngle(angle);
        var coords = pointsOnLine(slope, useX, useY, distance);

        var side = (angle - 90).mod(360);
        if (side < 180) {
            return coords[1];
        } else {
            return coords[0];
        }
    }

    //Using a line formed from point a to b, tells if point c is on S side of that line.
    function isSideLine(a, b, c) {
        if ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 0) {
            return true;
        }
        return false;
    }

    //angle range2 is within angle range2
    //an Angle is a point and a distance between an other point [5, 40]
    function angleRangeIsWithin(range1, range2) {
        if (range2[0] == (range2[0] + range2[1]).mod(360)) {
            return true;
        }
        //console.log("r1: " + range1[0] + ", " + range1[1] + " ... r2: " + range2[0] + ", " + range2[1]);
        if (angleIsWithin(range1[0], range2) && angleIsWithin((range1[0] + range1[1]).mod(360), range2)) {
            return true;
        }
        return false;
    }

    function angleIsWithin(angle, range) {
        var diff = (rangeToAngle(range) - angle).mod(360);
        if (diff >= 0 && diff <= range[1]) {
            return true;
        }
        return false;
    }

    function rangeToAngle(range) {
        return (range[0] + range[1]).mod(360);
    }

    function anglePair(range) {
        return (range[0] + ", " + rangeToAngle(range) + " range: " + range[1]);
    }

    function computeAngleRanges(blob1, blob2) {
        var mainAngle = getAngle(blob1.x, blob1.y, blob2.x, blob2.y);
        var leftAngle = (mainAngle - 90).mod(360);
        var rightAngle = (mainAngle + 90).mod(360);

        var blob1Left = followAngle(leftAngle, blob1.x, blob1.y, blob1.size);
        var blob1Right = followAngle(rightAngle, blob1.x, blob1.y, blob1.size);

        var blob2Left = followAngle(rightAngle, blob2.x, blob2.y, blob2.size);
        var blob2Right = followAngle(leftAngle, blob2.x, blob2.y, blob2.size);

        var blob1AngleLeft = getAngle(blob2.x, blob2.y, blob1Left[0], blob1Left[1]);
        var blob1AngleRight = getAngle(blob2.x, blob2.y, blob1Right[0], blob1Right[1]);

        var blob2AngleLeft = getAngle(blob1.x, blob1.y, blob2Left[0], blob2Left[1]);
        var blob2AngleRight = getAngle(blob1.x, blob1.y, blob2Right[0], blob2Right[1]);

        var blob1Range = (blob1AngleRight - blob1AngleLeft).mod(360);
        var blob2Range = (blob2AngleRight - blob2AngleLeft).mod(360);

        var tempLine = followAngle(blob2AngleLeft, blob2Left[0], blob2Left[1], 400);
        //drawLine(blob2Left[0], blob2Left[1], tempLine[0], tempLine[1], 0);

        if ((blob1Range / blob2Range) > 1) {
            drawPoint(blob1Left[0], blob1Left[1], 3, "");
            drawPoint(blob1Right[0], blob1Right[1], 3, "");
            drawPoint(blob1.x, blob1.y, 3, "" + blob1Range + ", " + blob2Range + " R: " + (Math.round((blob1Range / blob2Range) * 1000) / 1000));
        }

        //drawPoint(blob2.x, blob2.y, 3, "" + blob1Range);
    }

    function getEdgeLinesFromPoint(blob1, blob2) {
        // find tangents
        // 
        // TODO: DON'T FORGET TO HANDLE IF BLOB1'S CENTER POINT IS INSIDE BLOB2!!!
        var px = blob1.x;
        var py = blob1.y;

        var cx = blob2.x;
        var cy = blob2.y;

        var radius = blob2.size;

        var shouldInvert = false;

        if (computeDistance(px, py, cx, cy) <= radius) {
            radius = computeDistance(px, py, cx, cy) - 5;
            shouldInvert = true;
        }

        var dx = cx - px;
        var dy = cy - py;
        var dd = Math.sqrt(dx * dx + dy * dy);
        var a = Math.asin(radius / dd);
        var b = Math.atan2(dy, dx);
        
        var t = b - a
        var ta = { x:radius * Math.sin(t), y:radius * -Math.cos(t) };
        
        t = b + a
        var tb = { x:radius * -Math.sin(t), y:radius * Math.cos(t) };

        var angleLeft = getAngle(cx + ta.x, cy + ta.y, px, py);
        var angleRight = getAngle(cx + tb.x, cy + tb.y, px, py);
        var angleDistance = (angleRight - angleLeft).mod(360);

        return [angleLeft, angleDistance, [cx + tb.x, cy + tb.y], [cx + ta.x, cy + ta.y]];
    }

    function findDestination() {
        var player = getPlayer();

        if (/*!toggle*/ 1) {
          var useMouseX = (getMouseX() - getWidth()/2 + getX()*getRatio()) / getRatio();
          var useMouseY = (getMouseY() - getHeight()/2 + getY()*getRatio()) / getRatio();
          tempPoint = [useMouseX, useMouseY, 1];

          var tempMoveX = getPointX();
          var tempMoveY = getPointY();


          if (player.length > 0) {
              //drawPoint(player[0].x, player[0].y - player[0].size, 3, "" + Math.floor(player[0].x) + ", " + Math.floor(player[0].y));

              //var allDots = processEverything(interNodes);

              var allPossibleFood = null;
              allPossibleFood = getAllFood(); // #1

              var allPossibleThreats = getAllThreats();
              //console.log("Internodes: " + interNodes.length + " Food: " + allPossibleFood.length + " Threats: " + allPossibleThreats.length);

              var badAngles = [];

              var isSafeSpot = true;
              var isMouseSafe = true;

              var clusterAllFood = clusterFood(allPossibleFood, player[0].oSize);

              for (var i = 0; i < allPossibleThreats.length; i++) {
                  var offsetX = player[0].x;
                  var offsetY = player[0].y;

                  var enemyAngleStuff = getEdgeLinesFromPoint(player[0], allPossibleThreats[i]);

                  var leftAngle = enemyAngleStuff[0];
                  var rightAngle = rangeToAngle(enemyAngleStuff);
                  var difference = enemyAngleStuff[1];

                  drawPoint(enemyAngleStuff[2][0], enemyAngleStuff[2][1], 3, "");
                  drawPoint(enemyAngleStuff[3][0], enemyAngleStuff[3][1], 3, "");

                  badAngles.push([leftAngle, difference]);

                  //console.log("Adding badAngles: " + leftAngle + ", " + rightAngle + " diff: " + difference);

                  var lineLeft = followAngle(leftAngle, player[0].x, player[0].y, 400);
                  var lineRight = followAngle(rightAngle, player[0].x, player[0].y, 400);
                  if (getCells().hasOwnProperty(allPossibleThreats[i].id)) {
                      drawLine(player[0].x, player[0].y, lineLeft[0], lineLeft[1], 0);
                      drawLine(player[0].x, player[0].y, lineRight[0], lineRight[1], 0);
                  } else {
                      drawLine(player[0].x, player[0].y, lineLeft[0], lineLeft[1], 3);
                      drawLine(player[0].x, player[0].y, lineRight[0], lineRight[1], 3);
                  }
                  //drawPoint(lineLeft[0], lineLeft[1], 0, "Left 0 - " + i);
                  //drawPoint(lineRight[0], lineRight[1], 0, "Right 1 - " + i);
              }

              var goodAngles = [];
              //TODO: Add wall angles here. Hardcoding temporary values.
              if (player[0].x < 1000 && badAngles.length > 0) {
                  //LEFT
                  console.log("Left");
                  var wallI = 1;
                  if (!interNodes.hasOwnProperty(wallI)) {
                      var newX = -100 - screenDistance();

                      var n = new ya(wallI, newX, player[0].y, player[0].size * 10, "#000", false, "Left Wall");
                      delete getCells()[wallI];
                      getCellsArray().pop();

                      interNodes[wallI] = n;
                      interNodes[wallI].nx = newX;
                      interNodes[wallI].ny = player[0].ny;
                      interNodes[wallI].nSize = player[0].oSize * 10;
                      interNodes[wallI].updateTime = G;
                      //console.log("Added corner enemy");
                  } else {
                      //console.log("Update Wall!");
                      interNodes[wallI].updateTime = G;
                      interNodes[wallI].y = player[0].y; 
                      interNodes[wallI].ny = player[0].ny;
                  }
              }
              if (player[0].y < 1000 && badAngles.length > 0) {
                  //TOP
                  console.log("TOP");
                  var wallI = 2;
                  if (!interNodes.hasOwnProperty(wallI)) {
                      var newY = -100 - screenDistance();
                      var n = new ya(wallI, player[0].x, newY, player[0].size * 10, "#000", false, "Top Wall");
                      delete getCells()[wallI];
                      getCellsArray().pop();

                      interNodes[wallI] = n;
                      interNodes[wallI].nx = player[0].nx;
                      interNodes[wallI].ny = newY;
                      interNodes[wallI].nSize = player[0].oSize * 10;
                      interNodes[wallI].updateTime = G;
                      //console.log("Added corner enemy");
                  } else {
                      //console.log("Update Wall!");
                      interNodes[wallI].updateTime = G;
                      interNodes[wallI].x = player[0].x; 
                      interNodes[wallI].nx = player[0].nx;
                  }
              }
              if (player[0].x > 11180 - 1000 && badAngles.length > 0) {
                  //RIGHT
                  console.log("RIGHT");
                  var wallI = 3;
                  if (!interNodes.hasOwnProperty(wallI)) {
                      var newX = 11180 + 100 + screenDistance();
                      var n = new ya(wallI, newX, player[0].y, player[0].size * 10, "#000", false, "Right Wall");
                      delete getCells()[wallI];
                      getCellsArray().pop();

                      interNodes[wallI] = n;
                      interNodes[wallI].nx = newX;
                      interNodes[wallI].ny = player[0].ny;
                      interNodes[wallI].nSize = player[0].oSize * 10;
                      interNodes[wallI].updateTime = G;
                      //console.log("Added corner enemy");
                  } else {
                      //console.log("Update Wall!");
                      interNodes[wallI].updateTime = G;
                      interNodes[wallI].y = player[0].y; 
                      interNodes[wallI].ny = player[0].ny;
                  }
              }
              if (player[0].y > 11180 - 1000 && badAngles.length > 0) {
                  //BOTTOM
                  console.log("BOTTOM");
                  var wallI = 4;
                  if (!interNodes.hasOwnProperty(wallI)) {
                      var newY = 11180 + 100 + screenDistance();
                      var n = new ya(wallI, player[0].x, newY, player[0].size * 10, "#000", false, "Bottom Wall");
                      delete getCells()[wallI];
                      getCellsArray().pop();

                      interNodes[wallI] = n;
                      interNodes[wallI].nx = player[0].nx;
                      interNodes[wallI].ny = newY;
                      interNodes[wallI].nSize = player[0].oSize * 10;
                      interNodes[wallI].updateTime = G;
                      //console.log("Added corner enemy");
                  } else {
                      //console.log("Update Wall!");
                      interNodes[wallI].updateTime = G;
                      interNodes[wallI].x = player[0].x; 
                      interNodes[wallI].nx = player[0].nx;
                  }
              }

              //console.log("1) Good Angles: " + goodAngles.length + " Bad Angles: " + badAngles.length);
              //TODO: Step 1: Write code to substract angle ranges.
              console.log("---");
              for (var i = 0; i < badAngles.length; i++) {
                  var tempGoodAnglesLength = goodAngles.length;

                  if (tempGoodAnglesLength == 0) {
                      angle1 = rangeToAngle(badAngles[i]);
                      angle2 = (badAngles[i][0] - angle1).mod(360);
                      goodAngles.push([angle1, angle2]);
                      console.log("Add: " + anglePair(goodAngles[0]));
                      continue;
                  }
                  var removeIndex = [];
                  for (var j = 0; j < tempGoodAnglesLength; j++) {

                      if (goodAngles[j][1] == 0) {
                          removeIndex.push(j);
                          console.log("Removed " + anglePair(goodAngles[j]));
                          break;
                      }

                      if (angleRangeIsWithin(goodAngles[j], badAngles[i])) {
                          console.log("Removed " + anglePair(goodAngles[j]));
                          removeIndex.push(j);
                      } else if (angleRangeIsWithin(badAngles[i], goodAngles[j])) {
                          var diff1 = (badAngles[i][0] - goodAngles[j][0]).mod(360);
                          var newZero = rangeToAngle(badAngles[i]);
                          var diff2 = (newZero - goodAngles[j][0]).mod(360);

                          var newGoodAngle = [newZero, goodAngles[j][1] - diff2];

                          var oldGoodAngle = goodAngles[j];

                          goodAngles.push(newGoodAngle);
                          goodAngles[j][1] = diff1;

                          console.log("Modify: " + anglePair(oldGoodAngle) + " into: " + anglePair(goodAngles[j]));
                          if (goodAngles[j][1] == 0) {
                              removeIndex.push(j);
                              console.log("Removed " + anglePair(goodAngles[j]));
                          }

                          console.log("Add: " + anglePair(newGoodAngle));

                          break;
                      } else if (angleIsWithin(badAngles[i][0], goodAngles[j])) {
                          var oldGoodAngle = goodAngles[j];
                          var diff = (badAngles[i][0] - goodAngles[j][0]).mod(360);
                          goodAngles[j][1] = diff;
                          console.log("Modify: " + anglePair(oldGoodAngle) + " into: " + anglePair(goodAngles[j]));
                      } else if (angleIsWithin(rangeToAngle(badAngles[i]), goodAngles[j])) {
                          var oldGoodAngle = goodAngles[j];
                          var oldY = rangeToAngle(goodAngles[j]);
                          goodAngles[j][0] = rangeToAngle(badAngles[i]);
                          var diff = (oldY - goodAngles[j][0]).mod(360);
                          goodAngles[j][1] = diff;
                          console.log("Modify: " + anglePair(oldGoodAngle) + " into: " + anglePair(goodAngles[j]));
                      }
                  }
                  if (removeIndex.length > 0) {
                      //console.log("I KNEW IT!!! THIS NEEDED TO BE HANDLED");
                      for (var j = 0; j < removeIndex.length; j++) {
                          goodAngles.splice(removeIndex[j], 1);
                      }
                  }
              }
              //console.log("2) Good Angles: " + goodAngles.length);

              for (var i = 0; i < goodAngles.length; i++) {
                  if (goodAngles[i][0] != goodAngles[i][1].mod(360)) {
                      var line1 = followAngle(goodAngles[i][0], player[0].x, player[0].y, 200 + i * 20);
                      var line2 = followAngle((goodAngles[i][0] + goodAngles[i][1]).mod(360), player[0].x, player[0].y, 200 + i * 20);
                      drawLine(player[0].x, player[0].y, line1[0], line1[1], 2);
                      drawLine(player[0].x, player[0].y, line2[0], line2[1], 2);
                      
                      drawArc(line1[0], line1[1], line2[0], line2[1], player[0].x, player[0].y, 200 + i * 20, 1);

                      drawPoint(line1[0], line1[1], 0, "" + i + ": 0");
                      drawPoint(line2[0], line2[1], 0, "" + i + ": 1");
                  }
              }

              if (goodAngles.length > 0) {
                  var bIndex = goodAngles[0];
                  var biggest = goodAngles[0][1];
                  for (var i = 1; i < goodAngles.length; i++) {
                      var size = goodAngles[i][1];
                      if (size > biggest) {
                          biggest = size;
                          bIndex = goodAngles[i];
                      }
                  }
                  var perfectAngle = (bIndex[0] + bIndex[1] / 2).mod(360);
                  //console.log("perfectAngle " + perfectAngle);
                  var line1 = followAngle(perfectAngle, player[0].x, player[0].y, 300);

                  var stuffToEat = false;

                  for (var i = 0; i < clusterAllFood.length; i++) {
                      //console.log("Before: " + clusterAllFood[i][2]);
                      //This is the cost function. Higher is better.
                      
                      var clusterAngle = getAngle(clusterAllFood[i][0], clusterAllFood[i][1], player[0].x, player[0].y);

                      var angleValue = valueAngleBased(clusterAngle, bIndex);

                      if (angleValue > 0) {
                          clusterAllFood[i][2] = clusterAllFood[i][2] * 6 + angleValue  - computeDistance(clusterAllFood[i][0], clusterAllFood[i][1], player[0].x, player[0].y);
                          stuffToEat = true;
                          clusterAllFood[i][3] = true;
                      } else {
                          clusterAllFood[i][2] = -1;
                          clusterAllFood[i][3] = false;
                      }


                      if (!toggle && angleValue > 0) {

                          drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 1, "");
                          //drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 1, "" + clusterAllFood[i][2]);
                      } else if (!toggle) {
                          drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 0, "");
                      }
                      //console.log("After: " + clusterAllFood[i][2]);
                  }

                  var bestFoodI = null;
                  if (stuffToEat) {
                      bestFoodI = clusterAllFood[0];
                      var bestFood = clusterAllFood[0][2];
                      for (var i = 1; i < clusterAllFood.length; i++) {
                          if (bestFood < clusterAllFood[i][2] && clusterAllFood[i][3]) {
                              bestFood = clusterAllFood[i][2];
                              bestFoodI = clusterAllFood[i];
                          }
                      }
                  }

                  //console.log("Best Value: " + clusterAllFood[bestFoodI][2]);
                  if (stuffToEat && bestFoodI[3]) {
                      tempMoveX = bestFoodI[0];
                      tempMoveY = bestFoodI[1];
                      drawLine(player[0].x, player[0].y, bestFoodI[0], bestFoodI[1], 1);
                  } else {
                      drawLine(player[0].x, player[0].y, line1[0], line1[1], 7);
                      tempMoveX = line1[0];
                      tempMoveY = line1[1];
                  }
                  
                  //drawLine(player[0].x, player[0].y, tempMoveX, tempMoveY, 1);
              } else {
                 for (var i = 0; i < clusterAllFood.length; i++) {
                      //console.log("mefore: " + clusterAllFood[i][2]);
                      //This is the cost function. Higher is better.
                      
                      var clusterAngle = getAngle(clusterAllFood[i][0], clusterAllFood[i][1], player[0].x, player[0].y);

                      clusterAllFood[i][2] = clusterAllFood[i][2] * 6 - computeDistance(clusterAllFood[i][0], clusterAllFood[i][1], player[0].x, player[0].y);
                      //console.log("Current Value: " + clusterAllFood[i][2]);

                      //(goodAngles[bIndex][1] / 2 - (Math.abs(perfectAngle - clusterAngle)));

                      clusterAllFood[i][3] = clusterAngle;

                      if (!toggle) {

                          drawPoint(clusterAllFood[i][0], clusterAllFood[i][1], 1, "");
                      }
                      //console.log("After: " + clusterAllFood[i][2]);
                  }

                  var bestFoodI = 0;
                  var bestFood = clusterAllFood[0][2];
                  for (var i = 1; i < clusterAllFood.length; i++) {
                      if (bestFood < clusterAllFood[i][2]) {
                          bestFood = clusterAllFood[i][2];
                          bestFoodI = i;
                      }
                  }

                  //console.log("Best Value: " + clusterAllFood[bestFoodI][2]);

                  tempMoveX = clusterAllFood[bestFoodI][0];
                  tempMoveY = clusterAllFood[bestFoodI][1];
                  drawLine(player[0].x, player[0].y, tempMoveX, tempMoveY, 1);
              }

              drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "");
              //drawPoint(tempPoint[0], tempPoint[1], tempPoint[2], "" + Math.floor(computeDistance(tempPoint[0], tempPoint[1], I, J)));
              //drawLine(tempPoint[0], tempPoint[1], player[0].x, player[0].y, 6);
              //console.log("Slope: " + slope(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Angle: " + getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) + " Side: " + (getAngle(tempPoint[0], tempPoint[1], player[0].x, player[0].y) - 90).mod(360));
              tempPoint[2] = 1;
          }
          if (!toggle) {
              setPoint(tempMoveX, tempMoveY);
          }
        }
    }

    function screenToGameX(x) {
        return (x - getWidth() / 2) / getRatio() + getX();
    }

    function screenToGameY(y) {
        return (y - getHeight() / 2) / getRatio() + getY();;
    }

    function gameToScreenX (x) {
        return ((x - getOffsetX()) * getRatio()) + getWidth()/2;
    }
    function gameToScreenY (y) {
        return ((y - getOffsetY()) * getRatio()) + getHeight()/2;
    }

    function drawPoint(x_1, y_1, drawColor, text) {
        if (!toggleDraw) {
            var x1 = gameToScreenX(x_1);
            var y1 = gameToScreenY(y_1);
            dPoints.push([x1, y1, drawColor]);
            dText.push(text);
        }
    }

    function drawArc(x_1, y_1, x_2, y_2, x_3, y_3, radius, drawColor) {
        if (!toggleDraw) {
            var x1 = gameToScreenX(x_1);
            var y1 = gameToScreenY(y_1);
            var x2 = gameToScreenX(x_2);
            var y2 = gameToScreenY(y_2);
            var x3 = gameToScreenX(x_3);
            var y3 = gameToScreenY(y_3);
            dArc.push([x1, y1, x2, y2, x3, y3, radius, drawColor]);
        }
    }

    function drawLine(x_1, y_1, x_2, y_2, drawColor) {
        if (!toggleDraw) {
            var x1 = gameToScreenX(x_1);
            var y1 = gameToScreenY(y_1);
            var x2 = gameToScreenX(x_2);
            var y2 = gameToScreenY(y_2);
            lines.push([x1, y1, x2, y2, drawColor]);
        }
    }

  function I() {
    dPoints = [];
    dArc = [];
    dText = [];
    lines = [];

    findDestination();

    if (ja()) {
      var a = Q - q / 2,
      b = R - r / 2;
      64 > a * a + b * b || za == U && Aa == V || (za = U, Aa = V, a = new ArrayBuffer(21), b = new DataView(a), b.setUint8(0, 16), b.setFloat64(1, U, !0), b.setFloat64(9, V, !0), b.setUint32(17, 0, !0), m.send(a))
    }
  }
  function wa() {
    if (ja() && null != C) {
      var a = new ArrayBuffer(1 + 2 * C.length),
      b = new DataView(a);
      b.setUint8(0, 0);
      for (var c = 0; c < C.length; ++c) b.setUint16(1 + 2 * c, C.charCodeAt(c), !0);
      m.send(a)
    }
  }
  function ja() {
    return null != m && m.readyState == m.OPEN
  }
  function B(a) {
    if (ja()) {
      var b = new ArrayBuffer(1);
      (new DataView(b)).setUint8(0, a);
      m.send(b)
    }
  }
  function ra() {
    ha();
    f.requestAnimationFrame(ra)
  }
  function qa() {
    q = f.innerWidth;
    r = f.innerHeight;
    fa.width = A.width = q;
    fa.height = A.height = r;
    ha()
  }
  function Ka() {
    if (0 != l.length) {
      for (var a = 0, b = 0; b < l.length; b++) a += l[b].size;
      a = Math.pow(Math.min(64 / a, 1), 0.4) * Math.max(r / 1080, q / 1920);
      h = (9 * h + a) / 10
    }
  }
  function ha() {
    var a = + new Date;
    ++La;
    G = + new Date;
    if (0 < l.length) {
      Ka();
      for (var b = 0, c = 0, d = 0; d < l.length; d++) l[d].updatePos(),
      b += l[d].x / l.length,
      c += l[d].y / l.length;
      L = b;
      M = c;
      N = h;
      s = (s + b) / 2;
      t = (t + c) / 2
    } else s = (29 * s + L) / 30,
    t = (29 * t + M) / 30,
    h = (9 * h + N) / 10;
    Fa();
    ga();
    e.clearRect(0, 0, q, r);
    e.fillStyle = ka ? '#111111' : '#F2FBFF';
    e.fillRect(0, 0, q, r);
    e.save();
    e.strokeStyle = ka ? '#AAAAAA' : '#000000';
    e.globalAlpha = 0.2;
    e.scale(h, h);
    b = q / h;
    c = r / h;
    for (d = - 0.5 + ( - s + b / 2) % 50; d < b; d += 50) e.beginPath(),
    e.moveTo(d, 0),
    e.lineTo(d, c),
    e.stroke();
    for (d = - 0.5 + ( - t + c / 2) % 50; d < c; d += 50) e.beginPath(),
    e.moveTo(0, d),
    e.lineTo(b, d),
    e.stroke();
    e.restore();
    n.sort(function (a, b) {
      return a.size == b.size ? a.id - b.id : a.size - b.size
    });
    e.save();
    e.translate(q /
    2, r / 2);
    e.scale(h, h);
    e.translate( - s, - t);
    for (d = 0; d < E.length; d++) E[d].draw();
    for (d = 0; d < n.length; d++) n[d].draw();
    e.restore();
    v && v.width && e.drawImage(v, q - v.width - 10, 10);
    F = Math.max(F, Ma());
    sessionScore = Math.max(sessionScore, F); 
    0 != F && (null == ba && (ba = new ca(24, '#FFFFFF')), ba.setValue('Score: ' + ~~(F / 100) + ' || Best Score: ' + ~~(sessionScore / 100) + " || Best time alive: " + bestTime + " seconds"), c = ba.render(), b = c.width, e.globalAlpha = 0.2, e.fillStyle = '#000000', e.fillRect(10, r - 10 - 24 - 10, b + 10, 34), e.globalAlpha = 1, e.drawImage(c, 15, r - 10 - 24 - 5));
    Na();
    a = + new Date - a;
    a > 1000 / 60 ? x -= 0.01 : a < 1000 / 65 && (x += 0.01);
    0.4 > x && (x = 0.4);
    1 < x && (x = 1)

    customRender(e);
  }

  function customRender(d) {
    for(var i = 0; i < lines.length; i++) {
        d.beginPath();

        d.lineWidth = 5;

        if (lines[i][4] == 0) {
            d.strokeStyle = "#FF0000";
        } else if (lines[i][4] == 1) {
            d.strokeStyle = "#00FF00";
        } else if (lines[i][4] == 2) {
            d.strokeStyle = "#0000FF";
        } else if (lines[i][4] == 3) {
            d.strokeStyle = "#FF8000";
        } else if (lines[i][4] == 4) {
            d.strokeStyle = "#8A2BE2";
        } else if (lines[i][4] == 5) {
            d.strokeStyle = "#FF69B4";
        } else if (lines[i][4] == 6) {
            d.strokeStyle = "#008080";
        } else if (lines[i][4] == 7) {
            d.strokeStyle = "#FFFFFF";
        } else {
            d.strokeStyle = "#000000";
        }

        d.moveTo(lines[i][0], lines[i][1]);
        d.lineTo(lines[i][2], lines[i][3]);

        d.stroke();
    }
    d.lineWidth = 1;

    for(var i = 0; i < dArc.length; i++) {
        if (dArc[i][7] == 0) {
            d.strokeStyle = "#FF0000";
        } else if (dArc[i][7] == 1) {
            d.strokeStyle = "#00FF00";
        } else if (dArc[i][7] == 2) {
            d.strokeStyle = "#0000FF";
        } else if (dArc[i][7] == 3) {
            d.strokeStyle = "#FF8000";
        } else if (dArc[i][7] == 4) {
            d.strokeStyle = "#8A2BE2";
        } else if (dArc[i][7] == 5) {
            d.strokeStyle = "#FF69B4";
        } else if (dArc[i][7] == 6) {
            d.strokeStyle = "#008080";
        } else if (dArc[i][7] == 7) {
            d.strokeStyle = "#FFFFFF";
        } else {
            d.strokeStyle = "#000000";
        }

        d.beginPath();

        d.lineWidth = 5;

        var ang1 = Math.atan2(dArc[i][1] - dArc[i][5], dArc[i][0] - dArc[i][4]);
        var ang2 = Math.atan2(dArc[i][3] - dArc[i][5], dArc[i][2] - dArc[i][4]);

        d.arc(dArc[i][4], dArc[i][5], dArc[i][6], ang1, ang2, false);

        d.stroke();
    }
    d.lineWidth = 1;

    for (var i = 0; i < dPoints.length; i++) {
        if (dText[i] == "") {
          var radius = 10;


          d.beginPath();
          d.arc(dPoints[i][0], dPoints[i][1], radius, 0, 2 * Math.PI, false);

          if (dPoints[i][2] == 0) {
              d.fillStyle = "black";
          } else if (dPoints[i][2] == 1) {
              d.fillStyle = "yellow";
          } else if (dPoints[i][2] == 2) {
              d.fillStyle = "blue";
          } else if (dPoints[i][2] == 3) {
              d.fillStyle = "red";
          } else if (dPoints[i][2] == 4) {
              d.fillStyle = "#008080";
          } else {
              d.fillStyle = "#000000";
          }

          d.fill();
          d.lineWidth = 2;
          d.strokeStyle = '#003300';
          d.stroke();
        } else {
            var text = new ca(18, (ea ? '#F2FBFF' : '#111111'));

            text.setValue(dText[i]);
            var textRender = text.render();
            d.drawImage(textRender, dPoints[i][0], dPoints[i][1]);
        }

    }
    d.lineWidth = 1;

    var currentDate = new Date();

    var nbSeconds = 0;
    if (getPlayer().length > 0) {
        nbSeconds = (currentDate.getSeconds() + (currentDate.getMinutes() * 60) + (currentDate.getHours() * 60 * 60)) - (lifeTimer.getSeconds() + (lifeTimer.getMinutes() * 60) + (lifeTimer.getHours() * 60 * 60));
    }

    bestTime = Math.max(nbSeconds, bestTime);

    var debugStrings = [];
    debugStrings.push("T - Bot: " + (!toggle ? "On" : "Off"));
    debugStrings.push("R - Lines: " + (!toggleDraw ? "On" : "Off"));
    debugStrings.push("Server: " + serverIP);
    debugStrings.push("Survived for: " + nbSeconds + " seconds");

    if (getPlayer().length > 0) {
        debugStrings.push("Location: " + Math.floor(getPlayer()[0].x) + ", " + Math.floor(getPlayer()[0].y));
    }

    var offsetValue = 20;
    var text = new ca(18, (getDarkBool() ? '#F2FBFF' : '#111111'));

    for (var i = 0; i < debugStrings.length; i++) {
      text.setValue(debugStrings[i]);
      var textRender = text.render();
      d.drawImage(textRender, 20, offsetValue);
      offsetValue += textRender.height;
    }
  }

  function Na() {
    if (oa && la.width) {
      var a = q / 5;
      e.drawImage(la, 5, 5, a, a)
    }
  }
  function Ma() {
    for (var a = 0, b = 0; b < l.length; b++) a += l[b].nSize * l[b].nSize;
    return a
  }
  function xa() {
    v = null;
    if (null != w || 0 != z.length) if (null != w || da) {
      v = document.createElement('canvas');
      var a = v.getContext('2d'),
      b = 60,
      b = null == w ? b + 24 * z.length : b + 180,
      c = Math.min(200, 0.3 * q) / 200;
      v.width = 200 * c;
      v.height = b * c;
      a.scale(c, c);
      a.globalAlpha = 0.4;
      a.fillStyle = '#000000';
      a.fillRect(0, 0, 200, b);
      a.globalAlpha = 1;
      a.fillStyle = '#FFFFFF';
      c = null;
      c = 'Leaderboard';
      a.font = '30px Ubuntu';
      a.fillText(c, 100 - a.measureText(c).width /
      2, 40);
      if (null == w) for (a.font = '20px Ubuntu', b = 0; b < z.length; ++b) c = z[b].name || 'An unnamed cell',
      da || (c = 'An unnamed cell'),
      - 1 != D.indexOf(z[b].id) ? (l[0].name && (c = l[0].name), a.fillStyle = '#FFAAAA')  : a.fillStyle = '#FFFFFF',
      c = b + 1 + '. ' + c,
      a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
       else for (b = c = 0; b < w.length; ++b) angEnd = c + w[b] * Math.PI * 2,
      a.fillStyle = Oa[b + 1],
      a.beginPath(),
      a.moveTo(100, 140),
      a.arc(100, 140, 80, c, angEnd, !1),
      a.fill(),
      c = angEnd
    }
  }
  function ya(a, b, c, d, e, f) {
    n.push(this);
    y[a] = this;
    this.id = a;
    this.ox = this.x = b;
    this.oy = this.y = c;
    this.oSize = this.size = d;
    this.color = e;
    this.points = [
    ];
    this.pointsAcc = [
    ];
    this.createPoints();
    this.setName(f)
  }
  function ca(a, b, c, d) {
    a && (this._size = a);
    b && (this._color = b);
    this._stroke = !!c;
    d && (this._strokeColor = d)
  }
  if ('agar.io' != f.location.hostname && 'localhost' != f.location.hostname && '10.10.2.13' != f.location.hostname) f.location = 'http://agar.io/';
   else if (f.top != f) f.top.location = 'http://agar.io/';
   else {
    var fa,
    toggle = false,
    toggleDraw = false,
    splitted = false,
    splitting = false,
    virusBait = false,
    tempPoint = [0, 0, 1],
    dPoints = [],
    dArc = [],
    dText = [],
    lines = [],
    originalName,
    sessionScore = 0,
    serverIP = "",
    interNodes = [],
    lifeTimer = new Date(),
    bestTime = 0,
    e,
    A,
    q,
    r,
    J = null,
    m = null,
    s = 0,
    t = 0,
    D = [
    ],
    l = [
    ],
    y = {
    },
    n = [
    ],
    E = [
    ],
    z = [
    ],
    Q = 0,
    R = 0,
    U = - 1,
    V = - 1,
    La = 0,
    G = 0,
    C = null,
    Y = 0,
    Z = 0,
    $ = 10000,
    aa = 10000,
    h = 1,
    u = null,
    Ba = !0,
    da = !0,
    ma = !1,
    ia = !1,
    F = 0,
    ka = !1,
    Ca = !1,
    L = s = ~~((Y + $) / 2),
    M = t = ~~((Z + aa) / 2),
    N = 1,
    K = '',
    w = null,
    ea = !1,
    O = 0,
    Oa = [
      '#333333',
      '#FF3333',
      '#33FF33',
      '#3333FF'
    ],
    oa = 'ontouchstart' in f && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    la = new Image;
    la.src = 'img/split.png';
    O = document.createElement('canvas');
    if ('undefined' == typeof console || 'undefined' == typeof DataView || 'undefined' == typeof WebSocket || null == O || null == O.getContext || null == f.localStorage) alert('You browser does not support this game, we recommend you to use Firefox to play this');
     else {
      var W = null;
      f.setNick = function (a) {
        lifeTimer = new Date();
        originalName = a;
        ta();
        C = a;
        wa();
        F = 0
      };
      f.setRegion = S;
      f.setSkins = function (a) {
        Ba = a
      };
      f.setNames = function (a) {
        da = a
      };
      f.setDarkTheme = function (a) {
        ka = a
      };
      f.setColors = function (a) {
        ma = a
      };
      f.setShowMass = function (a) {
        Ca = a
      };
      f.spectate = function () {
        C = null;
        B(1);
        ta()
      };
      f.setGameMode = function (a) {
        a != K && (K = a, T())
      };
      null != f.localStorage && (null == f.localStorage.AB8 && (f.localStorage.AB8 = 0 + ~~(100 * Math.random())), O = + f.localStorage.AB8, f.ABGroup = O);
      g.get('http://gc.agar.io', function (a) {
        var b = a.split(' ');
        a = b[0];
        b = b[1] || '';
        - 1 == 'DE IL PL HU BR AT'.split(' ').indexOf(a) && Da.push('nazi');
        P.hasOwnProperty(a) && ('string' == typeof P[a] ? u || S(P[a])  : P[a].hasOwnProperty(b) && (u || S(P[a][b])))
      }, 'text');
      setTimeout(function () {
      }, 300000);
      var P = {
        AF: 'JP-Tokyo',
        AX: 'EU-London',
        AL: 'EU-London',
        DZ: 'EU-London',
        AS: 'SG-Singapore',
        AD: 'EU-London',
        AO: 'EU-London',
        AI: 'US-Atlanta',
        AG: 'US-Atlanta',
        AR: 'BR-Brazil',
        AM: 'JP-Tokyo',
        AW: 'US-Atlanta',
        AU: 'SG-Singapore',
        AT: 'EU-London',
        AZ: 'JP-Tokyo',
        BS: 'US-Atlanta',
        BH: 'JP-Tokyo',
        BD: 'JP-Tokyo',
        BB: 'US-Atlanta',
        BY: 'EU-London',
        BE: 'EU-London',
        BZ: 'US-Atlanta',
        BJ: 'EU-London',
        BM: 'US-Atlanta',
        BT: 'JP-Tokyo',
        BO: 'BR-Brazil',
        BQ: 'US-Atlanta',
        BA: 'EU-London',
        BW: 'EU-London',
        BR: 'BR-Brazil',
        IO: 'JP-Tokyo',
        VG: 'US-Atlanta',
        BN: 'JP-Tokyo',
        BG: 'EU-London',
        BF: 'EU-London',
        BI: 'EU-London',
        KH: 'JP-Tokyo',
        CM: 'EU-London',
        CA: 'US-Atlanta',
        CV: 'EU-London',
        KY: 'US-Atlanta',
        CF: 'EU-London',
        TD: 'EU-London',
        CL: 'BR-Brazil',
        CN: 'CN-China',
        CX: 'JP-Tokyo',
        CC: 'JP-Tokyo',
        CO: 'BR-Brazil',
        KM: 'EU-London',
        CD: 'EU-London',
        CG: 'EU-London',
        CK: 'SG-Singapore',
        CR: 'US-Atlanta',
        CI: 'EU-London',
        HR: 'EU-London',
        CU: 'US-Atlanta',
        CW: 'US-Atlanta',
        CY: 'JP-Tokyo',
        CZ: 'EU-London',
        DK: 'EU-London',
        DJ: 'EU-London',
        DM: 'US-Atlanta',
        DO: 'US-Atlanta',
        EC: 'BR-Brazil',
        EG: 'EU-London',
        SV: 'US-Atlanta',
        GQ: 'EU-London',
        ER: 'EU-London',
        EE: 'EU-London',
        ET: 'EU-London',
        FO: 'EU-London',
        FK: 'BR-Brazil',
        FJ: 'SG-Singapore',
        FI: 'EU-London',
        FR: 'EU-London',
        GF: 'BR-Brazil',
        PF: 'SG-Singapore',
        GA: 'EU-London',
        GM: 'EU-London',
        GE: 'JP-Tokyo',
        DE: 'EU-London',
        GH: 'EU-London',
        GI: 'EU-London',
        GR: 'EU-London',
        GL: 'US-Atlanta',
        GD: 'US-Atlanta',
        GP: 'US-Atlanta',
        GU: 'SG-Singapore',
        GT: 'US-Atlanta',
        GG: 'EU-London',
        GN: 'EU-London',
        GW: 'EU-London',
        GY: 'BR-Brazil',
        HT: 'US-Atlanta',
        VA: 'EU-London',
        HN: 'US-Atlanta',
        HK: 'JP-Tokyo',
        HU: 'EU-London',
        IS: 'EU-London',
        IN: 'JP-Tokyo',
        ID: 'JP-Tokyo',
        IR: 'JP-Tokyo',
        IQ: 'JP-Tokyo',
        IE: 'EU-London',
        IM: 'EU-London',
        IL: 'JP-Tokyo',
        IT: 'EU-London',
        JM: 'US-Atlanta',
        JP: 'JP-Tokyo',
        JE: 'EU-London',
        JO: 'JP-Tokyo',
        KZ: 'JP-Tokyo',
        KE: 'EU-London',
        KI: 'SG-Singapore',
        KP: 'JP-Tokyo',
        KR: 'JP-Tokyo',
        KW: 'JP-Tokyo',
        KG: 'JP-Tokyo',
        LA: 'JP-Tokyo',
        LV: 'EU-London',
        LB: 'JP-Tokyo',
        LS: 'EU-London',
        LR: 'EU-London',
        LY: 'EU-London',
        LI: 'EU-London',
        LT: 'EU-London',
        LU: 'EU-London',
        MO: 'JP-Tokyo',
        MK: 'EU-London',
        MG: 'EU-London',
        MW: 'EU-London',
        MY: 'JP-Tokyo',
        MV: 'JP-Tokyo',
        ML: 'EU-London',
        MT: 'EU-London',
        MH: 'SG-Singapore',
        MQ: 'US-Atlanta',
        MR: 'EU-London',
        MU: 'EU-London',
        YT: 'EU-London',
        MX: 'US-Atlanta',
        FM: 'SG-Singapore',
        MD: 'EU-London',
        MC: 'EU-London',
        MN: 'JP-Tokyo',
        ME: 'EU-London',
        MS: 'US-Atlanta',
        MA: 'EU-London',
        MZ: 'EU-London',
        MM: 'JP-Tokyo',
        NA: 'EU-London',
        NR: 'SG-Singapore',
        NP: 'JP-Tokyo',
        NL: 'EU-London',
        NC: 'SG-Singapore',
        NZ: 'SG-Singapore',
        NI: 'US-Atlanta',
        NE: 'EU-London',
        NG: 'EU-London',
        NU: 'SG-Singapore',
        NF: 'SG-Singapore',
        MP: 'SG-Singapore',
        NO: 'EU-London',
        OM: 'JP-Tokyo',
        PK: 'JP-Tokyo',
        PW: 'SG-Singapore',
        PS: 'JP-Tokyo',
        PA: 'US-Atlanta',
        PG: 'SG-Singapore',
        PY: 'BR-Brazil',
        PE: 'BR-Brazil',
        PH: 'JP-Tokyo',
        PN: 'SG-Singapore',
        PL: 'EU-London',
        PT: 'EU-London',
        PR: 'US-Atlanta',
        QA: 'JP-Tokyo',
        RE: 'EU-London',
        RO: 'EU-London',
        RU: 'RU-Russia',
        RW: 'EU-London',
        BL: 'US-Atlanta',
        SH: 'EU-London',
        KN: 'US-Atlanta',
        LC: 'US-Atlanta',
        MF: 'US-Atlanta',
        PM: 'US-Atlanta',
        VC: 'US-Atlanta',
        WS: 'SG-Singapore',
        SM: 'EU-London',
        ST: 'EU-London',
        SA: 'EU-London',
        SN: 'EU-London',
        RS: 'EU-London',
        SC: 'EU-London',
        SL: 'EU-London',
        SG: 'JP-Tokyo',
        SX: 'US-Atlanta',
        SK: 'EU-London',
        SI: 'EU-London',
        SB: 'SG-Singapore',
        SO: 'EU-London',
        ZA: 'EU-London',
        SS: 'EU-London',
        ES: 'EU-London',
        LK: 'JP-Tokyo',
        SD: 'EU-London',
        SR: 'BR-Brazil',
        SJ: 'EU-London',
        SZ: 'EU-London',
        SE: 'EU-London',
        CH: 'EU-London',
        SY: 'EU-London',
        TW: 'JP-Tokyo',
        TJ: 'JP-Tokyo',
        TZ: 'EU-London',
        TH: 'JP-Tokyo',
        TL: 'JP-Tokyo',
        TG: 'EU-London',
        TK: 'SG-Singapore',
        TO: 'SG-Singapore',
        TT: 'US-Atlanta',
        TN: 'EU-London',
        TR: 'TK-Turkey',
        TM: 'JP-Tokyo',
        TC: 'US-Atlanta',
        TV: 'SG-Singapore',
        UG: 'EU-London',
        UA: 'EU-London',
        AE: 'EU-London',
        GB: 'EU-London',
        US: {
          AL: 'US-Atlanta',
          AK: 'US-Fremont',
          AZ: 'US-Fremont',
          AR: 'US-Atlanta',
          CA: 'US-Fremont',
          CO: 'US-Fremont',
          CT: 'US-Atlanta',
          DE: 'US-Atlanta',
          FL: 'US-Atlanta',
          GA: 'US-Atlanta',
          HI: 'US-Fremont',
          ID: 'US-Fremont',
          IL: 'US-Atlanta',
          IN: 'US-Atlanta',
          IA: 'US-Atlanta',
          KS: 'US-Atlanta',
          KY: 'US-Atlanta',
          LA: 'US-Atlanta',
          ME: 'US-Atlanta',
          MD: 'US-Atlanta',
          MA: 'US-Atlanta',
          MI: 'US-Atlanta',
          MN: 'US-Fremont',
          MS: 'US-Atlanta',
          MO: 'US-Atlanta',
          MT: 'US-Fremont',
          NE: 'US-Fremont',
          NV: 'US-Fremont',
          NH: 'US-Atlanta',
          NJ: 'US-Atlanta',
          NM: 'US-Fremont',
          NY: 'US-Atlanta',
          NC: 'US-Atlanta',
          ND: 'US-Fremont',
          OH: 'US-Atlanta',
          OK: 'US-Atlanta',
          OR: 'US-Fremont',
          PA: 'US-Atlanta',
          RI: 'US-Atlanta',
          SC: 'US-Atlanta',
          SD: 'US-Fremont',
          TN: 'US-Atlanta',
          TX: 'US-Atlanta',
          UT: 'US-Fremont',
          VT: 'US-Atlanta',
          VA: 'US-Atlanta',
          WA: 'US-Fremont',
          WV: 'US-Atlanta',
          WI: 'US-Atlanta',
          WY: 'US-Fremont',
          DC: 'US-Atlanta',
          AS: 'US-Atlanta',
          GU: 'US-Atlanta',
          MP: 'US-Atlanta',
          PR: 'US-Atlanta',
          UM: 'US-Atlanta',
          VI: 'US-Atlanta'
        },
        UM: 'SG-Singapore',
        VI: 'US-Atlanta',
        UY: 'BR-Brazil',
        UZ: 'JP-Tokyo',
        VU: 'SG-Singapore',
        VE: 'BR-Brazil',
        VN: 'JP-Tokyo',
        WF: 'SG-Singapore',
        EH: 'EU-London',
        YE: 'JP-Tokyo',
        ZM: 'EU-London',
        ZW: 'EU-London'
      };
      f.connect = va;

      f.getDarkBool = function() {
        return ka;
      }
      f.getMassBool = function() {
        return Ca;
      }

      f.getCellsArray = function() {
        return n;
      }

      f.getCells = function() {
        return y;
      }

      f.getPlayer = function() {
        return l;
      }

      f.getWidth = function() {
        return q;
      }

      f.getHeight = function() {
        return r;
      }

      f.getRatio = function() {
        return h;
      }

      f.getOffsetX = function() {
        return L;
      }

      f.getOffsetY = function() {
        return M;
      }

      f.getX = function() {
        return s;
      }

      f.getY = function() {
        return t;
      }

      f.getPointX = function() {
        return U;
      }

      f.getPointY = function() {
        return V;
      }

      f.getMouseX = function() {
        return Q;
      }

      f.getMouseY = function() {
        return R;
      }

      f.setPoint = function(x, y) {
        U = x;
        V = y;
      }

      f.setScore = function(a) {
        sessionScore = a * 100;
      }

      f.setBestTime = function(a) {
        bestTime = a;
      }

      f.best = function(a, b) {
        setScore(a);
        setBestTime(b);
      }

      var X = 500,
      za = - 1,
      Aa = - 1,
      v = null,
      x = 1,
      ba = null,
      H = {
      },
      Da = 'poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;ussr;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8'.split(';'),
      Pa = [
        '8',
        'nasa'
      ],
      Qa = [
        'm\'blob'
      ];
      ya.prototype = {
        id: 0,
        points: null,
        pointsAcc: null,
        name: null,
        nameCache: null,
        sizeCache: null,
        x: 0,
        y: 0,
        size: 0,
        ox: 0,
        oy: 0,
        oSize: 0,
        nx: 0,
        ny: 0,
        nSize: 0,
        updateTime: 0,
        updateCode: 0,
        drawTime: 0,
        destroyed: !1,
        isVirus: !1,
        isAgitated: !1,
        wasSimpleDrawing: !0,
        destroy: function () {
          var a;
          for (a = 0; a < n.length; a++) if (n[a] == this) {
            n.splice(a, 1);
            break
          }
          delete y[this.id];
          a = l.indexOf(this);
          - 1 != a && (ia = !0, l.splice(a, 1));
          a = D.indexOf(this.id);
          - 1 != a && D.splice(a, 1);
          this.destroyed = !0;
          E.push(this)
        },
        getNameSize: function () {
          return Math.max(~~(0.3 * this.size), 24)
        },
        setName: function (a) {
          if (this.name = a) null == this.nameCache ? this.nameCache = new ca(this.getNameSize(), '#FFFFFF', !0, '#000000')  : this.nameCache.setSize(this.getNameSize()),
          this.nameCache.setValue(this.name)
        },
        createPoints: function () {
          for (var a = this.getNumPoints(); this.points.length > a; ) {
            var b = ~~(Math.random() * this.points.length);
            this.points.splice(b, 1);
            this.pointsAcc.splice(b, 1)
          }
          0 == this.points.length && 0 < a && (this.points.push({
            c: this,
            v: this.size,
            x: this.x,
            y: this.y
          }), this.pointsAcc.push(Math.random() - 0.5));
          for (; this.points.length < a; ) {
            var b = ~~(Math.random() * this.points.length),
            c = this.points[b];
            this.points.splice(b, 0, {
              c: this,
              v: c.v,
              x: c.x,
              y: c.y
            });
            this.pointsAcc.splice(b, 0, this.pointsAcc[b])
          }
        },
        getNumPoints: function () {
          var a = 10;
          20 > this.size && (a = 5);
          this.isVirus && (a = 30);
          return ~~Math.max(this.size * h * (this.isVirus ? Math.min(2 * x, 1)  : x), a)
        },
        movePoints: function () {
          this.createPoints();
          for (var a = this.points, b = this.pointsAcc, c = a.length, d = 0; d < c; ++d) {
            var e = b[(d - 1 + c) % c],
            f = b[(d + 1) % c];
            b[d] += (Math.random() - 0.5) * (this.isAgitated ? 3 : 1);
            b[d] *= 0.7;
            10 < b[d] && (b[d] = 10);
            - 10 > b[d] && (b[d] = - 10);
            b[d] = (e + f + 8 * b[d]) / 10
          }
          for (var h = this, d = 0; d < c; ++d) {
            var g = a[d].v,
            e = a[(d - 1 + c) % c].v,
            f = a[(d + 1) % c].v;
            if (15 < this.size && null != J) {
              var l = !1,
              m = a[d].x,
              n = a[d].y;
              J.retrieve2(m - 5, n - 5, 10, 10, function (a) {
                a.c != h && 25 > (m - a.x) * (m - a.x) + (n - a.y) * (n - a.y) && (l = !0)
              });
              !l && (a[d].x < Y || a[d].y < Z || a[d].x > $ || a[d].y > aa) && (l = !0);
              l && (0 < b[d] && (b[d] = 0), b[d] -= 1)
            }
            g += b[d];
            0 > g && (g = 0);
            g = this.isAgitated ? (19 * g + this.size) / 20 : (12 * g + this.size) / 13;
            a[d].v = (e + f + 8 * g) / 10;
            e = 2 * Math.PI / c;
            f = this.points[d].v;
            this.isVirus && 0 == d % 2 && (f += 5);
            a[d].x = this.x + Math.cos(e * d) * f;
            a[d].y = this.y + Math.sin(e * d) * f
          }
        },
        updatePos: function () {
          var a;
          a = (G - this.updateTime) / 120;
          a = 0 > a ? 0 : 1 < a ? 1 : a;
          var b = 0 > a ? 0 : 1 < a ? 1 : a;
          this.getNameSize();
          if (this.destroyed && 1 <= b) {
            var c = E.indexOf(this);
            - 1 != c && E.splice(c, 1)
          }
          this.x = a * (this.nx - this.ox) + this.ox;
          this.y = a * (this.ny - this.oy) + this.oy;
          this.size = b * (this.nSize - this.oSize) + this.oSize;
          return b
        },
        shouldRender: function () {
          return this.x + this.size + 40 < s - q / 2 / h || this.y + this.size + 40 < t - r / 2 / h || this.x - this.size - 40 >
          s + q / 2 / h || this.y - this.size - 40 > t + r / 2 / h ? !1 : !0
        },
        draw: function () {
          if (this.shouldRender()) {
            var a = !this.isVirus && !this.isAgitated && 0.5 > h;
            if (this.wasSimpleDrawing && !a) for (var b = 0; b < this.points.length; b++) this.points[b].v = this.size;
            this.wasSimpleDrawing = a;
            e.save();
            this.drawTime = G;
            b = this.updatePos();
            this.destroyed && (e.globalAlpha *= 1 - b);
            e.lineWidth = 10;
            e.lineCap = 'round';
            e.lineJoin = this.isVirus ? 'mitter' : 'round';
            ma ? (e.fillStyle = '#FFFFFF', e.strokeStyle = '#AAAAAA')  : (e.fillStyle = this.color, e.strokeStyle = this.color);
            if (a) e.beginPath(),
            e.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1);
             else {
              this.movePoints();
              e.beginPath();
              var c = this.getNumPoints();
              e.moveTo(this.points[0].x, this.points[0].y);
              for (b = 1; b <= c; ++b) {
                var d = b % c;
                e.lineTo(this.points[d].x, this.points[d].y)
              }
            }
            e.closePath();
            c = this.name.toLowerCase();
            !this.isAgitated && Ba && '' == K ? - 1 != Da.indexOf(c) ? (H.hasOwnProperty(c) || (H[c] = new Image, H[c].src = 'skins/' + c + '.png'), b = 0 != H[c].width && H[c].complete ? H[c] : null)  : b = null : b = null;
            b = (d = b) ? - 1 != Qa.indexOf(c)  : !1;
            a || e.stroke();
            e.fill();
            null == d || b || (e.save(), e.clip(), e.drawImage(d, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), e.restore());
            (ma || 15 < this.size) && !a && (e.strokeStyle = '#000000', e.globalAlpha *= 0.1, e.stroke());
            e.globalAlpha = 1;
            null != d && b && e.drawImage(d, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
            b = - 1 != l.indexOf(this);
            a = ~~this.y;
            if ((da || b) && this.name && this.nameCache && (null == d || - 1 == Pa.indexOf(c))) {
              d = this.nameCache;
              d.setValue(this.name);
              d.setSize(this.getNameSize());
              c = Math.ceil(10 * h) / 10;
              d.setScale(c);
              var d = d.render(),
              f = ~~(d.width / c),
              g = ~~(d.height / c);
              e.drawImage(d, ~~this.x - ~~(f / 2), a - ~~(g / 2), f, g);
              a += d.height / 2 / c + 4
            }
            Ca && (b || 0 == l.length && (!this.isVirus || this.isAgitated) && 20 < this.size) && (null == this.sizeCache && (this.sizeCache = new ca(this.getNameSize() / 2, '#FFFFFF', !0, '#000000')), b = this.sizeCache, b.setSize(this.getNameSize() / 2), b.setValue(~~(this.size * this.size / 100)), c = Math.ceil(10 * h) / 10, b.setScale(c), d = b.render(), f = ~~(d.width / c), g = ~~(d.height / c), e.drawImage(d, ~~this.x - ~~(f / 2), a - ~~(g / 2), f, g));
            e.restore()
          }
        }
      };
      ca.prototype = {
        _value: '',
        _color: '#000000',
        _stroke: !1,
        _strokeColor: '#000000',
        _size: 16,
        _canvas: null,
        _ctx: null,
        _dirty: !1,
        _scale: 1,
        setSize: function (a) {
          this._size != a && (this._size = a, this._dirty = !0)
        },
        setScale: function (a) {
          this._scale != a && (this._scale = a, this._dirty = !0)
        },
        setColor: function (a) {
          this._color != a && (this._color = a, this._dirty = !0)
        },
        setStroke: function (a) {
          this._stroke != a && (this._stroke = a, this._dirty = !0)
        },
        setStrokeColor: function (a) {
          this._strokeColor != a && (this._strokeColor = a, this._dirty = !0)
        },
        setValue: function (a) {
          a != this._value && (this._value = a, this._dirty = !0)
        },
        render: function () {
          null == this._canvas && (this._canvas = document.createElement('canvas'), this._ctx = this._canvas.getContext('2d'));
          if (this._dirty) {
            this._dirty = !1;
            var a = this._canvas,
            b = this._ctx,
            c = this._value,
            d = this._scale,
            e = this._size,
            f = e + 'px Ubuntu';
            b.font = f;
            var g = b.measureText(c).width,
            h = ~~(0.2 * e);
            a.width = (g + 6) * d;
            a.height = (e + h) * d;
            b.font = f;
            b.scale(d, d);
            b.globalAlpha = 1;
            b.lineWidth = 3;
            b.strokeStyle = this._strokeColor;
            b.fillStyle = this._color;
            this._stroke && b.strokeText(c, 3, e - h / 2);
            b.fillText(c, 3, e - h / 2)
          }
          return this._canvas
        }
      };
      f.onload = Ea
    }
  }
}) (window, jQuery);