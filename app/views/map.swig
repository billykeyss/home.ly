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
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
  integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ=="
  crossorigin=""/>
  <!-- Font Awesome -->
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <script src='https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.js'></script>
  <link href='https://api.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' />
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
      <li>
        <a href="/live">
          <i class="fa fa-clock-o"></i>Live Analytics</a>
      </li>
      <li class="">
        <a href="/snore">
          <i class="fa fa-bed"></i>Snoring Analytics</a>
      </li>
      <li class="active">
        <a href="/map">
          <i class="fa fa-globe"></i>Device Tracking</a>
      </li>
    </ul>
  </aside>
  <div class="dashboard">
    <div class="row" style="min-height: 2.0em">
      <h1 style="float:left; color:white; padding-left: 5%;">
        Device Tracker
      </h1>
    </div>
    <div class="row" style="min-height: 2.0em">
      <div style="height:80vh" id="map"></div>
    </div>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
  <!-- Make sure you put this AFTER Leaflet's CSS -->
  <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"
    integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw=="
    crossorigin=""></script>

  <script type="text/javascript" src="/js/map.js"></script>
</body>

</html>
