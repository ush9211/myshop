$(function(){
    $(document)
    .on("mouseenter", ".pr-category>li", function(){
        $(this).find('.sub-cate').fadeIn();
    })
    .on("mouseleave", ".pr-category>li", function(){
        $('.pr-category>li>.sub-cate').fadeOut();
    })
    $('.category').mouseenter(function(){
        $(this).find('.category-subnav').css('display','flex');
    }).mouseleave(function(){
        $(this).find('.category-subnav').css('display','none');
    });
});