/*
	Buffer Set: 
	Address: 8
	tag: 3
	offset: 5
	data: 8
	counter: 3
*/
const address = 8
const tag = 3
const offset = 5
const counter = 3
const data = 8

const datafre = 2400
const transition = 500

const sendernum = 18
const location1num = 17
var mask1 = new Array(sendernum)
var location1 = new Array(location1num)

var RU = "0123"
var datanum = 0

var state = ["1   000", "1   000", "1   000", "1   000"]
var buffer = [["             ", "             ", "             ", "             "], 
			["             ", "             ", "             ", "             "], 
			["             ", "             ", "             ", "             "], 
			["             ", "             ", "             ", "             "]]

//=================================================================//
// 获取元素的绝对位置坐标（像对于页面左上角）
function getElementPagePositionX(element){
  //计算x坐标
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null){
    actualLeft += (current.offsetLeft+current.clientLeft);
    current = current.offsetParent;
  }
  //返回结果
  return actualLeft
}

function getElementPagePositionY(element){
  //计算y坐标
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null){
    actualTop += (current.offsetTop+current.clientTop);
    current = current.offsetParent;
  }
  //返回结果
  return actualTop
}

//=================================================================//
function TagIn(obj) {
	console.log("TagIn")
	let a = document.getElementsByClassName("TagArea")[1]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = getElementPagePositionX(a) + "px"
}

function OffsetIn(obj) {
	console.log("OffsetIn")
	let a = document.getElementsByClassName("OffsetArea")[1]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = getElementPagePositionX(a) + "px"
}

function DataIn(obj) {
	console.log("DataIn")
	let a = document.getElementsByClassName("DataArea")[1]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = getElementPagePositionX(a) + "px"
}

function SetValidBit(obj, data) {
	console.log("SetValidBit")
	obj.children[0].innerHTML = data
}

function SetCounter(obj, data) {
	console.log("SetCounter")
	obj.children[0].innerHTML = data[0]
	obj.children[1].innerHTML = data[1]
	obj.children[2].innerHTML = data[2]
}

function TagToChooser(obj, num) {
	console.log("TagToChooser")
	let a = document.getElementsByClassName("TagArea")[2+num]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = getElementPagePositionX(a) + "px"
}

function OffsetToBuffer(obj, num1, num2) {
	console.log("OffsetToBuffer")
	let a = document.getElementsByClassName("OffsetArea")[2+num1*4+num2]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = getElementPagePositionX(a) + "px"
}

function DataToBuffer(obj, num1, num2) {
	console.log("DataToBuffer")
	let a = document.getElementsByClassName("DataArea")[2+num1*4+num2]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = getElementPagePositionX(a) + "px"
}

function ObjectOut(obj) {
	console.log("ObjectOut")
	obj.style.left = (getElementPagePositionX(obj)+document.body.clientWidth) + "px"
}

function TagReset(obj) {
	console.log("TagReset")
	obj.children[0].innerHTML = ' '
	obj.children[1].innerHTML = ' '
	obj.children[2].innerHTML = ' '
	let a = document.getElementsByClassName("TagArea")[1]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = (getElementPagePositionX(a)-100-
		getElementPagePositionX(document.getElementsByClassName("DataArea")[1].children[0])) + "px"
}

function DataReset(obj) {
	console.log("DataReset")
	obj.children[0].innerHTML = '        '
	let a = document.getElementsByClassName("DataArea")[1]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = "-100px"
}

function OffsetReset(obj) {
	console.log("OffsetReset")
	obj.children[0].innerHTML = ' '
	obj.children[1].innerHTML = ' '
	obj.children[2].innerHTML = ' '
	obj.children[3].innerHTML = ' '
	obj.children[4].innerHTML = ' '
	let a = document.getElementsByClassName("OffsetArea")[1]
	a = a.children[0]
	
	obj.style.top = getElementPagePositionY(a) + "px"
	obj.style.left = (getElementPagePositionX(a)-100-
		getElementPagePositionX(document.getElementsByClassName("DataArea")[1].children[0])) + "px"
}

//=================================================================//

function GetValidSender() {
	let i
	for (i = 0; i < sendernum; i++) {
		if (mask1[i] != 1)
			return i;
	}
	console.log("No Valid Sender")
	return -1;
}

function FreeSender(loc) {
	if (loc >= 0 && loc < location1num) {
		if (location1[loc] == -1) {
			console.log("No Sender!")
		}
		else {
			mask1[loc] = 0;
			location1[loc] = -1;
		}
		return;
	}
	console.log("Wrong location1!")
}

//=================================================================//

function GetNextNumber_3Bit(str) {
	if (str == "000") 
		return "001"
	else if (str == "001") 
		return "010"
	else if (str == "010") 
		return "011"
	else if (str == "011") 
		return "100"
	else if (str == "100") 
		return "101"
	else if (str == "101") 
		return "110"
	else if (str == "110") 
		return "111"
	else if (str == "111") 
		return "000"
}

