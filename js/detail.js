$(function(){
    $('.img-thumb-box>img').click(function(){
        const src = $(this).attr('src');
        $('.img-box>img').attr('src',src);
    });

    $('.colors input[type=radio]').click(function(){
        const color = $(this).val();
        $('.selected').text(color + "색");
    });

    // 상품가격 계산
    const prcode = $('#prcode').val();
    const prprice = Number($('#prprice').val());
    const reserves = parseInt($('#reserves').val());
    const delivery = parseInt($('#delivery').val());
    const prtitle = $('#title').val();
    // Number(), parseInt() : 숫자타입으로 바꿔주는 것 (둘 다 사용가능)

    let totalmoney = prprice;
    let tmoney = prprice;
    let opt1, opt11, color, colortxt, opt2, opt22, size, sizetxt, optionText, totalTextLength;

    // color 추가금액 계산
    $('input[name="color"]').change(function(){

        // size 초기화
        $('.size').find('option:first').prop('selected',true);

        // 추가금액
        opt1 = Number($(this).data('color'));
        // 색상 값
        color = $(this).val();
        colortxt = $(this).data('colorname');

        //console.log(opt1,color,colortxt);

        if(opt1>0){
            opt11 = "(+" + opt1.toLocaleString() + "원)";
        }else{
            opt11 = "";
        }

        // 화면에 출력할 색상이름
        colortxt += " " + opt11;
        
        // size박스 활성화
        $('.size').attr('disabled', false);
    });

    let opthtml = `
                    <ul class="add-opt">
                        <li class="d-md-flex align-items-center">
                            <div class="total-text col"></div>
                            <ul class="add-opts col">
                                <li class="addbox d-flex align-items-center">
                                    <label class="title-label">수량</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-line qdown" type="button">
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </button>
                                        </div>
                                        <input type="number" class="quantity" name="quantity[]" readonly>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-line qup" type="button">
                                                <i class="fa-solid fa-chevron-up"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <input type="hidden" name="subtitle[]" class="subtitle">
                            <input type="hidden" name="toptmoney[]" class="toptmoney">
                            <div class="tomoney col text-right"></div>
                            <i class="fa-solid fa-close remove-order"></i>
                        </li>
                    </ul>`;

    // size 추가금액 계산
    $('.size').change(function(){
        totalTextLength = $('.total-text').length;

        // 기존값 읽어오기
        const oradd = $('.addquantity').html();

        // quantity value 값을 따로 읽어서 배열에 저장
        let quantityArray = [];
        for(let i=0; i<$('.quantity').length; i++){
            quantityArray[i] = $('.quantity').eq(i).val();
        }

        // 추가금액
        opt2 = Number($(this).find("option:selected").data('size'));

        // 사이즈 값
        size = $(this).find("option:selected").val();
        sizetxt = $(this).find("option:selected").text();

        //console.log(opt2,size,sizetxt);

        if(opt2>0){
            opt22 = "(+" + opt2.toLocaleString() + "원)";
        }else{
            opt22 = "";
        }


        if(size){
            tmoney = prprice + (opt1 + opt2);

            sizetxt += " " + opt22;

            optionText = `<p>${colortxt} - ${sizetxt}</p>`;

            $('.addquantity').html(oradd + opthtml);

            for(let i=0; i<$('.quantity').length; i++){
                $('.quantity').eq(i).val(quantityArray[i]);
            }

            // input 타입 hidden에 정보 저장
            $('.subtitle').eq(totalTextLength).val(`${colortxt} - ${sizetxt}`);

            // 가격 저장
            $('.toptmoney').eq(totalTextLength).val(tmoney);

            // .eq() : 순서정하기
            $('.total-text').eq(totalTextLength).html(optionText);

            $('.quantity').eq(totalTextLength).val(1);

            $('.tomoney').eq(totalTextLength).html(tmoney.toLocaleString() + "원");

            // 주문버튼, 장바구니버튼 활성화
            $('#submit, #cart').attr('disabled', false);

            totalMoney(delivery);
        }
    });


    // html에서는 리스트를 삭제하고, js에서 추가했기에, 문서를 다시 읽어와야함
    // 수량 늘리기
    $(document).on('click', ".qup", function(){

        // 수량 가져오기
        let quantity = Number($(this).parent().prev().val());
        quantity += 1;
        if(quantity > 9){
            alert("최대 수량입니다.");
            quantity = 9;
        }

        // 가져온 수량을 input에 넣기
        $(this).parent().prev().val(quantity);

        // input에 저장된 상품+옵션 가격
        tmoney = $(this).parents('.add-opt').find('.toptmoney').val();
        
        // 상품+옵션 가격에 수량 곱하기
        let ttmoney = tmoney * quantity;

        // 세자리마다 콤마찍기
        ttmoney = ttmoney.toLocaleString();

        // 개별 가격 수량에 맞게 적용시키는 방법 (1)
        // let ind = $('.qup').index(this);
        // $('.tomoney').eq(ind).html(tmoney + "원");

        // 개별 가격 수량에 맞게 적용시키는 방법 (2)
        $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원");

        totalMoney(delivery);
    });

    // 수량 줄이기
    $(document).on('click', ".qdown", function(){
        let quantity = Number($(this).parent().next().val());
        quantity -= 1;
        if(quantity < 1){
            alert("최소 수량입니다.");
            quantity = 1;
        }
        
        // 가져온 수량을 input에 넣기
        $(this).parent().next().val(quantity);

        // input에 저장된 상품+옵션 가격
        tmoney = $(this).parents('.add-opt').find('.toptmoney').val();
        
        // 상품+옵션 가격에 수량 곱하기
        let ttmoney = tmoney * quantity;

        // 세자리마다 콤마찍기
        ttmoney = ttmoney.toLocaleString();

        // 개별 가격 수량에 맞게 적용시키는 방법 (2)
        $(this).parents('.add-opt').find('.tomoney').html(ttmoney + "원");

        totalMoney(delivery);
    });

    // 선택품목 삭제 버튼
    $(document).on('click','.remove-order', function(){
        $(this).parents('.add-opt').remove();

        if($('.addquantity').children().hasClass('add-opt')){
            totalMoney(delivery);
        }else{
            // size 초기화
            $('.size').find('option:first').prop('selected',true);
            
            // 주문버튼, 장바구니버튼 비활성화
            $('#submit, #cart').attr('disabled', true);

            // 최종금액 초기화
            $('.totalmoney').html("");
        }
        
    });


    // 카트로 이동
    $('#cart').click(function(){
        window.location.href="cart.html";
    })

    const opt = {
        infinite: true,
        slidesToShow: 8,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                autoplay: true
            }
        }]
    };

    //본문 상세보기 스크립트
    $('.nav-pills li').click(function(){
        $('.nav-pills>li').removeClass('active');
        $(this).addClass('active');
        const link = $(this).find('a').attr('href');
        if(link == "#review"){
        setTimeout(function(){
            $('.review-photo').not('.slick-initialized').slick(opt);   
        }, 200);
        }else{
            $('.review-photo').slick('unslick');
        }
    });


    // // 리뷰 슬릭
    // $('#review').show(function(){
    //     $('.review-photo').slick({
    //         slidesToShow : 8,
    //         slidesToScroll : 1,
    //         centerMode : true,
    //         focusOnSelect : true
    //     });
    // });


    // 리뷰 팝업창
    $('.imgs').click(function(e){

        // a 태그에 링크#을 걸어놓은것을 무효화시킴
        e.preventDefault();

        // 이미지 소스 가져오기 (getter)
        const src = $(this).find('img').attr('src');
        const alt = $(this).find('img').attr('alt');

        // 이미지 소스 바꾸기 (setter)
        $('.imgbox').find('img').attr('src', src).attr('alt', alt);

        // 팝업 페이드인
        $('.rp').fadeIn();
    });

    // 팝업창 닫기
    $(document).mouseup(function(e){

        // 현재 누르는곳이 어디로 찍히는지 확인하는 콘솔창 띄우기
        // console.log(e.target);

        // 팝업창 밖을 누르면 닫히는 식
        if($('.rp').has(e.target).length === 0){
            $('.rp').fadeOut();
        }
    });

    // x 버튼을 누르면 닫히는 식
    $('.rp-close').click(function(e){
        $('.rp').fadeOut();
    });

});



// 리뷰 별점비율 함수
function viewReview(){

    // .each(function(){}) : 루프돌리기 (for문과 비슷)
    $('.box-line-color').each(function(){
        let h = $(this).css('height');
        $(this).html("<span>"+h+"</span>")
    });
}

// 총액 계산 함수
function totalMoney(delivery){

    let tm = 0;

    $("input[name='toptmoney[]']").each(function(index){

        // parseInt() : 정수타입 만들기
        let moneyVal = parseInt($(this).val());
        let qt = parseInt($(".quantity").eq(index).val());
        tm += moneyVal * qt;

        // 배송정책 (10만원 이상 배송비 무료)
        if(tm>100000){
            delivery = 0;
        }

        let txt = "총 상품금액(수량) : <strong>" + tm.toLocaleString() + "원</strong> ( + 배송비 : " + delivery.toLocaleString() + "원)";

        $('.totalmoney').html(txt);
        
    });
}