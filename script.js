const cityId = "3";
const mapCenter = { lat: 47.6062, lon: -122.3321 };
const mapZoom = 10;

var members = null;
$.getJSON('https://bicyclebenefits.org/members',{categories: "", city_id: cityId, member: ""})
    .done(function(data, _status, _headers, _config) {
        members = data.members;
        $('.generateCardButton').attr('disabled', false);
        generateCard(members);
});

$('.generateCardButton').on('click', function() {
    generateCard(members);
});

function generateBingoSet(membersData) {
    const bingoSetSize = 25;
    var bingoSetIndices = [];
    while (bingoSetIndices.length < bingoSetSize) {
      let index = Math.floor(Math.random() * membersData.length);
      if (!bingoSetIndices.includes(index)) {
        bingoSetIndices.push(index);
      }
    }
    let bingoSet = bingoSetIndices.map(i => membersData[i]);

    return bingoSet
}

function generateCard(membersData) {
    let bingoSet = generateBingoSet(membersData);


    var html = '';
    for (var i = 0; i < bingoSet.length; i++) {
        html +=
`<div class="bingoCard__square">
    <div class="bingoCard__squareInner">
        <div class="bingoCard__textWrapper">
            <span>${i}: ${bingoSet[i].name}</span>
        </div>
    </div>
</div>
`
    }
    $('.bingoCard').html(html);

    var mapData = [
        {
            type: "scattermapbox",
            text: bingoSet.map(member => member.name),
            lon: bingoSet.map(member => member.longitude),
            lat: bingoSet.map(member => member.latitude),
            marker: { color: "red", size: 10 }
        }
    ]

    var mapLayout = {
        dragmode: "zoom",
        mapbox: { style: "open-street-map", center: mapCenter, zoom: mapZoom },
        margin: { r: 0, t: 0, b: 0, l: 0 }
    }

    let bingoMap = document.getElementById('bingoMap');
    Plotly.newPlot(bingoMap, mapData, mapLayout);
}

