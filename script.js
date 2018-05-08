$(function () {
	//bodyの直下にこの拡張用のHTMLを生成する処理
	$("body").prepend("<div id='seo_replace_str'></div>");
	stylesheet = chrome.extension.getURL('style.css');
	sethtml0 = '<link rel="stylesheet" href="' + stylesheet + '" type="text/css">';
	sethtml1 = '<label>匿名でつぶやく　<input type="text" id="tweet"></label>　　';
	sethtml2 = '<input type="button" value="つぶやく" id="post"> '
		$("#seo_replace_str").html(sethtml0 + sethtml1 + sethtml2);

	//メインの処理 置換ボタンを押すと処理がスタートします
	$("#post").click(function () {
		if ($('#tweet').val() == "") {
			//検索文字列が空の場合は何もしない
		} else {

			var xhr = new XMLHttpRequest();

			// ハンドラの登録.
			xhr.onreadystatechange = function () {
				switch (xhr.readyState) {
				case 0:
					// 未初期化状態.
					console.log('uninitialized!');
					break;
				case 1: // データ送信中.
					console.log('loading...');
					break;
				case 2: // 応答待ち.
					console.log('loaded.');
					break;
				case 3: // データ受信中.
					console.log('interactive... ' + xhr.responseText.length + ' bytes.');
					break;
				case 4: // データ受信完了.
					if (xhr.status == 200 || xhr.status == 304) {
						var data = xhr.responseText; // responseXML もあり
						console.log('COMPLETE! :' + data);
					} else {
						console.log('Failed. HttpStatus: ' + xhr.statusText);
					}
					break;
				}
			};

			xhr.open('POST', 'http://xxx.xxx.xxx.com', false);
			// POST 送信の場合は Content-Type は固定.
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			//
			var message = $('#tweet').val()
				xhr.send(`payload={"username": "anonymous","text": "${message}"}`);
			xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい.


		}
	});
});
