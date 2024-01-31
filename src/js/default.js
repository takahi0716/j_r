jQuery(function () {
	var clickEventType = ((window.ontouchstart !== null) ? 'click' : 'touchend');
	var $document = jQuery(document);
	var $window = jQuery(window);
	// #で始まるアンカーをクリックした場合に処理
	var $body = jQuery('body,html');
	jQuery('a[href^="#"]').on('click', function (e) {
		var $header = jQuery('#header');
		var $sub_menu = jQuery('.sub-menu');
		var buffer = 0;

		if ($header.length) {
			// buffer += $header.innerHeight() + $sub_menu.innerHeight();
			buffer += $header.innerHeight() + 50;
		}

		var speed = 400;
		var href = jQuery(this).attr("href");
		var target = jQuery(href == "#" || href == "" ? 'html' : href);
		var position = Math.floor(target.offset().top - buffer);

		smoothScroll(target, position, speed, buffer, 0);
		return false;
	});

	function smoothScroll(target, position, speed, buffer, count) {
		count++;
		if (count > 20) return false;

		$body.animate({
			scrollTop: position
		}, speed, 'swing', function () {
			var dest = Math.floor(target.offset().top - buffer);
			if (dest == position) {
				return true;
			} else {
				smoothScroll(target, dest, 0, buffer, count);
			}
		});
	}
	//スクロール処理
	$window.on('load scroll', function () {
		var sT = $window.scrollTop();
		jQuery('[data-src]').each(function (i) {
			if (sT + $window.height() * 1.5 > jQuery(this).offset().top) {
				jQuery(this).attr('src', jQuery(this).attr('data-src'));
				jQuery(this).removeAttr('data-src');
			}
		});
		var _count = 0;
		jQuery('[data-anim="false"]').each(function (i) {
			if (sT + $window.height() * 0.8 > jQuery(this).offset().top) {
				jQuery(this).attr('data-anim', 'true');
				TweenMax.to(jQuery(this), 0.6, {
					y: 0,
					opacity: 1,
					//delay: 0.2 * _count
					delay: 0.1 * _count
				});
				_count++;
			}
		});
		// kv
		if (sT >= jQuery('.kv').offset().top) {
			jQuery('.kv__img').addClass('-fixed');
		} else {
			jQuery('.kv__img').removeClass('-fixed');
		}
		if (sT >= jQuery('.offer').offset().top) {
			jQuery('.kv__img').removeClass('-fixed');
		}
	});
	$window.on('load', function () {
		setTimeout(function () {
			jQuery('[data-src]:visible').each(function (i) {
				var jQuerythis = jQuery(this);
				setTimeout(function () {
					jQuerythis.attr('src', jQuerythis.attr('data-src'));
					jQuerythis.removeAttr('data-src');
				}, 5 * i);
			});
		}, 10);
	});

	// movie
	if (jQuery(".js-modal-video").length) {
		//クラス名js-modal-videoがあれば以下を実行
		jQuery(".js-modal-video").modalVideo({
			channel: "youtube",
			youtube: {
				rel: 0, // 関連動画の指定
				autoplay: 0, // 自動再生の指定
				controls: 0, // コントロールさせるかどうかの指定
			},
		});
	};

	// 比較表モーダル
	jQuery('.comparison__inner').load('/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/comparison-content.html');
	// 比較表モーダル
	$document.on('click', '[data-comparison-modal]', function (e) {
		jQuery('.comparison-modal').addClass('-modal-active');
		e.preventDefault();
	});
	$document.on('click', '.comparison-modal', function () {
		jQuery('.comparison-modal').removeClass('-modal-active');
	});

	// 製品仕様モーダル
	$document.on('click', '[data-spec-modal="1"]', function (e) {
		jQuery('.spec__inner').load('/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/spec-content.html');
		jQuery('.spec-modal').addClass('-modal-active');
		e.preventDefault();
	});
	$document.on('click', '.spec-modal', function () {
		jQuery('.spec-modal').removeClass('-modal-active');
	});

	// 製品仕様モーダル（セット）
	$document.on('click', '[data-spec-modal="2"]', function (e) {
		jQuery('.spec__inner').load('/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/spec-content2.html');
		jQuery('.spec-modal').addClass('-modal-active');
		e.preventDefault();
	});
	$document.on('click', '.spec-modal', function () {
		jQuery('.spec-modal').removeClass('-modal-active');
	});

	// 製品仕様モーダル（カートリッジ単品）
	$document.on('click', '[data-spec-modal="3"]', function (e) {
		jQuery('.spec__inner').load('/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/spec-content3.html');
		jQuery('.spec-modal').addClass('-modal-active');
		e.preventDefault();
	});
	$document.on('click', '.spec-modal', function () {
		jQuery('.spec-modal').removeClass('-modal-active');
	});

	// スライダー（付け替え方法）
	var _timer;
	var _w = 0;
	jQuery(window).on('load resize', function () {
		if (_w != jQuery(window).width()) {
			clearTimeout(_timer);
			_timer = setTimeout(function () {
				jQuery('.attachment-slider.slick-initialized').slick('unslick');
				if (jQuery(window).width() < 768) {
					jQuery('.attachment-slider').slick({
						arrows: true,
						dots: true
					});
				}
			}, 100);
			_w = jQuery(window).width();
		}
	});

	// FAQ
	jQuery('.faq__item__q').on('click', function () {
		var $parent = jQuery(this).parents('.faq__item');
		if ($parent.attr('data-active') == 'true') {
			$parent.attr('data-active', false);
			jQuery('.faq__item__a', $parent).slideUp();
		} else {
			$parent.attr('data-active', true);
			jQuery('.faq__item__a', $parent).slideDown();
		}
		e.preventDefault();
	});

	// アダプタのアコーディオン
	jQuery('.attachment__box-button').on('click', function () {
		var $detail = jQuery('.attachment__box-detail');
		if ($detail.attr('data-active') == 'true') {
			$detail.attr('data-active', false);
			jQuery('.attachment__box-detail').slideUp();
		} else {
			$detail.attr('data-active', true);
			jQuery('.attachment__box-detail').slideDown();
		}
		e.preventDefault();
	});

	// 色選択をクリック
	jQuery('.color-select01').on('click', function () {
		var $select = jQuery('.color-select01');
		var url = "";
        $select.removeClass('active');
            
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
		    } else {
			jQuery(this).addClass('active');
		    }
	});

    	// カートリッジ01選択をクリック
	jQuery('.cartridge-select01').on('click', function () {
		var $select = jQuery('.cartridge-select01');
		var url = "";
        $select.removeClass('active');
            
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
		    } else {
			jQuery(this).addClass('active');
		    }
	});


    jQuery(document).ready(function($) {
        jQuery('.cart01').on('click', function () {
            let color = "";
            let cartridge = "";
            var url = "";
            jQuery('#refa-bubblepure-buy-now01-color-choice [data-color]').each(function(i) {
                if (jQuery(this).hasClass('active')) {
                        if(i===0) color = "white";
                        if(i===1) color = "black";
                }
            });
            jQuery('#refa-bubblepure-buy-now01-cartridge-choice [data-cartridge]').each(function(i) {
                if (jQuery(this).hasClass('active')) {
                    if(i===0) cartridge = "yes";
                    if(i===1) cartridge = "no";
                }
            });
          if (color == "white") {
            if (cartridge == "yes") {
                url = "https://www.mtgec.jp/shop/cart/cart.aspx?goods=5910120101,5772510101&qty=1,1";
            } else {
                url = "https://www.mtgec.jp/shop/cart/cart.aspx?goods=5910120101&qty=1";
            }
          } else {
            if (cartridge == "yes") {
                url = "https://www.mtgec.jp/shop/cart/cart.aspx?goods=1111520101,5772510101&qty=1,1";
            } else {
                url = "https://www.mtgec.jp/shop/cart/cart.aspx?goods=1111520101&qty=1";
            }
          }
          window.location.href = url;
        });
    });

    // カートリッジ02選択をクリック
	jQuery('.cartridge-select02').on('click', function () {
		var $select = jQuery('.cartridge-select02');
		var url = "";
        $select.removeClass('active');
            
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
		    } else {
			jQuery(this).addClass('active');
		    }
	});


    jQuery(document).ready(function($) {
        jQuery('.cart02').on('click', function () {
            let cartridge02 = "";
            var url = "";
            jQuery('#refa-bubblepure-buy-now02-cartridge-choice [data-cartridge]').each(function(i) {
                if (jQuery(this).hasClass('active')) {
                    if(i===0) cartridge02 = "one";
                    if(i===1) cartridge02 = "three";
                }
            });
            if (cartridge02 == "one") {
                url = "https://www.mtgec.jp/shop/cart/cart.aspx?goods=5772510101&qty=1";
            } else {
                url = "https://www.mtgec.jp/shop/cart/cart.aspx?goods=5772510203&qty=1";
            }
        window.location.href = url;
        });
    });

    jQuery(document).ready(function($) {
        $('[data-open-modal]').on('click', function () {
            console.log("aaa");
            var _id = '#' + $(this).attr('data-open-modal');
            $(_id).attr('data-modal', true);
        });
        $('.modal__close').on('click', function () {
            $(this).parents('.modal').attr('data-modal', false);
        });
        $('.modal').on('click', function (e) {
            if (!$(e.target).closest('.modal__inner').length) {
                $('.modal').attr('data-modal', false);
            }
        });
    });

    /*--------------------------------------
製品仕様
---------------------------------------*/
jQuery($=>{
	const target = $('.spec-table .title');
	
	function fn(){
		let w = $(window).innerWidth();
		// if(w<=768){
		target.attr('aria-expanded','false');
		target.nextAll('.table-wrapper').hide();
		// }        
	}
	fn();
	// $(window).on('resize',function(){
	$(window).on('load',function(){
		fn();
	});
	$('.spec-table .title').on('click',function(){
		// const self = $(this);
		let ae = $(this).attr('aria-expanded');
		let next = $(this).nextAll('.table-wrapper');
		if(/false/.test(ae)){
			next.slideDown();
			$(this).attr('aria-expanded','true');
		}else{
			next.slideUp();
			$(this).attr('aria-expanded','false');
		};
		return false;
	});
});
    
});

