(function() {
  document.querySelector('.refresh').addEventListener('click', function() {
    window.location.reload();
  }, false);

  var output = [];

  var conn = navigator.mozMobileConnection;
  var dl = document.querySelector('dl.mmc');
  try {
    console.log('navigator.mozMobileConnection:', JSON.stringify(conn));
  } catch(e) {
    output.push('<dt>Cannot serialize</dt><dd></dd>');
  }
  if (!conn) {
    output.push('<dt>Connection unavailable</dt><dd></dd>');
  } else {
    output.push('<dt>lastKnownNetwork</dt><dd>' + conn.lastKnownNetwork + '</dd>');
    output.push('<dt>cardState</dt><dd>' + conn.cardState + '</dd>');
    output.push('<dt>data</dt><dd>' + conn.data + '</dd>');
    output.push('<dt>iccInfo.mcc</dt><dd>' + conn.iccInfo.mcc + '</dd>');
    output.push('<dt>iccInfo.mnc</dt><dd>' + conn.iccInfo.mnc + '</dd>');
    output.push('<dt>iccInfo.iccid</dt><dd>' + conn.iccInfo.iccid + '</dd>');
    output.push('<dt>voice.cell.gsmLocationAreaCode</dt><dd>' + conn.voice.cell.gsmLocationAreaCode + '</dd>');
    output.push('<dt>voice.cell.gsmCellId</dt><dd>' + conn.voice.cell.gsmCellId + '</dd>');
    output.push('<dt>voice.connected</dt><dd>' + conn.voice.connected + '</dd>');
    output.push('<dt>voice.emergencyCallsOnly</dt><dd>' + conn.voice.emergencyCallsOnly + '</dd>');
  }
  dl.innerHTML = output.join('\n');

  output = [];

  conn = navigator.mozMobileConnections;
  var ul = document.querySelector('ol.mmcs');
  try {
    console.log('navigator.mozMobileConnections:', JSON.stringify(conn));
  } catch(e) {
    output.push('<li>Cannot serialize</li>');
  }

  if (!conn) {
    output.push('<li>Connections unavailable</li>');
  } else {
    var i;
    var connData;
    for (i = 0; i < conn.length; i++) {
      output.push('<li>' + JSON.stringify(conn[i]) + '</li>');
    }
  }
  ul.innerHTML = output.join('\n');
})();
