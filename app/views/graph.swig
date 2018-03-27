<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <title>homely Analytics</title>
  <link rel="stylesheet" href="/css/graph.css">
  <link rel="stylesheet" href="/css/common.css">
  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400|Pacifico' rel='stylesheet' type='text/css'>
  <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <!-- Compiled and minified CSS -->
  <script>
    String.prototype.replaceAll = function(str1, str2, ignore) {
      return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    var data = "{{data}}";
    var lastDayData = "{{lastDayData}}";
    var lastWeekData = "{{lastWeekData}}";
    var lastMonthData = "{{lastMonthData}}";
    var node = "{{nodeArray}}"

    var dataArray = JSON.parse(data.replaceAll("&quot;", "\""));
    var lastDayDataArray = JSON.parse(lastDayData.replaceAll("&quot;", "\""));
    var lastWeekDataArray = JSON.parse(lastWeekData.replaceAll("&quot;", "\""));
    var lastMonthDataArray = JSON.parse(lastMonthData.replaceAll("&quot;", "\""));
    var nodeArray = JSON.parse(node.replaceAll("&quot;", "\""));

  </script>
</head>

<body>
  <aside>
    <h1>home.ly</h1>
    <ul>
      <li class="active">
        <a href="#">
          <i class="fa fa-line-chart"></i>Graph Analytics</a>
      </li>
      <li class="">
        <a href="/live">
          <i class="fa fa-clock-o"></i>Live Analytics</a>
      </li>
      <li class="">
        <a href="/snore">
          <i class="fa fa-bed"></i>Snoring Analytics</a>
      </li>
    </ul>
    <a href="#" class="toggle toggle--on"></a>
    <svg class="legend">
      <g transform="translate(30,30)">
        <circle r="15" class="one" />
        <text class="legendText" dx="0" dy="30" text-anchor="middle">Good</text>
      </g>
      <g transform="translate(90,30)">
        <circle r="15" class="two" />
        <text class="legendText" dx="0" dy="30" text-anchor="middle">Borderline</text>
      </g>
      <g transform="translate(150,30)">
        <circle r="15" class="three" />
        <text class="legendText" dx="0" dy="30" text-anchor="middle">Alert</text>
      </g>
    </svg>
  </aside>
  <div class="dashboard">
    <div class="row" style="min-height: 2.0em">
      <dl id='device-selector' class="dropdown dropdown-style" style="float:right;  margin-right:5%;">
        <dt>
            <a href="#"><span id="current-device">Select Device</span></a>
          </dt>
        <dd>
          <ul class='device-group'>
          </ul>
        </dd>
      </dl>
      <dl id='time-selector' class="dropdown1 dropdown-style" style="float:left;  margin-left:5%;">
        <dt>
            <a href="#" id="current-setting"><span>All Time</span></a>
          </dt>
        <dd>
          <ul>
            <li><a href="#">Last Day<span class="value">DA</span></a></li>
            <li><a href="#">Last Week<span class="value">WE</span></a></li>
            <li><a href="#">Last Month<span class="value">MO</span></a></li>
            <li><a href="#">All Time<span class="value">AT</span></a></li>
          </ul>
        </dd>
      </dl>
    </div>
    <canvas id="data-chart"></canvas>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <!-- Custom s file -->
  <script type="text/javascript" src="/js/graph.js"></script>
</body>

</html>
