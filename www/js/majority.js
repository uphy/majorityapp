/*
 * 多数決アプリの設定 
 */
// 多数決を行うユーザ。借りにA,B,C...さんとする。
var userNames = [];
for(var i = 0; i < 3; i++){
	userNames[i] = String.fromCharCode("A".charCodeAt(0) + i) + "さん";
}
// 選択候補(以降、オプション)
var options = ["optionA","optionB","optionC"];

/*
 * DOMの読み込みが終わった時に呼び出されます。
 */
window.onload = function(){
	/*
     * 画面構築を行います。 
	 * answersTableに、ユーザとそのユーザのオプションの組を追加します。
     */
	var answersTable = document.getElementById("answersTable");
	var runButton = document.getElementById("runButton");
	for(var i in userNames){
		var tr = document.createElement("tr");
		var userName = document.createElement("td");
		userName.innerText = userNames[i];
		var answerSelect = document.createElement("select");
		answerSelect.className = "answerSelect";
		for(var j in options){
			var option = document.createElement("option");
			option.innerText = options[j];
			answerSelect.appendChild(option);
		}
		tr.appendChild(userName);
		tr.appendChild(answerSelect);
		answersTable.appendChild(tr);
	}

	/*
	 * Runボタンがクリックされたときに呼び出されます。
	 */
	runButton.onclick = function(){
		var selectedOptions = document.getElementsByClassName("answerSelect");
		var optionToIndex = {};
		var counts = [];
		for(var i in options){
			optionToIndex[options[i]] = i;
			counts.push(0);
		}
		/*
		 * 各オプションの数を集計。
		 */
		for(var i = 0; i < selectedOptions.length; i++){
			var option = selectedOptions.item(i).value;
			var optionIndex = optionToIndex[option];
			counts[optionIndex]++;
		}
		/*
		 * 最も多く選択されたオプションを探す。
		 */
		var max = 0;
		var maxIndex = -1;
		// 複数オプションが最大値であり、結果が判定できない場合true、できる場合はfalse
		var multipleMax = false;
		for(var i in counts){
			if(counts[i] == max){
				multipleMax = true;
			} else if(counts[i] > max){
				maxIndex = i;
				max = counts[i];
				multipleMax = false;
			}
		}
		/* 
		 * 結果出力 
		 */
		var result = document.getElementById("result");
		result.innerHTML = multipleMax ? "Unable to determine." : options[maxIndex];
	}
}