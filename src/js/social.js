jQuery(function () {
  // social
  jQuery('.social__slider__item').on('click', function () {
    var n = jQuery('.social__slider__item').index(this) + 1;
    jQuery('.social__modal').attr('data-social-modal', n);
  });
  jQuery('.social__slider__arrow').on('click', function () {
    var n = jQuery('.social__slider__list').scrollLeft();
    if (jQuery(this).hasClass('-prev')) {
      n -= jQuery('.social__slider__item').outerWidth() + 20;
    } else if (jQuery(this).hasClass('-next')) {
      n += jQuery('.social__slider__item').outerWidth() + 20;
    }
    jQuery('.social__slider__list').animate({
      'scrollLeft': n
    }, 100)
  });
  jQuery('.social__modal__close, .social__modal__bg').on('click', function () {
    jQuery('.social__modal').attr('data-social-modal', false);
  });
  jQuery('.social__modal__arrow').on('click', function () {
    var n = jQuery('.social__modal').attr('data-social-modal') - 0;
    if (jQuery(this).hasClass('-prev')) {
      n--;
      if (n < 1) {
        n = jQuery('.social__modal__item').length;
      }
    } else if (jQuery(this).hasClass('-next')) {
      n++;
      if (n > jQuery('.social__modal__item').length) {
        n = 1;
      }
    }
    jQuery('.social__modal').attr('data-social-modal', n);
  });

  var _social = {
    "slider": [{
        "txt": "ずっと気になってた<br>#リファファインバブル ピュアを我が家に！"
      },
      {
        "txt": "目的に合わせた4つの水流が切り替えられるようになっていて使っていて楽しい。<br>特に洗顔の時に柔らかくふわりとしたミストモードを使用するのが好きです！"
      },
      {
        "txt": "＼ついに我が家にやってきた／<br>ReFa ファインバブル ピュア&#x1f9fc;"
      },
      {
        "txt": "最近QOLが爆上がりしたアイテム。<br>ReFa FINE BUBBLE PURE&#x1f6bf;"
      },
      {
        "txt": "水の質にこだわってみたいなと思い、ReFaのファインバブル ピュアを使い始めました&#x1f6bf;"
      }
    ],
    "modal": [{
        "txt": "ずっと気になってた<br>#リファファインバブル ピュアを我が家に！<br><br>ミスト•ジェット•ストレート•ピュアストレートの４つの水流が選べて、水中の塩素を低減ができるシャワーヘッド&#x1f6bf;<br>お肌や髪に潤いを与えてくれる効果と節水効果もあって美容にもお財布にも嬉しい&#9673;<br><br>何気なく浴びてるシャワーのお水にこだわることでちょっとでも綺麗になれるとお得だな&#9825;と。<br>家族や大切なお友達のお誕生日にプレゼントしたいなと思いました&#x1f60c;<br><br>#ReFa #リファ #ReFaタイム<br>#リファファインバブル ピュア<br>#リファシャワーヘッド"
      },
      {
        "txt": "目的に合わせた4つの水流が切り替えられるようになっていて使っていて楽しい。<br>特に洗顔の時に柔らかくふわりとしたミストモードを使用するのが好きです！<br><br>#ReFa #リファ #ReFaタイム<br>#リファファインバブル ピュア<br>#リファシャワーヘッド"
      },
      {
        "txt": "＼ついに我が家にやってきた／<br>ReFa ファインバブル ピュア&#x1f9fc;<br><br>ワンオペ風呂の時ってほんとドタバタだよね&#x1f62d;<br>正直何がすごいのかよく分かってなかったけど、使ってみたらもう手放せないって思ったくらい&#x2728;<br>忙しい人には時短で綺麗になれるって思うと<br>コスパいいと思う<br>Movieも載せてるので是非見てみてね&#x1f97a;<br><br>#ReFa #リファ #ReFaタイム<br>#リファファインバブル ピュア<br>#リファシャワーヘッド"
      },
      {
        "txt": "最近QOLが爆上がりしたアイテム。<br>ReFa FINE BUBBLE PURE&#x1f6bf;<br><br>ジェットでシャンプー前に頭皮を洗うと、水圧ですっきり気持ちいいのと、シャンプーの泡立ちがいつもと全然違う！！<br>いつもスタイリング剤とかをつけてるのと、頭皮の汚れで、泡立ちが悪いんだなーと思った&#x1f4a6;<br>ストレートでシャンプーを洗い流すと、トリートメント前にも関わらず、髪の毛が潤っているのが実感できる！<br><br>そして、ミストで顔を洗うと、霧のような細かさがとっても心地よくて、ふんわりと包み込んでくれるようで、とっても気持ちいいので、ぜひ体感してほしい&#x2728;<br><br>あとは、浴槽もこのReFaで入れると、滑らかな肌触りのシルキーバスに&#x1f6c0;<br>身体がいつもより温まるので、おススメです。<br><br>#ReFa #リファ #ReFaタイム#リファファインバブル ピュア<br>#リファシャワーヘッド #まるでエステ<br>#美容シャワー #素肌 #取り付け簡単"
      },
      {
        "txt": "水の質にこだわってみたいなと思い、ReFaのファインバブル ピュアを使い始めました&#x1f6bf;<br><br>「塩素がなるべくないお水を使った方がいいですよ&#129489;」と美容に詳しい先生に言われ、最近は精製水をスキンケアに取り入れ始めたりもしているのですが、このReFaのファインバブル ピュアも塩素除去を叶えるアイテム。<br><br>付け替えはとても簡単&#9678;<br>ミスト、ジェット、ピュアストレート、ストレートの4つの切り替えができ、洗う場所によって変えています&#x1f6bf;<br><br>それにこのシャワーヘッドに変えてからドライヤー後の髪のまとまりがとてもいい&#x1f633;<br>髪に水分保有してます、と思うような感じになり翌朝起きたときのスタイリングも楽になった感じ！​<br><br>ミストモードを顔や全身に浴びるのも気持ちよくて好き…&#x1f6bf;まるで絹のような肌あたりのシャワーに贅沢さを感じます。<br><br>#ReFa #リファ #ReFaタイム<br>#リファファインバブル ピュア<br>#リファシャワーヘッド #まるでエステ<br>#美容シャワー #素肌 #取り付け簡単"
      }
    ]
  }

  jQuery('.social__slider__item').each(function (i) {
    jQuery('.txt', this).html(_social.slider[i].txt);
  });
  jQuery('.social__modal__txt').each(function (i) {
    jQuery('.txt', this).html(_social.modal[i].txt);
  });
});