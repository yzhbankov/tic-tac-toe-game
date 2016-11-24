/**
 * Created by ְֳִּ 3 on 23.11.2016.
 */
(function () {
    var arr = [null, null, null, null, null, null, null, null, null];
    var cells = $(".cell");
    var switcherX = $(".switch-js-x");
    var switcherO = $(".switch-js-o");
    var playerType = "X";
    var computerType = "O";
    var scoreO = $(".score-O-js");
    var scoreX = $(".score-X-js");
    var field = $(".field-js");
    var result = $(".result");

    switcherX.on("click", function () {
        switcherX.css("border-style", "solid");
        switcherO.css("border-style", "hidden");
        playerType = "X";
        computerType = "O";
        clear(arr);
    });

    switcherO.on("click", function () {
        switcherO.css("border-style", "solid");
        switcherX.css("border-style", "hidden");
        playerType = "O";
        computerType = "X";
        clear(arr);
        arr = minimax(arr, computerType, playerType);
        render(arr);
    });

    cells.each(function (item) {

        $(this).on("click", function () {
            if (($(this).text() != "X") && ($(this).text() != "O")) {
                $(this).text(playerType);
                cells.each(function (item) {
                    if (($(this).text() == "X") || ($(this).text() == "O")) {
                        return arr[item] = $(this).text();
                    } else {
                        return arr[item] = null;
                    }
                });
                if (arr.indexOf(null) == -1) {
                    hideShow("Draw");
                }
                if (won(arr, playerType)) {
                    fire(arr, playerType);
                    hideShow(playerType);

                    if (playerType == "X") {
                        scoreX.text(Number(scoreX.text()) + 1);
                    } else {
                        scoreO.text(Number(scoreO.text()) + 1);
                    }
                } else {
                    arr = minimax(arr, computerType, playerType);
                    if (won(arr, computerType)) {
                        cells.each(function (item) {
                            $(this).text(arr[item]);
                            $(this).css("background-color", "#0cc0a8");
                        });
                        fire(arr, computerType);
                        hideShow(computerType);
                        if (computerType == "X") {
                            scoreX.text(Number(scoreX.text()) + 1);
                        } else {
                            scoreO.text(Number(scoreO.text()) + 1);
                        }
                    } else {
                        render(arr, 1000);
                    }
                    if (arr.indexOf(null) == -1) {
                        hideShow("Draw");
                    }
                }
            }
        });
    });

    function won(arr, type) {
        for (var i = 0; i < 3; i++) {
            if ((arr[0 + i * 3] == arr[1 + i * 3]) && (arr[0 + i * 3] == arr[2 + i * 3]) && (arr[0 + i * 3] == type)) {
                return true;
            }
            if ((arr[i] == arr[i + 3]) && (arr[i + 3] == arr[i + 6]) && (arr[i] == type)) {
                return true;
            }
            if ((arr[0] == arr[4]) && (arr[0] == arr[8]) && (arr[0] == type)) {
                return true;
            }
            if ((arr[2] == arr[4]) && (arr[2] == arr[6]) && (arr[2] == type)) {
                return true;
            }
        }
        return false;
    }

    function minimax(arr, computerType, playerType) {
        var newSetComputer = [];
        var newSetPlayer = [];
        var result = false;
        for (var i = 0; i < 9; i++) {
            var brrC = arr.slice();
            var brrP = arr.slice();
            if (brrC[i] == null) {
                brrC[i] = computerType;
                newSetComputer.push(brrC);
            }
            if (brrP[i] == null) {
                brrP[i] = playerType;
                newSetPlayer.push(brrP);
            }
        }
        for (var j = 0; j < newSetComputer.length; j++) {
            if (won(newSetComputer[j], computerType)) {
                result = true;
                return newSetComputer[j];
            }
        }
        for (var j = 0; j < newSetComputer.length; j++) {
            if (won(newSetPlayer[j], playerType)) {
                result = true;
                return newSetComputer[j];
            }
        }
        if (arr.indexOf(null) == -1) {
            return arr;
        }

        if (!result) {
            return newSetComputer[Math.floor(Math.random() * newSetComputer.length)];
        }
    }

    function render(arr, delay) {
        setTimeout(function () {
            cells.each(function (item) {
                $(this).text(arr[item]);
                $(this).css("background-color", "#0cc0a8");
            })
        }, delay);
    }

    function clear(arr, delay) {
        arr.forEach(function (item, i) {
            arr[i] = null;
        });
        render(arr, delay);
    }

    function hideShow(type) {
        var ticks = 0;
        var fieldHide = setInterval(function () {
            ticks++;
            $(".field-js").css("opacity", (0.1 * (20 - ticks)).toString());
            if (ticks == 20) {
                clearInterval(fieldHide);
                clear(arr, 0);
                $(".field-js").hide();
                result.text(type);
                $(".result").show();
                ticks = 0;
                var statusHide = setInterval(function () {
                    ticks++;
                    if (ticks == 20) {
                        clearInterval(statusHide);
                        $(".result").hide();
                        ticks = 0;
                        var fieldShow = setInterval(function () {
                            $(".field-js").show();

                            ticks++;
                            $(".field-js").css("opacity", (0.1 * (ticks)).toString());
                            if (ticks == 10) {

                                clearInterval(fieldShow);
                                if (playerType == "O") {
                                    arr = minimax(arr, computerType, playerType);
                                    render(arr);
                                }
                            }
                        }, 50);
                    }
                }, 50);
            }
        }, 50);

    }

    function fire(arr, type) {
        for (var i = 0; i < 3; i++) {
            if ((arr[0 + i * 3] == arr[1 + i * 3]) && (arr[0 + i * 3] == arr[2 + i * 3]) && (arr[0 + i * 3] == type)) {
                cells[0 + i * 3].setAttribute("style", "background-color:#0ca991");
                cells[1 + i * 3].setAttribute("style", "background-color:#0ca991");
                cells[2 + i * 3].setAttribute("style", "background-color:#0ca991");
            }
            if ((arr[i] == arr[i + 3]) && (arr[i + 3] == arr[i + 6]) && (arr[i] == type)) {
                cells[i].setAttribute("style", "background-color:#0ca991");
                cells[i + 3].setAttribute("style", "background-color:#0ca991");
                cells[i + 6].setAttribute("style", "background-color:#0ca991");
            }
            if ((arr[0] == arr[4]) && (arr[0] == arr[8]) && (arr[0] == type)) {
                cells[0].setAttribute("style", "background-color:#0ca991");
                cells[4].setAttribute("style", "background-color:#0ca991");
                cells[8].setAttribute("style", "background-color:#0ca991");
            }
            if ((arr[2] == arr[4]) && (arr[2] == arr[6]) && (arr[2] == type)) {
                cells[2].setAttribute("style", "background-color:#0ca991");
                cells[4].setAttribute("style", "background-color:#0ca991");
                cells[6].setAttribute("style", "background-color:#0ca991");
            }
        }
    }

})();