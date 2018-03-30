<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <title>homely Analytics</title>
  <link rel="stylesheet" href="/css/live.css">
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
    var node = "{{nodeArray}}"
    var lastDataItem = "{{lastDataItemArray}}"
    var nodeArray = JSON.parse(node.replaceAll("&quot;", "\""));
    var lastDataItemArray = JSON.parse(lastDataItem.replaceAll("&quot;", "\""));
  </script>
</head>

<body>
  <aside>
    <h1>home.ly</h1>
    <ul>
      <li class="">
        <a href="/">
          <i class="fa fa-line-chart"></i>Graph Analytics</a>
      </li>
      <li class="active">
        <a href="/live">
          <i class="fa fa-clock-o"></i>Live Analytics</a>
      </li>
      <li class="">
        <a href="/snore">
          <i class="fa fa-bed"></i>Snoring Analytics</a>
      </li>
      <li class="">
        <a href="/map">
          <i class="fa fa-globe"></i>Device Tracking</a>
      </li>
    </ul>
    <p class="toggle-label blink-text"> Live Tracking </p>
    <a href="#" class="toggle toggle--on"></a>
  </aside>
  <div class="dashboard">
    <div class="row" style="min-height: 2.0em">
      <h1 style="float:left; color:white; padding-left: 5%;">
        Live Analytics Dashboard
      </h1>
      <dl id='device-selector' class="dropdown dropdown-style" style="float:right; margin-right:5%;">
        <dt>
            <a href="#"><span id="current-device">Select Device</span></a>
          </dt>
        <dd>
          <ul class='device-group'>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="row">
      <div class="temperature">
        <div class="info">
          <div class="wrapper">
            <div>
              <canvas id="temperature-gauge"></canvas>
              <div class="textfield" id="temperature-textfield"></div>
            </div>
            <div>
              <h1>Temperature</h1>
              <p>The last recorded temperature value for this device was <span id="temperature-preview">30</span> degrees celsius.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="humidity">
        <div class="info">
          <div class="wrapper">
            <div>
              <canvas id="humidity-gauge"></canvas>
              <div class="textfield" id="humidity-textfield"></div>
            </div>
            <div>
              <h1>Humidity</h1>
              <p>The last recorded humidity value for this device was <span id="humidity-preview">40</span> percent.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pressure">
        <div class="info">
          <div class="wrapper">
            <div>
              <canvas id="pressure-gauge"></canvas>
              <div class="textfield" id="pressure-textfield"></div>
            </div>
            <div>
              <h1>Pressure</h1>
              <p>The last recorded pressure value for this device was <span id="pressure-preview">100</span> kPa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

  <script type="text/javascript" src="/js/libraries/gauge.min.js"></script>
  <script type="text/javascript" src="/js/common.js"></script>
  <script type="text/javascript" src="/js/live.js"></script>
</body>

</html>
