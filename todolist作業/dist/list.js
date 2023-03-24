//text
const text = document.querySelector(".card.input").querySelector("INPUT");
//btn
const btn = document.querySelector(".card.input").querySelector(".btn_add");
//ul_list
const ul_list = document.querySelector(".cart_content").querySelector(".list");
//tab
const tab = document.querySelector(".tab");
//list_foot_num
const list_foot_num = document.querySelector(".tab");


let data = [
    {
        context: "把冰箱發霉的檸檬拿去丟",
        completed: false
    },
    {
        context: "把冰箱發霉的檸檬拿去丟",
        completed: false
    },
    {
        context: "把冰箱發霉的檸檬拿去丟",
        completed: false
    }
];
// console.log(data);
// 點選+新增的按鈕，會跑到待完成，
// 然後未完成和已完成的差異在，已完成會打勾，未完成不會打勾

//初始化
renderData(data);

//新增資料的功能
btn.addEventListener("click", e => {
    if (text.value == "") {
        alert("請輸入內容");
        return;
    }

    let obj = {};
    obj.context = text.value;
    obj.completed = false;
    data.push(obj);

    renderData(data);
    text.value = "";
})


// tab的監聽器
//className
tab.addEventListener("click", e => {

    //當點到全部->把已打勾和未打勾都丟出來
    //待完成->把未打勾的丟出來
    //已完成->把已打勾的顯示出來

    //全部-> lI null->把已打勾和未打勾都顯示出來
    //待完成 -> li-> null ->把未打勾的丟出來
    //已完成-> li ->null ->把已打勾的顯示出來
    if (e.target.textContent == "全部") {


        if (e.target.getAttribute("class") == 'active') {
            //預設
            return;
        } else {
            let tab_li = tab.querySelectorAll("LI");
            tab_li.forEach((item, index) => {
                item.removeAttribute("class");
            })

            e.target.setAttribute('class', 'active');

            let newList = [];
            data.forEach((item, index) => {

                if (true) {
                    newList.push(item);
                }
            })
            renderData(newList);

        }
    } else if (e.target.textContent == "待完成") {
        if (e.target.getAttribute("class") == null) {
            let tab_li = tab.querySelectorAll("LI");
            tab_li.forEach((item, index) => {
                item.removeAttribute("class");
            })
            e.target.setAttribute('class', 'active');

            let newList = [];
            data.forEach((item, index) => {

                if (item.completed == false) {
                    newList.push(item);
                }
            })
            renderData(newList);
        }

    } else if (e.target.textContent == "已完成") {

        if (e.target.getAttribute("class") == null) {

            let tab_li = tab.querySelectorAll("LI");

            tab_li.forEach((item, index) => {
                item.removeAttribute("class");
            })
            e.target.setAttribute('class', 'active');

            let newList = [];

            data.forEach((item, index) => {
                if (item.completed == true) {
                    newList.push(item);
                }
            })
            renderData(newList);
        }
    }
})



//ul_list的監聽器
ul_list.addEventListener("click", e => {

    //黃色勾勾的判斷
    //checkBox被勾起來，改變data的completed
    if ((e.target.nodeName == "INPUT") && (e.target.checked == true)) {
        let dataNum = parseInt(e.target.getAttribute(["data-num"]));
        data.forEach((item, index) => {
            if (dataNum == index) {
                item.completed = true;
            }
        })
        //checkBox被拿掉勾勾起來，改變data的completed
    } else if ((e.target.nodeName == "INPUT") && (e.target.checked == false)) {
        let dataNum = parseInt(e.target.getAttribute(["data-num"]));
        data.forEach((item, index) => {
            if (dataNum == index) {
                item.completed = false;
            }
        })
    }


    //黑色叉叉的判斷
    if (e.target.nodeName == "A") {
        let a_num = parseInt(e.target.getAttribute("data-num"));
        debugger;
        let list_input = ul_list.querySelectorAll("input");
        console.log(list_input);


        data.forEach((item, index) => {
            if (index == a_num) {
                let is_data = item.completed;
                if (is_data == true) {
                    data.splice(index, 1);
                    return;
                } else if (is_data == false) {
                    alert('你沒有點黃色勾勾');
                }
            }
        })
        renderData();
    }
})


//初始化用的方法
function renderData(dataArr) {
    let str = "";

    dataArr.forEach((item, index) => {
        str += `<li><label class="checkbox" for="">
                <input type="checkbox" data-num =${index} ${item.completed ? 'checked' : ''}/>
                <span>${item.context}</span>
                </label>
                <a href="#" class="delete" data-num =${index}></a></li>`;
    })
    ul_list.innerHTML = str;
}