/*--------------------------------------
Vue コンポーネント
---------------------------------------*/
($=>{
	    /*--------------------------------------
    buy now 01
    ---------------------------------------*/
    Vue.component('refa-bubblepure-buy-now01',{
			data:function(){
					return {
							items:[
				{
											large_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-wh.webp',
											small_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-wh-small.webp',
											alt:'ホワイト',
											active:true,
									},
				{
											large_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-bk.webp',
											small_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-bk-small.webp',
											alt:'ブラック',
											active:false,
									},
			]
					};
			},
			template:`
			<div class="inner refa-bubblepure-buy-now" id="refa-bubblepure-buy-now01">
					<div class="block-left">
							<div class="slide-target">
									<ul class="variation swiper-wrapper my-gallery">
											<li v-for="v in items" class="swiper-slide">
													<div class="img-wrapper">
															<figure>
																	<a :href="v.large_src" class="zoom" data-size="800x800">
																			<img :src="v.large_src" loading="lazy" :alt="v.alt">
																	</a>
															</figure>
													</div>
											</li>
									</ul>
									<div class="button-prev"></div>
									<div class="button-next"></div>
							</div>
					</div>
					<div class="block-right">
							<div class="offer_txt">
									<p class="text">
											<span class="ja">リファファインバブル ピュア</span>
											<span class="en">ReFa FINE BUBBLE PURE</span>
									</p>
									<p class="item">ホワイト</p>
									<p class="price"><span class="yen">&yen;</span>30,000<span class="tax">[税込]</span></p>
									<p class="item">ブラック</p>
									<p class="price"><span class="yen">&yen;</span>33,000<span class="tax">[税込]</span></p>
							</div>
							<ul class="variation variation-target">
									<li v-for="v in items" :class="{active:v.active}">
											<div class="img-wrapper">
													<img :src="v.small_src" width="84" height="84" loading="lazy" :alt="v.alt">
											</div>
									</li>
							</ul>
					</div>
			</div>
			`,
			mounted:function(){
					this.$nextTick(()=>{
							const sel = '#refa-bubblepure-buy-now01'; 
							const s = new Swiper(`${sel} .slide-target`,{
									slidesPerView: 1,
									spaceBetween: 0,
									navigation: {
											nextEl: `${sel} .button-next`,
											prevEl: `${sel} .button-prev`,
										},
							});
							s.on('slideChange',function(){
									let small = $(`${sel} .variation-target`).find('li');
									small.removeClass('active');
									small.eq(s.activeIndex).addClass('active');
							});
							$(`${sel} .variation-target li`).each(function(i){
									$(this).on('click',function(){
											s.slideTo(i);
									});
							});
							initPhotoSwipeFromDOM(`${sel} .my-gallery`);
					});
	}
	});
	/*--------------------------------------
	buy now
	---------------------------------------*/
	Vue.component('refa-bubblepure-buy-now01-choice',{
			data:function(){
					return {
							items:[
				{
											src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-wh-small.webp',
											alt:'ホワイト',
											active:true,
											ga_label:'商品選択_ホワイト単品',
											cart:'#cart-single-wh',
											stock:{
													flg:true, // true=選択可,false=選択不可
													arrival_html:'' // 順次発送,入荷未定など
											},
									},
				{
											src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-bk-small.webp',
											alt:'ブラック',
											active:false,
											ga_label:'商品選択_ブラック単品',
											cart:'#cart-single-bk',
											stock:{
													flg: true, // true=選択可,false=選択不可
													arrival_html:'' // 順次発送,入荷未定など
											},
									},
			]
					};
			},
			template:`
			<div id="refa-bubblepure-buy-now01-choice">
					<p class="title">カラーを選択</p>
					<div class="list">
							<a v-for="v in items" :class="{active:v.active,disabled:!v.stock.flg}" href="javascript:void(0);" data-color="true" :data-cart="v.cart" @click="click('v.ga_label')">
									<div class="inner">
											<div class="block-left">
													<img :src="v.src" width="50" height="50" loading="lazy" :alt="v.alt">
											</div>
											<div class="block-right">
													<p class="goods">{{v.alt}}</p>
													<p class="arrival" v-html="v.stock.arrival_html"></p>
											</div>
									</div>
							</a>
					</div>
			</div>
			`,
			methods:{
					click:function(label){
							ga('tealium_0.send','event','FBP','click',label, {'nonInteraction':1});
					}
			},
			// mounted:function(){
			// 	const buy1 = '#buynow01';
			// 	this.$nextTick(()=>{
			// 			let flg = true;
			// 			const color01 = $('#refa-bubblepure-buy-now01-choice [data-color]');
			// 			color01.each(function(i){
			// 					if(flg && !$(this).hasClass('disabled')){
			// 						color01.removeClass('active');
			// 							$(this).addClass('active');
			// 							$(`${buy1} .js-freepage-cart`).hide();
			// 							let cart01 = $(this).attr('data-cart');
			// 							if(cart01 && $(cart01).length) $(cart01).show();
			// 							flg = false;
			// 					}
			// 					$(this).on('click',function(){
			// 						color01.removeClass('active');
			// 							$(this).addClass('active');
			// 							$(`${buy1} .js-freepage-cart`).hide();
			// 							if(i===0) $('#cart-single-wh').show();
			// 							if(i===1) $('#cart-single-bk').show();
			// 					});
			// 			});
			// 			let arr = [...this.items];
			// 			if(arr.filter(v=>!v.stock.flg).length === arr.length){
			// 					$(`${buy1} .js-freepage-cart .cart`).addClass('disabled');
			// 			}
			// 	});
			// }
			mounted:function(){
				const buy1 = '#buynow01';
				this.$nextTick(()=>{
						let flg = true;
						const color01 = $('#refa-bubblepure-buy-now01-choice [data-color]');
						color01.each(function(i){
								if(flg && !$(this).hasClass('disabled')){
									color01.removeClass('active');
										$(this).addClass('active');
										// $(`${buy1} .js-freepage-cart`).hide();
										let cart01 = $(this).attr('data-cart');
										if(cart01 && $(cart01).length) $(cart01).show();
										flg = false;
								}
								$(this).on('click',function(){
									color01.removeClass('active');
										$(this).addClass('active');
										// $(`${buy1} .js-freepage-cart`).hide();
										// if(i===0) $('#cart-single-wh').show();
										// if(i===1) $('#cart-single-bk').show();
								});
						});
						let arr = [...this.items];
						if(arr.filter(v=>!v.stock.flg).length === arr.length){
								$(`${buy1} .js-freepage-cart .cart`).addClass('disabled');
						}
				});
			}
		});
		/*--------------------------------------
    buy now 02
    ---------------------------------------*/
    Vue.component('refa-bubblepure-buy-now02',{
			data:function(){
					return {
							items:[
				{
											large_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-wh02.webp',
											small_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-wh02-small.webp',
											alt:'ホワイト',
											active:true,
									},
				{
											large_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-bk02.webp',
											small_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-bk02-small.webp',
											alt:'ブラック',
											active:false,
									},
			]
					};
			},
			template:`
			<div class="inner refa-bubblepure-buy-now" id="refa-bubblepure-buy-now02">
					<div class="block-left">
							<div class="slide-target">
									<ul class="variation swiper-wrapper my-gallery">
											<li v-for="v in items" class="swiper-slide">
													<div class="img-wrapper">
															<figure>
																	<a :href="v.large_src" class="zoom" data-size="800x800">
																			<img :src="v.large_src" loading="lazy" :alt="v.alt">
																	</a>
															</figure>
													</div>
											</li>
									</ul>
									<div class="button-prev"></div>
									<div class="button-next"></div>
							</div>
					</div>
					<div class="block-right">
							<div class="offer_txt">
									<p class="text">
											<span class="ja">リファファインバブル ピュア&<br>リファピュアカートリッジ</span>
											<span class="en">ReFa FINE BUBBLE PURE &<br>ReFa PURE CARTRIDGE</span>
									</p>
									<p class="item">ホワイト</p>
									<p class="price"><span class="yen">&yen;</span>32,500<span class="tax">[税込]</span></p>
									<p class="item">ブラック</p>
									<p class="price"><span class="yen">&yen;</span>35,500<span class="tax">[税込]</span></p>
							</div>
							<ul class="variation variation-target">
									<li v-for="v in items" :class="{active:v.active}">
											<div class="img-wrapper">
													<img :src="v.small_src" width="84" height="84" loading="lazy" :alt="v.alt">
											</div>
									</li>
							</ul>
					</div>
			</div>
			`,
			mounted:function(){
					this.$nextTick(()=>{
							const sel = '#refa-bubblepure-buy-now02'; 
							const s = new Swiper(`${sel} .slide-target`,{
									slidesPerView: 1,
									spaceBetween: 0,
									navigation: {
											nextEl: `${sel} .button-next`,
											prevEl: `${sel} .button-prev`,
										},
							});
							s.on('slideChange',function(){
									let small = $(`${sel} .variation-target`).find('li');
									small.removeClass('active');
									small.eq(s.activeIndex).addClass('active');
							});
							$(`${sel} .variation-target li`).each(function(i){
									$(this).on('click',function(){
											s.slideTo(i);
									});
							});
							initPhotoSwipeFromDOM(`${sel} .my-gallery`);
					});
	}
	});
	/*--------------------------------------
	buy now
	---------------------------------------*/
	Vue.component('refa-bubblepure-buy-now02-choice',{
			data:function(){
					return {
							items:[
				{
											src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-wh02-small.webp',
											alt:'ホワイト',
											active:true,
											ga_label:'商品選択_ホワイト_ピュアカートリッジセット',
											cart:'#cart-set-wh',
											stock:{
													flg:true, // true=選択可,false=選択不可
													arrival_html:'' // 順次発送,入荷未定など
											},
									},
				{
											src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-product-bk02-small.webp',
											alt:'ブラック',
											active:false,
											ga_label:'商品選択_ブラック_ピュアカートリッジセット',
											cart:'#cart-set-bk',
											stock:{
													flg:true, // true=選択可,false=選択不可
													arrival_html:'' // 順次発送,入荷未定など
											},
									},
			]
					};
			},
			template:`
			<div id="refa-bubblepure-buy-now02-choice">
					<p class="title">カラーを選択</p>
					<div class="list">
							<a v-for="v in items" :class="{active:v.active,disabled:!v.stock.flg}" href="javascript:void(0);" data-color="true" :data-cart="v.cart" @click="click(v.ga_label)">
									<div class="inner">
											<div class="block-left">
													<img :src="v.src" width="50" height="50" loading="lazy" :alt="v.alt">
											</div>
											<div class="block-right">
													<p class="goods">{{v.alt}}</p>
													<p class="arrival" v-html="v.stock.arrival_html"></p>
											</div>
									</div>
							</a>
					</div>
			</div>
			`,
			methods:{
					click:function(label){
							ga('tealium_0.send','event','FBP','click',label, {'nonInteraction':1});
					}
			},
			mounted:function(){
					const buy2 = '#buynow02';
					this.$nextTick(()=>{
							let flg = true;
							const color02 = $('#refa-bubblepure-buy-now02-choice [data-color]');
							color02.each(function(i){
									if(flg && !$(this).hasClass('disabled')){
										color02.removeClass('active');
											$(this).addClass('active');
											$(`${buy2} .js-freepage-cart`).hide();
											let cart02 = $(this).attr('data-cart');
											if(cart02 && $(cart02).length) $(cart02).show();
											flg = false;
									}
									$(this).on('click',function(){
										color02.removeClass('active');
											$(this).addClass('active');
											$(`${buy2} .js-freepage-cart`).hide();
											if(i===0) $('#cart-set-wh').show();
											if(i===1) $('#cart-set-bk').show();
									});
							});
							let arr = [...this.items];
							if(arr.filter(v=>!v.stock.flg).length === arr.length){
									$(`${buy2} .js-freepage-cart .cart`).addClass('disabled');
							}
					});
	}
	});
	    /*--------------------------------------
    buy now 03
    ---------------------------------------*/
    Vue.component('refa-bubblepure-buy-now03',{
			data:function(){
					return {
							items:[
				{
											large_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-cartridge01.webp',
											small_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-cartridge01-small.webp',
											alt:'【単品】',
											active:true,
									},
				{
											large_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-cartridge02.webp',
											small_src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-cartridge02-small.webp',
											alt:'【定期】 3本セット',
											active:false,
									},
			]
					};
			},
			template:`
			<div class="inner refa-bubblepure-buy-now" id="refa-bubblepure-buy-now03">
					<div class="block-left">
							<div class="slide-target">
									<ul class="variation swiper-wrapper my-gallery">
											<li v-for="v in items" class="swiper-slide">
													<div class="img-wrapper">
															<figure>
																	<a :href="v.large_src" class="zoom" data-size="800x800">
																			<img :src="v.large_src" loading="lazy" :alt="v.alt">
																	</a>
															</figure>
													</div>
											</li>
									</ul>
									<div class="button-prev"></div>
									<div class="button-next"></div>
							</div>
					</div>
					<div class="block-right">
							<div class="offer_txt">
									<p class="text">
											<span class="ja">リファピュアカートリッジ</span>
											<span class="en">ReFa PURE CARTRIDGE</span>
									</p>
									<p class="item">【単品】</p>
									<p class="price"><span class="yen">&yen;</span>2,500<span class="tax">[税込]</span></p>
									<p class="item">【定期】 3本セット</p>
									<p class="price"><span class="yen">&yen;</span>6,750<span class="tax">[税込]</span></p>
									<p class="caution">※定期の場合1本あたり ¥2,250[税込] です。<br>※お届けサイクルは90日。変更も可能です。<br>※定期便サービスの詳細は<a href="https://www.mtgec.jp/shop/pages/guide_regular_service.aspx">こちら</a></p>
							</div>
							<ul class="variation variation-target">
									<li v-for="v in items" :class="{active:v.active}">
											<div class="img-wrapper">
													<img :src="v.small_src" width="84" height="84" loading="lazy" :alt="v.alt">
											</div>
									</li>
							</ul>
					</div>
			</div>
			`,
			mounted:function(){
					this.$nextTick(()=>{
							const sel = '#refa-bubblepure-buy-now03'; 
							const s = new Swiper(`${sel} .slide-target`,{
									slidesPerView: 1,
									spaceBetween: 0,
									navigation: {
											nextEl: `${sel} .button-next`,
											prevEl: `${sel} .button-prev`,
										},
							});
							s.on('slideChange',function(){
									let small = $(`${sel} .variation-target`).find('li');
									small.removeClass('active');
									small.eq(s.activeIndex).addClass('active');
							});
							$(`${sel} .variation-target li`).each(function(i){
									$(this).on('click',function(){
											s.slideTo(i);
									});
							});
							initPhotoSwipeFromDOM(`${sel} .my-gallery`);
					});
	}
	});
	/*--------------------------------------
	buy now
	---------------------------------------*/
	Vue.component('refa-bubblepure-buy-now03-choice',{
			data:function(){
					return {
							items:[
				{
											src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-cartridge01-small.webp',
											alt:'【単品】',
											active:true,
											ga_label:'商品選択_ピュアカートリッジ単品',
											cart:'#cart-cartridge01',
											stock:{
													flg:true, // true=選択可,false=選択不可
													arrival_html:'' // 順次発送,入荷未定など
											},
									},
				{
											src:'/assets/beauty/refa/refa_clear/refa_bubble_pure/lp/fbp_renew202211/images/im-cartridge02-small.webp',
											alt:'【定期】 3本セット',
											active:true,
											ga_label:'商品選択_ピュアカートリッジ定期_3本セット',
											cart:'#cart-cartridge02',
											stock:{
													flg:true, // true=選択可,false=選択不可
													arrival_html:'' // 順次発送,入荷未定など
											},
									},
			]
					};
			},
			template:`
			<div id="refa-bubblepure-buy-now03-choice">
					<p class="title">商品を選択</p>
					<div class="list">
							<a v-for="v in items" :class="{active:v.active,disabled:!v.stock.flg}" href="javascript:void(0);" data-color="true" :data-cart="v.cart" @click="click(v.ga_label)">
									<div class="inner">
											<div class="block-left">
													<img :src="v.src" width="50" height="50" loading="lazy" :alt="v.alt">
											</div>
											<div class="block-right">
													<p class="goods">{{v.alt}}</p>
													<p class="arrival" v-html="v.stock.arrival_html"></p>
											</div>
									</div>
							</a>
					</div>
			</div>
			`,
			methods:{
					click:function(label){
							ga('tealium_0.send','event','FBP','click',label, {'nonInteraction':1});
					}
			},
			mounted:function(){
					const buy3 = '#buynow03';
					this.$nextTick(()=>{
							let flg = true;
							const color03 = $('#refa-bubblepure-buy-now03-choice [data-color]');
							color03.each(function(i){
									if(flg && !$(this).hasClass('disabled')){
										color03.removeClass('active');
											$(this).addClass('active');
											$(`${buy3} .js-freepage-cart`).hide();
											let cart03 = $(this).attr('data-cart');
											if(cart03 && $(cart03).length) $(cart03).show();
											flg = false;
									}
									$(this).on('click',function(){
										color03.removeClass('active');
											$(this).addClass('active');
											$(`${buy3} .js-freepage-cart`).hide();
											if(i===0) $('#cart-cartridge01').show();
											if(i===1) $('#cart-cartridge02').show();
									});
							});
							let arr = [...this.items];
							if(arr.filter(v=>!v.stock.flg).length === arr.length){
									$(`${buy3} .js-freepage-cart .cart`).addClass('disabled');
							}
					});
	}
	});
})(jQuery);
/*--------------------------------------
Vue
---------------------------------------*/
($=>{
	$(()=>{
			var nl = document.querySelectorAll('.vue-app-freepage');

			for (let i = 0; i < nl.length; i++) {
					nl[i].classList.add(`js-vue-app-freepage-${i}`);
					new Vue({
							el: `.js-vue-app-freepage-${i}`,
					});
			}
	});
})(jQuery);

