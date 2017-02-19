/**
 * Created by МАКС on 08.01.2017.
 */
"use strict";

const HIDE = "none";
const SHOW = "block";

class IGUnit {

    constructor(){
        this.type = 0;
        this.color = 0;
        this.height = 0;
        this.width = 0;
        this.winNum = 0;
        this.wins = [];
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        this.width = width;
    }

    getWinNum() {
        return this.winNum;
    }

    setWinNum(winNum) {
        this.winNum = winNum;
    }

    getWins() {
        return this.windows;
    }

    setWins(wins) {
        this.wins = wins;
    }
}

class Calculator {
    constructor(form){
        this.DOMElements = form;
        for (var key in this.DOMElements) {
            this.DOMElements[key] = document.getElementById(this.DOMElements[key]);
        }
        this.iGUnit = new IGUnit();
    }

    showHideElements(elements, status) {
        return elements.forEach(function (item) {
            item.style.display = status;
        })
    }

    showWindow1(){
        this.showHideElements([this.DOMElements.picture2, this.DOMElements.picture3, this.DOMElements.choice2,
            this.DOMElements.choice3], HIDE);
        this.showHideElements([this.DOMElements.picture1, this.DOMElements.choice1], SHOW);
        this.DOMElements.choice2.value = 0;
        this.DOMElements.choice3.value = 0;
        this.iGUnit.setWinNum(1);
    }

    showWindow2(){
        this.showHideElements([this.DOMElements.picture1, this.DOMElements.picture3, this.DOMElements.choice3], HIDE);
        this.showHideElements([this.DOMElements.picture2, this.DOMElements.choice1, this.DOMElements.choice2], SHOW);
        this.DOMElements.choice3.value = 0;
        this.iGUnit.setWinNum(2);
    }

    showWindow3(){
        this.showHideElements([this.DOMElements.picture2, this.DOMElements.picture1], HIDE);
        this.showHideElements([this.DOMElements.picture3, this.DOMElements.choice1, this.DOMElements.choice2,
            this.DOMElements.choice3], SHOW);
        this.iGUnit.setWinNum(3);
    }

    changeColor() {
        this.iGUnit.setColor(this.DOMElements.windowColor.value);
        if (this.iGUnit.getColor() == 3){
            this.showHideElements([this.DOMElements.yourColor], SHOW);
        } else {
            this.showHideElements([this.DOMElements.yourColor], HIDE);
        }
    }

    changeType() {
        this.iGUnit.setType(this.DOMElements.igunitType.value);
    }

    validate() {
        if (this.DOMElements.inputHeight.value
            && this.DOMElements.inputWidth.value
            && this.DOMElements.igunitType.value
            && this.DOMElements.windowColor.value) {
            this.showHideElements([this.DOMElements.errorMsg], HIDE);
            this.checkRotation();
        } else {
            this.showHideElements([this.DOMElements.errorMsg], SHOW);
        }
    };

    checkRotation() {
        this.iGUnit.wins = [];
        let elements = document.getElementsByName("rot");
        for(let i = 0; i < elements.length; i++){
            this.iGUnit.wins.push(elements[i].value);
        }
        this.printResult();
    }

    changeHeight() {
        this.iGUnit.setHeight(this.DOMElements.inputHeight.value);
    }

    changeWidth() {
        this.iGUnit.setWidth(this.DOMElements.inputWidth.value);
    }

    showPrice() {
        let result = 0;
        let sum = 0;
        if (this.iGUnit.getType() == 1){
            result = 100;
            this.iGUnit.getColor() == 2 ? result *= 1.2 : (this.iGUnit.getColor() == 3 ? result *= 1.4 : result *= 1);
            this.iGUnit.wins.forEach(function(item) {
                if(item == 2){
                    sum += result * 2;
                } else if(item == 1){
                    sum += result;
                }
            });
            result = sum;
        } else {
            result = 150;
            this.iGUnit.getColor() == 2 ? result *= 1.3 : (this.iGUnit.getColor() == 3 ? result *= 1.5 : result *= 1);
            this.iGUnit.wins.forEach(function(item) {
                if(item == 2){
                    sum += result * 2.2;
                } else if(item == 1){
                    sum += result;
                }
            });
            result = sum;
        }
        console.log(result);
        return result.toFixed(2);
    }

    printResult(){
        this.DOMElements.result.innerHTML = `Цена: ${this.showPrice()}$. <br>
        Размер одной створки: ${(this.iGUnit.getHeight())*10}мм * ${((this.iGUnit.getWidth()/this.iGUnit.getWinNum()).toFixed(1))*10}мм.`;
    }

    cleanForm(){
        this.showHideElements([this.DOMElements.picture1, this.DOMElements.picture2, this.DOMElements.picture3,
            this.DOMElements.choice2, this.DOMElements.choice2, this.DOMElements.choice3, this.DOMElements.yourColor], HIDE);
        this.DOMElements.inputHeight.value = "";
        this.DOMElements.inputWidth.value = "";
        this.DOMElements.changeColor.value = "";
    }

    initListeners(){
        this.DOMElements.btn.addEventListener("click", () => this.validate());
        this.DOMElements.view1.addEventListener("click", () => this.showWindow1());
        this.DOMElements.view2.addEventListener("click", () => this.showWindow2());
        this.DOMElements.view3.addEventListener("click", () => this.showWindow3());
        this.DOMElements.windowColor.addEventListener("change", () => this.changeColor());
        this.DOMElements.igunitType.addEventListener("change", () => this.changeType());
        this.DOMElements.inputHeight.addEventListener("change", () => this.changeHeight());
        this.DOMElements.inputWidth.addEventListener("change", () => this.changeWidth());
    }

    init(){
        this.cleanForm();
        this.initListeners();
    }
}

let calculator = new Calculator({
        yourColor: "yourColor", //див для добавления своего цвета
        changeColor: "changeColor",//поле ввода цвета
        btn: "btn",//кнопка рассчитать
        result: "result",//контейнер для вывода результата
        inputHeight: "inputHeight",//высота окна
        inputWidth: "inputWidth",//ширина окна
        view1: "view1",//первая кнопка радио
        view2: "view2",//вторая кнопка радио
        view3: "view3",//третья кнопка радио
        picture1: "picture1",//основная картинка одинарного окна
        picture2: "picture2",//основная картинка двойного окна
        picture3: "picture3",//основная картинка тройного окна
        rotation: "rotation",//форма с селектами для выбора глухое-поворотное
        choice1: "choice1",//селектбокс под первым окном
        choice2: "choice2",//селектбокс под вторым окном
        choice3: "choice3",//селектбокс под третьим окном
        igunitType: "igunitType",//селектбокс выбор типа стеклопакета
        windowColor: "windowColor",//селектбокс выбор цвета окна
        errorMsg: "error"//сообщение об ошибке
    }
);

calculator.init();

