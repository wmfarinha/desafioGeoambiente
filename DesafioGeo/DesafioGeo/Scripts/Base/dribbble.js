function detalheImagem(id) {

    $.ajax({
        type: 'POST',
        url: __path + 'Home/DetalheImagem',
        data: { imagemId: id },
        success: function (data) {

            var attr = "";

            attr += "<div class=\"row\"><div class=\"col-lg-12\"><img src=\"" + data.image_url + "\" class=\"img-responsive\" alt=\"Responsive image\" /></div></div>";
            attr += "<br />"
            attr += "<div class=\"row\"><div class=\"col-lg-2\"><img src=\"" + data.player.avatar_url + "\" width=\"80\" height=\"80\" class=\"img-circle\" /></div><div class=\"col-lg-10\"><h3>\"" + data.player.name + "\"</h3> Localização: " + data.player.location + "</div></div>";
            attr += "<br />"
            attr += "<div class=\"row\"><div class=\"col-lg-12\"><div id=\"map-canvas\" style=\"width: 100%; height: 500px;\"></div></div></div>";

            $("#myModalLabel").text(data.title);

            $("#modalImg").html(attr);

            codeAddress(data.player.location);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('1 - ' + xhr + ' 2 - ' + textStatus + ' 3 - ' + errorThrown);
        }
    })
}

function ImagensPopularesPagina(pagina) {

    $.ajax({
        type: 'POST',
        url: __path + 'Home/CarregaImagemPopular',
        data: { paginaId: pagina },
        success: function (data) {

            var attr = "";

            $.each(data, function (k, v) {
                $.each(v.shots, function (key, value) {

                    attr += "<div class=\"row\">"
                    attr += "<!-- Card Projects -->"
                    attr += "<div class=\"col-md-6 col-md-offset-3\" style=\"cursor: pointer\" data-toggle=\"modal\" data-target=\"#myModal\" onclick=\"detalheImagem(" + value.id + ");\">"
                    attr += "<div class=\"card\">"
                    attr += "<div class=\"card-image\">"
                    attr += "<img src=\"" + value.image_url + "\" height=\"80\" class=\"img-responsive\" alt=\"Responsive image\" />"
                    attr += "<div class=\"card-content\">"
                    attr += "<p><h3>" + value.title + "</h3></p>"
                    attr += "</div>"
                    attr += "</div>"
                    attr += "</div>"
                    attr += "</div>"
                    attr += "</div>"


                    $("#imgCentro").append(attr);

                    attr = "";
                })

                $("#pagina").val(v.page + 1);

            });
        },
        error: function (xhr, textStatus, errorThrown) {
            alert('1 - ' + xhr + ' 2 - ' + textStatus + ' 3 - ' + errorThrown);
        }
    })
}

function codeAddress(location) {

    var geocoder;
    var map;

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var address = location;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}