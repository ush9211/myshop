$(function(){

    /***************** HEADER - 스크롤 반응형 **************/
    $(window).scroll(function(){
        let tops = $(window).scrollTop();  
        if(tops > 0) {
           $('header').css({
              'position': 'fixed',
              'backgroundColor': 'rgba(255,255,255,0.8)',
              'top': 0,
              'width': '100%',
              'zIndex':1000
           }).addClass("fixed");
        }else{
          $('header').css({
             'position': 'static',
             'backgroundColor': 'rgba(255,255,255)',
             'top': 0,
             'width': '100%'
          }).removeClass('fixed');        
        } 
     });


    /***************** NAV **************/
    $(document)
    .on("mouseenter", ".pr-category>li", function(){
        $(this).find('.sub-cate').fadeIn();
    })
    .on("mouseleave", ".pr-category>li", function(){
        $('.pr-category>li>.sub-cate').fadeOut();
    })


    /***************** SUBNAV **************/
    $('.category').mouseenter(function(){
        $(this).find('.category-subnav').css('display','flex');
    }).mouseleave(function(){
        $(this).find('.category-subnav').css('display','none');
    });


    /***************** LIST VIEW **************/
    $('.listview').click(function(e){
        // preventDefault : 기능 중지
        e.preventDefault();
        const view = $(this).data("view");
        $('#pdlist>div').removeClass();
        $('.listview rect').removeClass('list-act-color').addClass('list-color');
        if(view==3){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $('#pdlist>div').addClass("col-md-4 mb-5");
        }else if(view==4){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $('#pdlist>div').addClass("col-md-3 mb-5");
        }else if(view==5){
            $(this).find('rect').removeClass('list-color').addClass('list-act-color');
            $('#pdlist>div').addClass("col-md-55 mb-5");
        }
    });


    /***************** REMOTECONTROL **************/
    // 위치값 console로 확인하는 법
    // console.log($('.list').offset().top);

    // 맨 위로
    $('.tops').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop:0
        }, 500);
    });

    // 새로 들어온 상품으로
    $('.news').click(function(e){
        e.preventDefault();
        let thenew;
        // header의 반응형 때문에 if문 이용하여 위치값 따로 적용해줘야함
        if($('header').css('position','fixed')){
            thenew = $('#new').offset().top - 100;
        }else{
            thenew = $('#new').offset().top - 200;
        }
        $('html, body').animate({
            scrollTop: thenew + "px"
        }, 500);
    });

    // 베스트 핫템으로
    $('.hots').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop:$('#list').offset().top - 100 + "px"
        }, 500);
    });
    
    // 맨 아래로
    $('.bottoms').click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop:$(document).height()
        }, 500);
    });
});