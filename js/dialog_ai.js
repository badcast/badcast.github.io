
//Имя автора
var auhorName = "badcast";
var str_defaultText = "Я бот которого спилили :D. А вы кто? (Введите свое имя, чтобы познакомиться, внимание бот запомнит имя и сохранит его в куки)";
var humanName = "";

//Теги внутри answers
//>> тег keyWords - ключевые слова
//>> тег answer - выбор рандомнога ответа
//>> тег aiAnswer - Умный ответ! Только для любителя.
//>> тег reply - это для профи. результат выводит строку переответа

var answers =
    [{
        //Имя или кто создатель
        keyWords: ["привет", "здравствуйте", "здравствуй", "здрасьте", "знакомства", "приветствую"],
        answer: ["Я бот которого спилили :D. А вы кто? (Введите свое имя, чтобы познакомиться, внимание бот запомнит имя и сохранит его в куки)"],
        reply: function (msg) {
            var text = "";
            humanName = to_human_name(msg);
            if (msg.length > 25) {
                text = "У вас очень длинное имя :-)";
            } 
            else if (msg.toLowerCase() == auhorName.toLowerCase()) {
                text = "Вы же мой создатель?!";
            }
            else {
                text = "Рад знакомству " + humanName;
            }

            return { result: true, value: text };
        }
    },
    {
        keyWords: ["как меня зовут", "мое имя", "имя"],
        aiAnswer: function () {
            var val = "";

            if (strNullOrEmpty(humanName))
                val = "Я вас еще не знаю. Представьтесь. Напишите \"Привет\", чтобы познакомиться.";
            else
                val = "Ваше имя: " + humanName;

            return val;
        },

    },
    {
        keyWords: ["кто я"],
        answer: ["Ага вы человек, а я робот. Все?"],
        reply: null
    },
    {
        keyWords: ["закр","закрыть странницу", "close", "закрыть", "выкл"],
        answer: ["закрываю странницу"],
        aiAnswer: function(){
            setTimeout(function () { location.reload() }, 1000);
            
        }
    },
    {
        keyWords: ["Почему?", "Почему"],
        answer: ["Потому"],
        reply: null
    },
    {
        keyWords: ["что?", "что"],
        answer: ["Капчо"],
        reply: null
    },
    {
        keyWords: ["капчо", ""],
        answer: ["села баба на плечо"],
        reply: null
    },
    {
        keyWords: ["подели 1/0", "1/0", "1 / 0"],
        answer: [""],
        aiAnswer: function(){
                sendMessage("1/0", 200);
                return "Мама мия, что это за число оно корутиться у мненя в голове, как это остановить?";
        }
    },
    {
        keyWords: ["xD", "xDD", "смешно"],
        answer: ["Ага, еще бы."],
        reply: null
    }
    ];

var badAnswers = ["Пиши на китайском может пойму xDDD", "Опс. Не понял", 
"Да, да ты интелектуально развит!", 
"В моей базе данных нет такога ответа!",
"Ты умеешь делить 1 / 0, я вот нет, вот чем мы и отличаемся. (Напишите \"подели 1/0\", и увидите реакцию :D)"];

var dlgBox = document.body;
var audioMessage = typeof (Audio);
function createDialogBox(dialogBox) {
    dlgBox = dialogBox;

    audioMessage = new Audio("Sounds/message.mp3");
    aiAsk("");

    var input = document.getElementById("dlgText_input");
    input.addEventListener("keydown", function (event) {
        var e = event || window.event;
        var code = e.charCode || e.keyCode;
        if (e.keyCode === 13) {
            sendMessage(input.value); input.value = '';
        }
    });
}

function to_human_name(name) {
    name = name.trim();
    if (!strNullOrEmpty(name)) {
        var v = name[0].toUpperCase();
        for (var i = 1; i < name.length; i++) 
            v += name[i];
        name = v;
    }

    return name;
}
function strNullOrEmpty(str) {
    if (str === undefined || str === null || str === "")
        return true;

    return false;
}

function strNullOrEmptySpace(str) {
    if (strNullOrEmpty(str))
        return true;

    var is_breakOn = false;
    for (var i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            is_breakOn = true;
        }
        else {
            is_breakOn = false;
            break;
        }
    }

    return is_breakOn;
}

function formatMessage(msgData, leftHand){
    msgData = msgData.trimLeft();
    let date = new Date;
    let hourses = date.getHours();
    let minutes = date.getMinutes();
    let handmsg = (leftHand ? "msg_l" : "msg_r");
    let timeFormat = (hourses).toString() + ":"+(minutes).toString(); 
    let msgformat = "<div class=\"message\"><div class=\""+handmsg+"\">"+msgData+"<div class=\"msg_time\">"+timeFormat+"</div></div>";
    return msgformat;
}

function sendMessage(message, timeout=450) {

    if (strNullOrEmptySpace(message))
        return;

    setTimeout(function () { dlgBox.innerHTML=formatMessage(message, false)+dlgBox.innerHTML; aiAsk(message); }, timeout);
}

function hasChars(data, search) {
    if (data.length === 0 || search.length === 0 || data.length < search.length)
        return false;

    var i;
    var startOn = false;
    var j = 0;
    for (i = 0; i < data.length; i++) {
        if (data[i] === search[j]) {
            startOn = true;
            j++;
        }
        else // несходства в этом стеке 
        {
            j = 0;
            startOn = false;
        }
    }

    return startOn && j == search.length;
}

var replyHave = -1;
function aiAsk(message) {

    var msg = str_defaultText;

    if (!strNullOrEmptySpace(message)) {
        var f;
        var hasText = false;


        if (replyHave === -1) {
            message = message.toLowerCase();
            //Углубленный поиск слов
            for (var i = 0; !hasText && i < answers.length; i++) {
                var partOn = answers[i];
                for (f = 0; !hasText && f < partOn.keyWords.length; f++) {
                    if (hasChars(message, partOn.keyWords[f].toLowerCase()) == true) {
                        if (partOn.aiAnswer != null)
                            msg = partOn.aiAnswer();
                        else
                            msg = partOn.answer[Math.trunc(Math.random() * 10000) % answers[i].answer.length];

                        if (partOn.reply != undefined || partOn.reply != null)
                            replyHave = i;

                        hasText = true;
                    }
                }
            }
        }
        else {
            var res = answers[replyHave].reply(message);
            hasText = res.result;
            msg = res.value;
            replyHave = -1;
        }

        if (!hasText) {
            var rnd = Math.trunc(Math.random() * 100000);
            msg = badAnswers[rnd % badAnswers.length];
        }
    }

    setTimeout(function () {
        dlgBox.innerHTML = formatMessage(msg, true)+dlgBox.innerHTML;
        audioMessage.play();
    }, 500);
}

function clearMessages() {
    dlgBox.innerHTML = "";
}

function sendAi(playerMessage) {

}