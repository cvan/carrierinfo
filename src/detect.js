(function() {
  function parseObject(obj, maxDepth, prefix) {
    var result = [];
    var value;
    prefix = prefix || '';
    for (var key in obj) {
      value = obj[key];
      if (value && typeof value == 'object') {
        if (maxDepth !== undefined && maxDepth <= 1) {
          result.push([prefix + key, 'object [max depth reached]']);
        } else {
          var children = parseObject(value,
                                     maxDepth ? maxDepth - 1 : maxDepth,
                                     prefix + key + '.');
          result.concat(children);
        }
      } else {
        result.push([prefix + key,
                     typeof value == 'function' ? 'function' : value]);
      }
    }
    return result;
  }

  function printObject(obj, maxDepth, prefix) {
    var result = '';
    var parsed = parseObject(obj, maxDepth, prefix);
    return parsed.sort(function (a, b) {
      return a[0].toLowerCase() > b[0].toLowerCase();
    }).map(function (parts) {
      return parts[0] + '=' + parts[1];
    }).join('\n');
  }

  document.querySelector('.refresh').addEventListener('click', function() {
    window.location.reload();
  }, false);

  var output = [];

  var conn = navigator.mozMobileConnection;
  var ul = document.querySelector('ul.mmc');
  try {
    console.log('navigator.mozMobileConnection:', JSON.stringify(conn));
  } catch(e) {
    output.push('<li>Cannot serialize</li>');
  }
  if (!conn) {
    output.push('<li>Connection unavailable</li>');
  } else {
    output.push('<li>' + printObject(conn) + '</li>');
  }
  ul.innerHTML = output.join('\n');

  output = [];

  conn = navigator.mozMobileConnections;
  var ol = document.querySelector('ol.mmcs');
  try {
    console.log('navigator.mozMobileConnections:', JSON.stringify(conn));
  } catch(e) {
    output.push('<li>Cannot serialize</li>');
  }

  if (!conn) {
    output.push('<li>Connections unavailable</li>');
  } else {
    output.push(printObject(conn));
  }
  ol.innerHTML = output.join('\n');

  document.querySelector('.working').remove();
})();
