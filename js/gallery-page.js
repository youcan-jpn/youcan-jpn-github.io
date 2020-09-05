$(function () {
    'use strict'


    /*
     * Sticky header
     */
    $('.page-header').each(function () {

        var $window = $(window), // ウィンドウを jQuery オブジェクト化
            $header = $(this),   // ヘッダーを jQuery オブジェクト化
            // ヘッダーのデフォルト位置を取得
            headerOffsetTop = $header.offset().top;

        // ウィンドウのスクロールイベントを監視
        // (ウィンドウがスクロールするごとに処理を実行する)
        $window.on('scroll', function () {
            // ウィンドウのスクロール量をチェックし、
            // ヘッダーのデフォルト位置を過ぎていればクラスを付与、
            // そうでなければ削除
            if ($window.scrollTop() > headerOffsetTop) {
                $header.addClass('sticky');
            } else {
                $header.removeClass('sticky');
            }
        });

        // ウィンドウのスクロールイベントを発生させる
        // (ヘッダーの初期位置を調整するため)
        $window.trigger('scroll');
    });

    $('#gallery').each(function() {
        var $container = $(this);

        $container.masonry({
            columnWidth: 230,
            gutter: 10,
            itemSelector: '.gallery-item'
        });

        $.getJSON('./data/content.json', function(data) {
            var elements = [];

            $.each(data, function(i, item) {
                var itemHTML = 
                    '<li class="gallery-item is-loading">' +
                        '<a href="' + item.images.large + '">' +
                            '<img src="' + item.images.thumb +
                                '" alt="' + item.title + '">' +
                        '</a>' +
                    '</li>';

                elements.push($(itemHTML).get(0));
            });

            $container.append(elements);

            $container.imagesLoaded(function() {
                $(elements).removeClass('is-loading');
                $container.masonry('appended', elements);
            });
        });
    });
});
