$(document).ready(function () {
  //ADD SPOT

  $("#add-spot").click(function () {
    if ($(".spot")) {
      var totle = $(".spot").length;
    } else {
      var totle = 0;
    }
    var spotsum = totle + 1;
    var locationA = 40 + totle * 20;
    var $element = '<div id="spot' + spotsum + '" class="spot" style="top: ' + locationA + 'px; left: ' + locationA + 'px"><img src="/images/spot(png).png" /><span>' + spotsum + '</span></div>';
    $("#cover").append($element);
    var spottotlesum = 1;
    $(".spot").each(function () {
      var spotname = "#spot" + spottotlesum;
      $(spotname).draggable({
        containment: "parent",
        tolerance: 'pointer'
      });
      spottotlesum = spottotlesum + 1;
    })

  })

  //ADD SPOT end

  // ADD SCOPE
  $("#add-scope").click(function () {
    if ($(".scope")) {
      var totle = $(".scope").length;
    } else {
      var totle = 0;
    }
    var scopesum = totle + 1;
    var locationA = 40 + totle * 20;
    var tooltip_content =
      '<div class="tooltip_content" >TEST TOOLTIP</div>';
    var $element = '<div id="scope' + scopesum + '" class="scope" style="top:' + locationA + 'px;left:' + locationA + 'px;" title="Tooltip"><span>' + scopesum + '</span></div>';
    $("#cover").append($element);

    var scopetotlesum = 1;
    $(".scope").each(function () {
      var scopename = "#scope" + scopetotlesum;
      $(scopename)
        .resizable({
          stop: function (e, ui) {
            // console.log(this);
            // startResizing(ui.position.left, ui.position.right);
          },
          containment: "parent",
          handles: "all",
        })
        .draggable({
          stop: function (event, ui) {
            // console.log(this);
          },
          containment: "parent",
        })
        .tooltip({
          track: true,
          content: tooltip_content,
        });
      scopetotlesum = scopetotlesum + 1;
    })
  });


  // ADD SCOPE END

  //ADD LINE
  $("#add-line").click(function () {
    if ($(".point-totle")) {
      var totle = $(".point-totle").length;
    } else {
      var totle = 0;
    }
    var pointsum = totle + 1;
    var pointname = "point" + pointsum;
    var linename = "line" + pointsum;
    var locationA = 40 + totle * 20;
    var locationB = 260 + totle * 20;
    var locationB2 = 120 + totle * 20;
    var $element =
      '<div class="' +
      pointname +
      ' point-totle" id="pointA" style="left: ' +
      locationA +
      "px; top: " +
      locationA +
      'px"></div><div class="' +
      pointname +
      '" id="pointB" style="left:' +
      locationB +
      "px; top: " +
      locationB2 +
      'px"><span>' + pointsum + '</span></div><div class="' +
      linename +
      '" id="line"></div>';
    //append it to the DOM
    $("#cover").append($element);
    var point_totle = 1;
    $(".point-totle").each(function () {
      // alert($(this).text());
      var point_each_name = ".point" + point_totle;
      $(point_each_name).draggable({
        drag: function (e, ui) {
          wrapper(pointname, linename);
        },
        containment: "parent",
      });
      var pointname = "point" + point_totle;
      var linename = "line" + point_totle;
      wrapper(pointname, linename);
      point_totle = point_totle + 1;
    });
  });
  //ADD LINE END


  function wrapper(pointname, linename) {
    const point1 = document.getElementsByClassName(pointname)[0];
    const point2 = document.getElementsByClassName(pointname)[1];
    const line = document.getElementsByClassName(linename)[0];
    var getline = getCoordinate(point1, point2, line);
    line.style.width = getline.width + "px";
    line.style.left = getline.left + "px";
    line.style.top = getline.top + "px";

    // ????????????????????????????????????
    line.style.transform = "rotate(" + getline.angleDeg + "deg)";
  }

  function getCoordinate(point1, point2, line) {
    // ??????AB??????TOP??????LEFT??????
    var p1 = {
      x: point1.offsetLeft,
      y: point1.offsetTop
    };
    var p2 = {
      x: point2.offsetLeft,
      y: point2.offsetTop
    };

    // ??????????????????
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    var length = Math.sqrt(a * a + b * b);

    // ?????????????????????????????????
    var angleDeg = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

    // ????????????????????????
    var pointWidth = point1.clientWidth / 2;
    var pointHeight = point1.clientWidth / 2;

    var array = [];
    array["width"] = length;
    array["left"] = p1.x + pointWidth;
    array["top"] = p1.y + pointHeight;
    array["angleDeg"] = angleDeg;
    return array;
    // ?????????????????????
    // ?????????????????????/???????????????????????????????????????????????????
    // line.style.width = length + "px";
    // line.style.left = p1.x + pointWidth + "px";
    // line.style.top = p1.y + pointHeight + "px";

    // ????????????????????????????????????
    // line.style.transform = "rotate(" + angleDeg + "deg)";
  }
});
