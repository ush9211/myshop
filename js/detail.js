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
    // Number(), parseInt() : 숫자타입으로 바꿔주는 것 (둘 다 사용가능)

    let totalmoney = prprice;

    // 수량 늘리기
    $('#qup').click(function(){
        let quantity = Number($('#quantity').val());
        quantity += 1;
        if(quantity > 9){
            alert("최대 수량입니다.");
            quantity = 9;
        }
        $('#quantity').val(quantity);
        totalmoney = prprice * quantity;

        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>" + tmoney + "원</strong> (" + quantity + "개)";

        $('.totalmoney').html(txt);
    });

    // 수량 줄이기
    $('#qdown').click(function(){
        let quantity = Number($('#quantity').val());
        quantity -= 1;
        if(quantity < 1){
            alert("최소 수량입니다.");
            quantity = 1;
        }
        $('#quantity').val(quantity);
        totalmoney = prprice * quantity;

        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>" + tmoney + "원</strong> (" + quantity + "개)";

        $('.totalmoney').html(txt);
    });
    
});