console.log(
`
                                            ░░░░░░░░░░░░░░
                                          ░░░░░░░░░░░░░░░░
                                        ██░░░░░░░░░░░░░░░░░░░░
                                          ██████████▓▓░░░░░░░░
                                            ░░░░░░░░▓▓▓▓░░░░░░
                                            ▒▒░░░░░░░░▒▒▓▓░░██
                                            ██░░░░▒▒░░░░▓▓░░░░
                                            ▓▓░░░░▒▒░░░░▓▓▒▒░░
                                            ░░░░░░░░░░░░░░░░
                                            ░░    ░░░░░░░░
                                              ░░░░░░░░░░░░
                                                ░░░░░░░░░░  ████
                                                  ▒▒  ░░  ░░▓▓▓▓▓▓▓▓
                                                ▒▒▒▒  ░░  ░░▓▓▓▓▓▓▓▓▒▒
                                              ▒▒▓▓▓▓░░▒▒░░░░██▓▓▓▓▓▓▓▓▒▒
                                              ▓▓▓▓▓▓▓▓░░▒▒░░▓▓▓▓▓▓▓▓▓▓▓▓
                                              ▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓██▓▓▓▓▓▓▓▓▓▓
                                            ▓▓▓▓▓▓██▓▓▓▓▓▓▒▒▓▓▓▓▓▓▓▓▓▓▒▒██
                                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒
                                            ▓▓▓▓██░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒
                                          ▒▒▓▓▓▓██  ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒
                                          ▓▓▓▓██▒▒  ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓
                                        ▓▓▓▓▓▓██  ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒
                                      ██▓▓▓▓██  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▓▓▒▒
                                    ▓▓▓▓▓▓██  ▓▓▓▓▓▓▒▒  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▓▓▒▒▓▓▓▓
                                  ▓▓██████  ▓▓▓▓▓▓▒▒    ▓▓▓▓▓▓▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                            ░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓      ▓▓▓▓████████▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                          ░░░░░░░░░░░░░░░░    ▓▓██▓▓▓▓▓▓██████████████████▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒
                        ░░░░░░░░░░░░░░░░░░▓▓▓▓████████████████████████████▓▓▒▒▒▒▓▓▒▒▓▓▓▓▓▓
                        ░░░░░░░░    ░░░░▓▓██████████▓▓████████████████▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒
                        ░░░░          ▓▓████████████████████████████▓▓▓▓▓▓  ░░░░▓▓▓▓▓▓▒▒▒▒
                          ░░        ▒▒████████░░  ▒▒▒▒██▓▓████████▒▒▒▒░░░░      ░░▓▓▓▓▓▓░░
                            ░░░░░░  ████████      ░░██████▓▓▓▓██  ░░
                              ▒▒▒▒  ████████      ▓▓██████████  ░░░░
                          ░░  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████▓▓▓▓▒▒▒▒▒▒▒▒
                          ░░  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒████▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒
                          ░░░░▒▒▒▒░░░░░░▓▓▓▓▓▓▓▓████▓▓▓▓░░░░░░░░▒▒▒▒▒▒▒▒
                              ▒▒▒▒▒▒    ░░██████████▓▓░░        ▒▒░░░░▒▒▒▒
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒      ██████████▓▓      ▒▒▒▒      ▒▒▒▒  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          ▓▓████████████████▓▓▒▒  ▒▒▒▒▒▒      ██████████▓▓    ▒▒          ▒▒▒▒██████████████████▓▓
        ░░▓▓▓▓▒▒██▒▒▒▒▒▒▒▒▒▒▓▓▒▒░░░░▒▒▒▒░░    ▒▒██▓▓████▓▓░░  ▒▒          ▓▓▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒██▓▓░░
      ░░▓▓██▒▒            ░░▓▓▒▒██░░░░▒▒▒▒░░    ▒▒████████▓▓░░▒▒        ░░██▒▒▒▒░░            ▒▒██▓▓░░
    ░░▓▓▓▓▓▓                ▒▒▒▒▓▓▓▓░░▒▒▒▒▒▒░░    ████████████▒▒      ░░▓▓▓▓  ▒▒▒▒░░            ▒▒██▓▓░░
    ▓▓██▒▒                ░░▒▒▒▒  ▓▓██▓▓▒▒▒▒▒▒░░  ▓▓██████████▓▓      ▓▓██      ▒▒▒▒░░            ▓▓██▓▓
    ████                  ▒▒▒▒      ██▓▓  ▒▒▒▒▒▒  ░░▓▓██████████    ░░██▓▓        ▒▒▒▒              ▓▓██
  ▓▓██▓▓                  ▒▒▒▒      ████    ▒▒▒▒▒▒░░██████████████  ▓▓▓▓            ▒▒▒▒              ██▓▓
  ▓▓██                    ▒▒▒▒        ██▓▓    ▒▒▒▒░░░░████████████████▓▓              ▒▒              ██▓▓
  ▓▓██                  ▒▒▒▒          ██▓▓      ▒▒▒▒▒▒▒▒██▓▓████████▓▓                ▒▒              ██▓▓
  ▓▓██              ░░▒▒▒▒            ██▓▓        ▒▒▒▒▒▒▒▒██████▓▓▓▓▓▓░░              ▒▒              ██▓▓
  ▓▓██            ░░▒▒▒▒              ██▓▓          ░░▒▒▒▒░░██▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░            ██▓▓
  ▓▓██              ░░                ██▓▓              ▒▒░░░░░░▓▓████▓▓██            ░░              ██▓▓
  ▓▓██                                ██▓▓              ░░░░░░░░▓▓▓▓▓▓▓▓▒▒                            ██▓▓
  ▓▓██                              ▒▒██▓▓                  ░░▒▒██████▓▓                              ██▓▓
    ██                              ████                    ▓▓██▓▓██░░░░██                          ████▓▓
    ▓▓██                          ████                    ██▓▓▓▓██░░░░▓▓████                      ████▓▓
      ██▓▓                      ▓▓██▓▓                                  ▓▓██                    ▓▓██▓▓
        ██▓▓▒▒              ▒▒▓▓██▓▓                                      ▓▓▓▓▓▓              ▓▓██▓▓
        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓████▓▓░░                                        ▓▓██▓▓▓▓▓▓▓▓▓▓▓▓▓▓██▓▓
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒                                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
(source: https://textart.sh/topic/bicycle)
`
)