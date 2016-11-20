/**
 * Created by Iaroslav Zhbankov on 14.11.2016.
 */
(function () {
    var arr = [null, null, null, null, null, null, null, null, null];
    var cells = document.querySelectorAll(".cell");
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
        arr = minimax(arr, computerType);
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
                    result.innerText = "Draw!";
                    clear(arr);
                }
                if (won(arr, playerType)) {
                    result.innerText = playerType + " win!";
                    hideShow();
                    clear(arr);
                    if (playerType == "X") {
                        scoreX.innerText = Number(scoreX.innerText) + 1;
                    } else {
                        scoreO.innerText = Number(scoreO.innerText) + 1;
                    }
                } else {
                    arr = minimax(arr, computerType);
                    render(arr);
                    if (won(arr, computerType)) {
                        result.innerText = computerType + "win!";
                        clear(arr);
                        if (computerType == "X") {
                            scoreX.innerText = Number(scoreX.innerText) + 1;
                        } else {
                            scoreO.innerText = Number(scoreO.innerText) + 1;
                        }
                    }
                    if (arr.indexOf(null) == -1) {
                        result.innerText = "Draw!";
                        clear(arr);
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

    function minimax(arr, type) {
        var newSet = [];
        var result = false;
        for (var i = 0; i < 9; i++) {
            var brr = arr.slice();
            if (brr[i] == null) {
                brr[i] = type;
                newSet.push(brr);
            }
        }
        for (var j = 0; j < newSet.length; j++) {
            if (won(newSet[j], type)) {
                result = true;
                return newSet[j];
            }
        }
        if (!result) {
            return newSet[Math.floor(Math.random() * newSet.length)];
        }
    }

    function render(arr) {
        cells.forEach(function (item, i) {
            item.innerText = arr[i];
        });
    }

    function clear(arr) {
        arr.forEach(function (item, i) {
            arr[i] = null;
        });
        console.log(arr);
        render(arr);
    }

    function hideShow() {
        var ticks = 0;
        var fieldHide = setInterval(function () {
            ticks++;
            $(".field-js").css("opacity", (0.1 * (10 - ticks)).toString());
            if (ticks == 10) {
                clearInterval(fieldHide);
                $(".field-js").hide();
                ticks = 0;
            }
        }, 50);
        var statusShow = setInterval(function () {
            $(".result").show();
            ticks++;
            $(".field-js").css("opacity", (0.1 * (ticks)).toString());
            if (ticks == 10) {
                clearInterval(statusShow);
                ticks = 0;
            }
        }, 50);
        var statusHide = setInterval(function () {
            ticks++;
            $(".result").css("opacity", (0.1 * (10 - ticks)).toString());
            if (ticks == 10) {
                clearInterval(statusHide);
                $(".result").hide();
                ticks = 0;
            }
        }, 50);
        var fieldShow = setInterval(function () {
            $(".field-js").show();
            ticks++;
            $(".field-js").css("opacity", (0.1 * (ticks)).toString());
            if (ticks == 10) {
                clearInterval(fieldShow);
                ticks = 0;
            }
        }, 50);
    }

})();