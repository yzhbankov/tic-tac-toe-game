/**
 * Created by Iaroslav Zhbankov on 14.11.2016.
 */
(function () {
    var arr = ["x", null, null, null, null, null, null, null, null];

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
            if (!result) {
                return newSet[Math.floor(Math.random() * newSet.length)];
            }
        }
    }

    minimax(arr);

})();