function decoder_3Bit(str) {
	if (str == "000") 
		return 0
	else if (str == "001") 
		return 1
	else if (str == "010") 
		return 2
	else if (str == "011") 
		return 3
	else if (str == "100") 
		return 4
	else if (str == "101") 
		return 5
	else if (str == "110") 
		return 6
	else if (str == "111") 
		return 7
}

function GetRandomBinary(length){
	let x = "01"
	let str = '', i = 0
	for(i = 0; i < length; i++) {
		str += x[parseInt(Math.random()*x.length)]
	}
	return str
}


function InputData() {
	str = GetRandomBinary(address+data)
	let i = 0, j = state.length, k = 0, l = 0;

	datanum += 1
	console.log("data:", datanum, str)

	const unuse = 1
	sendertag = document.getElementsByClassName("TagArea2")
	senderoffset = document.getElementsByClassName("OffsetArea2")
	senderdata = document.getElementsByClassName("DataArea2")
	vaset = document.getElementsByClassName("ValidArea")
	coset = document.getElementsByClassName("CounterArea")

	for(i = 0; i < state.length; i++) {
		if (j == state.length && state[i][0] == '1') {
			j = i;
		}
		if (str.substring(0, 3) == state[i].substring(1, 4)) 
			break;
	}

	if (i < state.length) {
		// have found
		if (state[i].substring(4, 7) != '100') {
			// put it in
			l = decoder_3Bit(state[i].substring(4, 7))
			buffer[i][l] = str.substring(3, 16)
			state[i] = state[i].substring(0, 4) + GetNextNumber_3Bit(state[i].substring(4, 7))
			k = RU.indexOf(toString(i))
			RU = i + RU.substring(0, k) + RU.substring(k+1, 4)

			k = GetValidSender()
			sendertag[k].children[0].innerHTML = str[0]
			sendertag[k].children[1].innerHTML = str[1]
			sendertag[k].children[2].innerHTML = str[2]
			senderoffset[k].children[0].innerHTML = str[3]
			senderoffset[k].children[1].innerHTML = str[4]
			senderoffset[k].children[2].innerHTML = str[5]
			senderoffset[k].children[3].innerHTML = str[6]
			senderoffset[k].children[4].innerHTML = str[7]
			senderdata[k].children[0].innerHTML = str.substring(8, 16)
			mask1[k] = 1
			location1[4*i+l] = k

			setTimeout(function(){
				TagIn(sendertag[k]); 
				OffsetIn(senderoffset[k]); 
				DataIn(senderdata[k]); 
			}, transition)
			setTimeout(function(){
				TagToChooser(sendertag[k], i);
			}, transition*2)
			setTimeout(function(){
				TagReset(sendertag[k]); 
				OffsetToBuffer(senderoffset[k], i, l); 
				DataToBuffer(senderdata[k], i, l);
			}, transition*3)
			setTimeout(function(){
				SetCounter(coset[i+unuse], state[i].substring(4, 7));
			}, transition*4)
		}
		else {
			// clear first
			k = RU.indexOf(toString(i))
			RU = i + RU.substring(0, k) + RU.substring(k+1, 4)
			buffer[i][0] = str.substring(3, 16)
			state[i] = state[i].substring(0, 4) + "001"
			for(k = 1; k < 4; k++) {
				buffer[i][k] = "             "
			}

			k = GetValidSender()
			sendertag[k].children[0].innerHTML = str[0]
			sendertag[k].children[1].innerHTML = str[1]
			sendertag[k].children[2].innerHTML = str[2]
			senderoffset[k].children[0].innerHTML = str[3]
			senderoffset[k].children[1].innerHTML = str[4]
			senderoffset[k].children[2].innerHTML = str[5]
			senderoffset[k].children[3].innerHTML = str[6]
			senderoffset[k].children[4].innerHTML = str[7]
			senderdata[k].children[0].innerHTML = str.substring(8, 16)
			setTimeout(function(){
				TagIn(sendertag[k]); 
				OffsetIn(senderoffset[k]); 
				DataIn(senderdata[k]); 
			}, transition)
			setTimeout(function(){
				TagToChooser(sendertag[k], i);
			}, transition*2)
			setTimeout(function(){
				ObjectOut(sendertag[location1[4*i]])
				for(l = 0; l < 4; l++) {
					ObjectOut(senderoffset[location1[i*4+l]])
					ObjectOut(senderdata[location1[i*4+l]])
				}
			}, transition*3)
			setTimeout(function(){
				OffsetToBuffer(senderoffset[k], i, 0); 
				DataToBuffer(senderdata[k], i, 0);
				SetCounter(coset[i+unuse], state[i].substring(4, 7));
				TagReset(sendertag[location1[4*i]])
				for(l = 0; l < 4; l++) {
					OffsetReset(senderoffset[location1[i*4+l]])
					DataReset(senderdata[location1[i*4+l]])
					mask1[location1[4*i+l]] = 0
					location1[4*i+l] = -1
				}
				mask1[k] = 1
				location1[4*i] = k
			}, transition*4)

		}
	}
	else {
		if (j < state.length) {
			// get a valid line
			k = RU.indexOf(toString(j))
			RU = j + RU.substring(0, k) + RU.substring(k+1, 4)
			state[j] = "0"+str.substring(0, 3)+"001"
			buffer[j][0] = str.substring(3, 16)

			k = GetValidSender()
			sendertag[k].children[0].innerHTML = str[0]
			sendertag[k].children[1].innerHTML = str[1]
			sendertag[k].children[2].innerHTML = str[2]
			senderoffset[k].children[0].innerHTML = str[3]
			senderoffset[k].children[1].innerHTML = str[4]
			senderoffset[k].children[2].innerHTML = str[5]
			senderoffset[k].children[3].innerHTML = str[6]
			senderoffset[k].children[4].innerHTML = str[7]
			senderdata[k].children[0].innerHTML = str.substring(8, 16)
			mask1[k] = 1
			location1[4*j] = k
			setTimeout(function(){
				TagIn(sendertag[k]); 
				OffsetIn(senderoffset[k]); 
				DataIn(senderdata[k]); 
			}, transition)
			setTimeout(function(){
				TagToChooser(sendertag[k], j);
				SetValidBit(vaset[j+unuse], "0")
			}, transition*2)
			setTimeout(function(){
				OffsetToBuffer(senderoffset[k], j, 0); 
				DataToBuffer(senderdata[k], j, 0);
			}, transition*3)
			setTimeout(function(){
				SetCounter(coset[j+unuse], "001");
			}, transition*4)
		}
		else {
			// LRU
			i = Number(RU[3])
			RU = i + RU.substring(0, 3)
			l = decoder_3Bit(state[i].substring(4, 7))
			for(k = 1; k < l; k++) {
				buffer[i][k] = "             "
			}
			state[i] = "0"+str.substring(0, 3)+"001"
			buffer[i][0] = str.substring(3, 16)

			k = GetValidSender()
			sendertag[k].children[0].innerHTML = str[0]
			sendertag[k].children[1].innerHTML = str[1]
			sendertag[k].children[2].innerHTML = str[2]
			senderoffset[k].children[0].innerHTML = str[3]
			senderoffset[k].children[1].innerHTML = str[4]
			senderoffset[k].children[2].innerHTML = str[5]
			senderoffset[k].children[3].innerHTML = str[6]
			senderoffset[k].children[4].innerHTML = str[7]
			senderdata[k].children[0].innerHTML = str.substring(8, 16)
			setTimeout(function(){
				TagIn(sendertag[k]); 
				OffsetIn(senderoffset[k]); 
				DataIn(senderdata[k]); 
			}, transition)
			setTimeout(function(){
				TagToChooser(sendertag[k], i);
				ObjectOut(sendertag[location1[4*i]])
			}, transition*2)
			setTimeout(function(){
				for(j = 0; j < l; j++) {
					ObjectOut(senderoffset[location1[i*4+j]])
					ObjectOut(senderdata[location1[i*4+j]])
				}
			}, transition*3)
			setTimeout(function(){
				OffsetToBuffer(senderoffset[k], i, 0); 
				DataToBuffer(senderdata[k], i, 0);
				SetCounter(coset[i+unuse], "001");
				TagReset(sendertag[location1[4*i]])
				for(j = 0; j < l; j++) {
					OffsetReset(senderoffset[location1[i*4+j]])
					DataReset(senderdata[location1[i*4+j]])
				}
				for(j = 0; j < l; j++) {
					mask1[location1[4*i+j]] = 0
					location1[4*i+j] = -1
				}
				mask1[k] = 1
				location1[4*i] = k
			}, transition*4)

		}
	}

}

function LoadFunction() {
	let va = document.getElementsByClassName("ValidArea");
	let i = 1;
	for(i = 1; i < va.length; i++) {
		va[i].children[0].innerHTML = '1'
	}
	let vc = document.getElementsByClassName("CounterArea");
	for(i = 1; i < vc.length; i++) {
		vc[i].children[0].innerHTML = '0'
		vc[i].children[1].innerHTML = '0'
		vc[i].children[2].innerHTML = '0'
	}
	let sendertag = document.getElementsByClassName("TagArea2")
	let senderoffset = document.getElementsByClassName("OffsetArea2")
	let senderdata = document.getElementsByClassName("DataArea2")
	for (i = 0; i < sendernum; i++) {
		TagReset(sendertag[i])
		OffsetReset(senderoffset[i])
		DataReset(senderdata[i])
	}
	setInterval(InputData, datafre)
}