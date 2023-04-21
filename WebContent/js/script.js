/*===========================================================*/
/*機能編 4-1-5 ロゴアウトラインアニメーション*/
/*===========================================================*/

//SVGアニメーションの描画
var stroke;
stroke = new Vivus('mask', {//アニメーションをするIDの指定
	start: 'manual',//自動再生をせずスタートをマニュアルに
	type: 'scenario-sync',// アニメーションのタイプを設定
	duration: 10,//アニメーションの時間設定。数字が小さくなるほど速い
	forceRender: false,//パスが更新された場合に再レンダリングさせない
	animTimingFunction: Vivus.EASE,//動きの加速減速設定
},
	function() {
		$("#mask").attr("class", "done");//描画が終わったらdoneというクラスを追加
	}
);

/*===========================================================*/
/*印象編 8-10 テキストがタイピング風に出現*/
/*===========================================================*/

// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
function TextTypingAnime() {
	$('.TextTyping').each(function() {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		var thisChild = "";
		if (scroll >= elemPos - windowHeight) {
			thisChild = $(this).children(); //spanタグを取得
			//spanタグの要素の１つ１つ処理を追加
			thisChild.each(function(i) {
				var time = 100;
				//時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
				$(this).delay(time * i).fadeIn(time);
			});
		} else {
			thisChild = $(this).children();
			thisChild.each(function() {
				$(this).stop(); //delay処理を止める
				$(this).css("display", "none"); //spanタグ非表示
			});
		}
	});
}



/*==================================================
/*印象編 6-3 スクロールすると画面分割した左右がそれぞれ動く*/
/*===================================*/

$('#wrapper').multiscroll({
	sectionsColor: ['#0f7fa7', '#0f7fa7', '#0f7fa7', '#0f7fa7'],//セクションごとの背景色設定
	anchors: ['area1', 'area2', 'area3', 'area4'],//セクションとリンクするページ内アンカーになる名前
	menu: '#menu',//上部ナビゲーションのメニュー設定
	navigation: true,//右のナビゲーション出現、非表示は false
	//navigationTooltips:['Area1', 'Area2', 'Area3','Area4','Area5'],//右のナビゲーション現在地時に入るテキスト
	//loopTop: true,//最初のセクションを上にスクロールして最後のセクションまでスクロールするかどうかを定義します。
	loopBottom: true,//最後のセクションを下にスクロールして最初のセクションまでスクロールするかどうかを定義します。
	//※以下は今回のプラグインの組み合わせのみで使用。ページの途中でリロードしてもトップのタイピング出現
	afterLoad: function(anchorLink, index) {
		if (index == 1) {
			TextTypingAnime();
		}
	}


});

//JavaScriptでも色が設定できる、配列、


/*==================================================
/*関数をまとめる*/
/*===================================*/

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function() {
	TextTypingAnime();//印象編 8-10テキストがタイピング風に出現する関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述


// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function() {
	TextTypingAnime();

	//機能編 4-1-5 ロゴアウトラインアニメーション
	$("#splash_logo").delay(0).fadeOut('slow');//ロゴを3秒（3000ms）待機してからフェードアウト

	stroke.play();//SVGアニメーションの実行

	//=====ここからローディングエリア（splashエリア）をフェードアウトした後に動かしたいJSをまとめる    
	$("#splash").delay(0).fadeOut(800, function() {//ローディング画面を3秒待機してからフェードアウト

		$('body').addClass('appear');//フェードアウト後bodyにappearクラス付与 

		//印象編 8-10テキストがタイピング風に出現
		var element = $(".TextTyping");
		element.each(function() {
			var text = $(this).html();
			var textbox = "";
			text.split('').forEach(function(t) {
				if (t !== " ") {
					textbox += '<span>' + t + '</span>';
				} else {
					textbox += t;
				}
			});
			$(this).html(textbox);
		});
		TextTypingAnime();/* アニメーション用の関数を呼ぶ*/

	}); //=====ここまでローディングエリア（splashエリア）を3秒でフェードアウトした後に動かしたいJSをまとめる

});// ここまでページが読み込まれたらすぐに動かしたい場合の記述


//0秒にした
//雪を降らせる、ロード画面、消去した（あとで理解しておく）