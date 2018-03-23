<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <title>homely Analytics</title>
  <link rel="stylesheet" href="/css/style.css">
  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400|Pacifico' rel='stylesheet' type='text/css'>
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
    var lastTemperatureReading = "{{lastTemperatureReading}}"
    var lastPressureReading = "{{lastPressureReading}}"
    var lastHumidityReading = "{{lastHumidityReading}}"

    var dataArray = JSON.parse(data.replaceAll("&quot;", "\""));
    var lastDayDataArray = JSON.parse(lastDayData.replaceAll("&quot;", "\""));
    var lastWeekDataArray = JSON.parse(lastWeekData.replaceAll("&quot;", "\""));
    var lastMonthDataArray = JSON.parse(lastMonthData.replaceAll("&quot;", "\""));
    var nodeArray = JSON.parse(node.replaceAll("&quot;", "\""));

    lastTemperatureReading = lastTemperatureReading.replaceAll("&quot;", "");
    lastPressureReading = lastPressureReading.replaceAll("&quot;", "");
    lastHumidityReading = lastHumidityReading.replaceAll("&quot;", "");
  </script>
</head>

<body>
  <aside>
    <h1>home.ly</h1>
    <ul>
      <li class="active">
        <a href="#">
          <i class="fa fa-line-chart"></i>Analytics</a>
      </li>
    </ul>
  </aside>
  <div class="dashboard">
    <canvas id="myChart"></canvas>
    <div class="row" style="min-height: 2.0em">
      <dl id='deviceSelector' class="dropdown dropdown-style" style="float:left">
        <dt>
            <a href="#"><span id="currentDevice">Select Device</span></a>
          </dt>
        <dd>
          <ul class='device-group'>
          </ul>
        </dd>
      </dl>
      <dl id='timeSelector' class="dropdown1 dropdown-style" style="float:right">
        <dt>
            <a href="#" id="currentSetting"><span>All Time</span></a>
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
    <div class="row">
      <div class="temperature">
        <div class="info">
          <div class="wrapper">
            <div>
              <span class="circle c-temperature"> <span id="lastTemperatureReading">{{ lastTemperatureReading }}</span> </br> Degrees </span>
            </div>
            <div>
              <p>This is the last recorded temperature value in your home.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="humidity">
        <div class="info">
          <div class="wrapper">
            <div>
              <span class="circle c-humidity"> <span id="lastHumidityReading">{{ lastHumidityReading }}</span></br> Percent </span>
            </div>
            <div>
              <p>This is the last recorded humidity level in your home.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pressure">
        <div class="info">
          <div class="wrapper">
            <div>
              <span class="circle c-pressure"> <span id="lastPressureReading">{{ lastPressureReading }}</span> </br> kPa </span>
            </div>
            <div>
              <p>This is the last recorded pressure value in your home.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Compiled and minified jQuery 2.1.3 -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
  <!-- CDN for chart js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <!-- Compiled and minified global js file -->
  <script type="text/javascript" src="/js/main.js"></script>
</body>

</html>
