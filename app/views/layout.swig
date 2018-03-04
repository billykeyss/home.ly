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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
  <script>
    var data = "{{data}}";
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
    <div id="chartContainer">
      <canvas id="myChart"></canvas>
    </div>
    <div class="grid-container">
      <div class="temperature-grid" id="">
        <div class="info">
          <div class="wrapper">
            <div>
              <span class="circle c-temperature">CURRENT</br>TEMP</span>
            </div>
            <div>
              <p>This is the summary of the temperature in your home in the past 24 hours. Looks like its a little (cold/hot), might want to (turn up the heat/open a window)!</p>
            </div>
          </div>
        </div>
      </div>
      <div class="humidity-grid" id="">
        <div class="info">
          <div class="wrapper">
            <div>
              <span class="circle c-humidity">CURRENT</br>HUMIDITY</span>
            </div>
            <div>
              <p>This is the summary of the humidity in your home in the past 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pressure-grid" id="">
        <div class="info">
          <div class="wrapper">
            <div>
              <span class="circle c-pressure">CURRENT</br>PRESSURE</span>
            </div>
            <div>
              <p>This is the summary of the pressure in your home in the past 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Compiled and minified jQuery 2.1.3 -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <!-- CDN for chart js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.js"></script>
  <!-- Compiled and minified global js file -->
  <script type="text/javascript" src="/js/main.js"></script>
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
</body>

</html>
