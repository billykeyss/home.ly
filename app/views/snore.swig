<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  <title>homely Analytics</title>
  <link rel="stylesheet" href="/css/snore.css">
  <link rel="stylesheet" href="/css/common.css">
  <link rel="stylesheet" href="/css/table.css">
  <!-- Google Fonts -->
  <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400|Pacifico' rel='stylesheet' type='text/css'>
  <link href="https://fonts.googleapis.com/css?family=Work+Sans" rel="stylesheet">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.jqueryui.min.css"> -->


  <!-- Compiled and minified CSS -->
  <script>
    String.prototype.replaceAll = function(str1, str2, ignore) {
      return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof(str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    }

    var node = "{{nodeArray}}";
    var data = "{{data}}";
    var tableData = "{{tableData}}";
    var countSnore = "{{countSnore}}";
    var dataArray = JSON.parse(data.replaceAll("&quot;", "\""));
    var tableDataArray = JSON.parse(tableData.replaceAll("&quot;", "\""));
    var countSnoreArray = JSON.parse(countSnore.replaceAll("&quot;", "\""));
    var nodeArray = JSON.parse(node.replaceAll("&quot;", "\""));
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
      <li class="">
        <a href="/live">
          <i class="fa fa-clock-o"></i>Live Analytics</a>
      </li>
      <li class="active">
        <a href="/snore">
          <i class="fa fa-bed"></i>Snoring Analytics</a>
      </li>
    </ul>
  </aside>
  <div class="dashboard">
    <div class="row" style="min-height: 2.0em">
      <h1 style="float:left; color:white; padding-left: 5%;">
        Snoring Analytics Dashboard
      </h1>
      <dl id='device-selector' class="dropdown dropdown-style" style="float:right; margin-right:5%;">
        <dt>
            <a href="#"><span id="currentDevice">Select Device</span></a>
          </dt>
        <dd>
          <ul class='device-group'>
            <li><a href="#">All Devices<span class="value">AD</span></a></li>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="row">
      <table id="snoring-table" class="hover">
        <thead>
          <th class="text-align-left"></th>
          <th class="text-align-left"></th>
          <th class="text-align-left"></th>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
    <!-- <div class="row">
      <div class="temperature">
        <div>
           Snore occurences in last day: <span class="snore-day-preview"></span>
        </div>
        <div>
           Snore occurences in last day:
        </div>
        <div>
           Snore occurences in last day:
        </div>
        <div>
           Loudest snore recorded:
        </div>
      </div>
    </div> -->
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
  <!-- <script src="https://cdn.datatables.net/1.10.16/js/dataTables.jqueryui.min.js"></script> -->

  <script type="text/javascript" src="/js/snore.js"></script>
</body>

</html>