/*--------------------------------------
    jaccs
---------------------------------------*/
// ($=>{
// 	$(()=>{
// 			$('[data-open-modal]').on('click', function () {
//                 console.log("aaa");
// 					var _id = '#' + $(this).attr('data-open-modal');
// 					$(_id).attr('data-modal', true);
// 			});
// 			$('.modal__close').on('click', function () {
// 					$(this).parents('.modal').attr('data-modal', false);
// 			});
// 			$('.modal').on('click', function (e) {
// 					if (!$(e.target).closest('.modal__inner').length) {
// 							$('.modal').attr('data-modal', false);
// 					}
// 			});
// 	});
// })(jQuery);

jQuery(function(){
	var clickEventType=((window.ontouchstart!==null)?'click':'touchend');
	var $document = jQuery(document);
	var $window = jQuery(window);
	//movie
	jQuery('.offer__content__loan__link').each(function(){
		jQuery(this).removeAttr('href');
		jQuery(this).attr('data-jaccs-modal', '');
	});
	$document.on('click', '[data-jaccs-modal]', function(e){
		jQuery('.jaccs-modal').addClass('-modal-active');
		e.preventDefault();
	});
	$document.on('click', '.jaccs-modal', function(){
		jQuery('.jaccs-modal').removeClass('-modal-active');
	});
});

