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

'use strict';

(() => {
    class ClockDrawer {
        constructor(canvas) {
            this.ctx = canvas.getContext('2d');
            this.width = canvas.width;
            this.height = canvas.height;
        }

        draw(angle, func) {
            this.ctx.save();

            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.rotate(Math.PI / 180 * angle);

            this.ctx.beginPath();
            func(this.ctx);
            this.ctx.stroke();

            this.ctx.restore();
        }

        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    class Clock {
        constructor(drawer) {
            this.r = 250;
            this.drawer = drawer;
        }

        drawFace() {
            for (let angle = 0; angle < 360; angle += 6) {
                this.drawer.draw(angle, ctx => {
                    ctx.moveTo(0, -this.r);
                    if (angle % 30 === 0) {
                        ctx.lineWidth = 2;
                        ctx.lineTo(0, -this.r + 10);
                        ctx.font = '13px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText(angle / 30 || 12, 0, -this.r + 25);
                    } else {
                        ctx.lineTo(0, -this.r + 5);
                    }
                });
            }
        }

        drawHands() {
            // hour
            this.drawer.draw(this.h * 30 + this.m * 0.5, ctx => {
                ctx.lineWidth = 6;
                ctx.moveTo(0, 10);
                ctx.lineTo(0, -this.r + 50);
            });

            // minute
            this.drawer.draw(this.m * 6, ctx => {
                ctx.lineWidth = 4;
                ctx.moveTo(0, 10);
                ctx.lineTo(0, -this.r + 30);
            });

            // second
            this.drawer.draw(this.s * 6, ctx => {
                ctx.strokeStyle = 'red';
                ctx.moveTo(0, 20);
                ctx.lineTo(0, -this.r + 20);
            });
        }

        update() {
            var now = new Date();
            this.h = now.getHours();
            this.m = now.getMinutes();
            this.s = now.getSeconds();
        }

        run() {
            this.update();
            this.drawer.clear();
            this.drawFace();
            this.drawHands();

            setTimeout(() => {
                this.run();
            }, 100);
        }
    }

    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
        return;
    }

    const clock = new Clock(new ClockDrawer(canvas));
    clock.run();
})();