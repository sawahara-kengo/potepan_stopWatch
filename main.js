//要素を取得-----
    /*メモ：
    constは定数。
    resetなどメソッドを汎用的な名前にすると、
    JSに既存のメソッド名とバッティングして予期せぬ挙動をすることがある
    -->なるべく具体的な名前にするなどした方が良い*/

//表示する時間
const timeDisplay = document.getElementById('time');
//スタートボタン
const startButton = document.getElementById('start');
//ストップボタン
const stopButton = document.getElementById('stop');
//リセットボタン
const resetButton = document.getElementById('reset');


//変数を用意-----

//開始時間(ストップウォッチを開始した時間)
let startTime;
//停止時間(/停止した時間 デフォルト値=0)
let stopTime = 0;
//タイムアウトID(時間のカウントを止める際に必要な変数)
let timeoutID;


//現在の時間を表示(Dateオブジェクト使用)-----

function displayTime(){
    //現在のカウント時間(currentTime) = 現在時刻(Date.now()) - 開始時間 + 停止時間
    const currentTime = new Date(Date.now() - startTime + stopTime);
    //取得した現在のカウント時間から時に修正
    const h = String(currentTime.getHours()-9).padStart(1,"0");
    //取得した現在のカウント時間から分に修正
    const m = String(currentTime.getMinutes()).padStart(1,"0");
    //取得した現在のカウント時間から秒に修正
    const s = String(currentTime.getSeconds()).padStart(1,"0");
    //取得した現在のカウント時間からミリ秒に修正
    const ms = String(currentTime.getMilliseconds());

    //デフォルトの値0:0:0:0を現在のカウント時間に上書きする
    time.textContent = `${h}:${m}:${s}:${ms}`;
    //第二引数に指定した時間経過後に第一引数の関数を呼び出す関数 戻り値はtimeoutID
    timeoutID = setTimeout(displayTime,10);
}


//スタートボタンの機能-----

//スタートボタンがクリックされたらプログラムを実行
startButton.addEventListener('click',() => {
    //スタートボタンを無効にする
    startButton.disabled = true
    //ストップボタンを有効にする
    stopButton.disabled = false
    //リセットボタンを無効にする
    resetButton.disabled = true
    //startTime変数にDate.now()で取得した現在時刻を代入
    startTime = Date.now();
    //カウントされている時間を表示させるためdisplayTime関数を呼び出し
    displayTime();
});


//ストップボタンの機能-----

stopButton.addEventListener('click', function() {
    //スタートボタンを有効にする
    startButton.disabled = false;
    //ストップボタンを無効にする
    stopButton.disabled = true;
    //リセットボタンを有効にする
    resetButton.disabled = false;
    //タイムアウトをキャンセル = ストップウォッチのカウント機能をキャンセル
    clearTimeout(timeoutID);
    //stopTime変数にストップボタンがクリックされた時刻からスタートボタンがクリックされた時刻を引き、stopTime自身の時間を足した値を代入
    stopTime += (Date.now() - startTime); 
})

//リセットボタンの機能

resetButton.addEventListener('click', function() {
    //スタートボタンを有効にする
    startButton.disabled = false;
    //ストップボタンを無効にする
    stopButton.disabled = true;
    //リセットボタンを無効にする
    resetButton.disabled = true;
    //表示していたカウント時間を元に戻す
    time.textContent = '0:0:0:0';
    //停止時間を0にする(累算させない)
    stopTime = 0;
})