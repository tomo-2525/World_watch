function clock() {
    var now = new Date();

    var timeTokyo = now.getTime();
    var timeUTC = timeTokyo - 9 * 60 * 60 * 1000;

    var cityElement = document.getElementById("city");
    var index = cityElement.selectedIndex;
    var timeZone = cityElement.options[index].value;

    var timeCity = timeUTC + timeZone * 60 * 60 * 1000;

    now = new Date(timeCity);


    //年月日の取得
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();


    var weekArray = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    var week = weekArray[now.getDay()];//配列は０オリジン
    var dateElement = document.getElementById("date");
    dateElement.innerHTML = year + "/" + month + "/" + day + "/" + week;

    //時の取得
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var timeElemnt = document.getElementById("time");

    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    timeElemnt.innerHTML = hour + ":" + min + ":" + sec;

    //１秒毎 clock()を実行する 単位はm秒
    setTimeout("clock()", 1000);
}