/*--------------------------------------
/assets/common/lifeplan/lifeplan-modal/js/default.js
---------------------------------------*/
jQuery(function() {
	var clickEventType = ((window.ontouchstart !== null) ? 'click' : 'touchend');
	var $document = jQuery(document);
	var $window = jQuery(window);
	//movie
	jQuery('.offer__content__lifeplan__link').each(function() {
			jQuery(this).removeAttr('href');
			jQuery(this).attr('data-lifeplan-modal', '');
	});
	$document.on('click', '[data-lifeplan-modal]', function(e) {
			jQuery('.lifeplan-modal').addClass('-modal-active');
			e.preventDefault();
	});
	$document.on('click', '.lifeplan-modal', function() {
			jQuery('.lifeplan-modal').removeClass('-modal-active');
	});

	jQuery('#lifeplan_detail_content').load('/assets/common/lifeplan/lifeplan-modal/lifeplan_modal.html');

});


// フローティングバナー
jQuery(function(){
  jQuery(window).on('load scroll resize', function(){
		let trigger = jQuery('.kv').innerHeight() - 100;
    if (jQuery(window).scrollTop() > trigger) {
			jQuery('#floating-bnr').addClass('is-active');
    } else {
			jQuery('#floating-bnr').removeClass('is-active');
    }
  });
});