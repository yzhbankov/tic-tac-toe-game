/**
 * Created by ְֳִּ 3 on 23.11.2016.
 */
(function () {
    var arr = [null, null, null, null, null, null, null, null, null];
    var cells = document.querySelectorAll(".cell");
/*    NodeList.prototype.forEach = Array.prototype.forEach;*/
    Array.prototype.forEach(NodeList);
    var switcherX = document.querySelector(".switch-js-x");
    var switcherO = document.querySelector(".switch-js-o");
    var playerType = "X";
    var computerType = "O";
    var scoreO = document.querySelector(".score-O-js");
    var scoreX = document.querySelector(".score-X-js");
    var field = document.querySelector(".field-js");
    var result = document.querySelector(".result");

    switcherX.addEventListener("click", function () {
        switcherX.setAttribute("style", "border-style: solid;");
        switcherO.setAttribute("style", "border-style: hidden;");
        playerType = "X";
        computerType = "O";
        clear(arr);
    });

    switcherO.addEventListener("click", function () {
        switcherO.setAttribute("style", "border-style: solid;");
        switcherX.setAttribute("style", "border-style: hidden;");
        playerType = "O";
        computerType = "X";
        clear(arr);
        arr = minimax(arr, computerType, playerType);
        render(arr);
    });

    cells.forEach(function (item) {
        item.addEventListener("click", function () {
            if ((item.innerText != "X") && (item.innerText != "O")) {
                item.innerText = playerType;
                cells.forEach(function (item, i) {
                    if ((item.innerText == "X") || (item.innerText == "O")) {
                        return arr[i] = item.innerText;
                    } else {
                        return arr[i] = null;
                    }
                });
                if (arr.indexOf(null) == -1) {
                    /*cells.forEach(function (item, i) {
                     item.innerText = arr[i];
                     item.setAttribute("style", "background-color: #0cc0a8");
                     });*/
                    hideShow("Draw");
                }
                if (won(arr, playerType)) {
                    fire(arr, playerType);
                    hideShow(playerType);

                    if (playerType == "X") {
                        scoreX.innerText = Number(scoreX.innerText) + 1;
                    } else {
                        scoreO.innerText = Number(scoreO.innerText) + 1;
                    }
                } else {
                    arr = minimax(arr, computerType, playerType);
                    if (won(arr, computerType)) {
                        cells.forEach(function (item, i) {
                            item.innerText = arr[i];
                            item.setAttribute("style", "background-color: #0cc0a8");
                        });
                        fire(arr, computerType);
                        hideShow(computerType);
                        if (computerType == "X") {
                            scoreX.innerText = Number(scoreX.innerText) + 1;
                        } else {
                            scoreO.innerText = Number(scoreO.innerText) + 1;
                        }
                    } else {
                        render(arr, 1000);
                    }
                    if (arr.indexOf(null) == -1) {
                        /*cells.forEach(function (item, i) {
                         item.innerText = arr[i];
                         item.setAttribute("style", "background-color: #0cc0a8");
                         });*/
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
            cells.forEach(function (item, i) {
                item.innerText = arr[i];
                item.setAttribute("style", "background-color: #0cc0a8");
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
                result.innerText = type;
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
                cells[0 + i * 3].setAttribute("style", "background-color: #0ca991");
                cells[1 + i * 3].setAttribute("style", "background-color: #0ca991");
                cells[2 + i * 3].setAttribute("style", "background-color: #0ca991");
            }
            if ((arr[i] == arr[i + 3]) && (arr[i + 3] == arr[i + 6]) && (arr[i] == type)) {
                cells[i].setAttribute("style", "background-color: #0ca991");
                cells[i + 3].setAttribute("style", "background-color: #0ca991");
                cells[i + 6].setAttribute("style", "background-color: #0ca991");
            }
            if ((arr[0] == arr[4]) && (arr[0] == arr[8]) && (arr[0] == type)) {
                cells[0].setAttribute("style", "background-color: #0ca991");
                cells[4].setAttribute("style", "background-color: #0ca991");
                cells[8].setAttribute("style", "background-color: #0ca991");
            }
            if ((arr[2] == arr[4]) && (arr[2] == arr[6]) && (arr[2] == type)) {
                cells[2].setAttribute("style", "background-color: #0ca991");
                cells[4].setAttribute("style", "background-color: #0ca991");
                cells[6].setAttribute("style", "background-color: #0ca991");
            }
        }
    }

})();