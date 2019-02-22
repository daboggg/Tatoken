$(function () {
    /*$.ajax({
        dataType: "json",
        url: "https://cloud-api.yandex.net:443/v1/disk/resources/upload?path=123.txt",
        type: "GET",
        headers: {"Authorization": "OAuth AQAAAAAGLQtTAAVUVZEaClXVb0C8hLp8V2S1Uow"},
        success: oops
    });

    function oops(data) {

        $('#upload').on('click', function () {
            var file_data = $('#sortpicture').prop('files')[0];
            var form_data = new FormData();
            form_data.append('file', file_data);
            $.ajax({
                url: data.href,
                dataType: 'text',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                type: 'post',
                success: function () {
                    alert("Done!");
                }
            });
        });
    }*/


    // объект с переменными
    var settings = {
        currentDir: "/"
    };

    // начинаем с запроса корневого каталога
    listFiles(settings.currentDir);


    // метод оправляет запрос ajax на сервер и получает JSON текущей директории
    function listFiles(dir) {

        // запрос ajax
        $.ajax({
            dataType: "json",
            url: "https://cloud-api.yandex.net:443/v1/disk/resources/?path=" + dir + "&limit=100&sort=name",
            type: "GET",
            headers: {"Authorization": "OAuth AQAAAAAGLQtTAAVUVZEaClXVb0C8hLp8V2S1Uow"},
            success: oops
        });

        //принимает ответ от сервера в виде JSON
        function oops(data) {

            //освобождает каталог на странице
            $('#listFiles').empty();


            // в цикле проходим по JSON и добавляем в каталог на странице элементы
            $dir = data._embedded.items;
            $.each($dir, function (index, item) {
                // alert(item.preview);
                var li = '';
                li += '<li class="item">';
                li += item.name;
                li += '</li>';

                var $li = $(li);

                // если item.type является директорией добваляем событие клик на элемент в каталоге
                if (item.type == "dir") {
                    $li.click(function () {
                        if (settings.currentDir=="/") settings.currentDir = "";
                        var path = settings.currentDir + "/" + item.name;
                        settings.currentDir = path;
                        alert(path);
                        listFiles(path)
                    });
                }
                // добавляем элементы на станицу
                $('#listFiles').append($li);
            });
        }
    }

    //добавляем событие на кнопу назад
    $('#dirBackButton').click(function () {

        settings.currentDir = dirBack(settings.currentDir);
        alert(settings.currentDir);
        listFiles(settings.currentDir);
    });

    // определяет путь на шаг назад
    function dirBack(path) {
        var lastIndex = path.lastIndexOf("/");
        var dirBack = path.slice(0, lastIndex);
        return dirBack == "" ? "/" : dirBack;
    }

});
