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

    // 추가금액 계산
    $('input[name="color"]').change(function(){
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
                        <li class="d-flex align-items-center">
                            <div class="total-text"></div>
                            <ul class="add-opts">
                                <li class="addbox d-flex align-items-center">
                                    <label class="title-label">수량</label>
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-line qdown" type="button">
                                                <i class="fa-solid fa-chevron-down"></i>
                                            </button>
                                        </div>
                                        <input type="number" class="quantity" name="quantity" value="1" readonly>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-line qup" type="button">
                                                <i class="fa-solid fa-chevron-up"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="tomoney"></div>
                        </li>
                    </ul>`;

    $('.size').change(function(){
        totalTextLength = $('.total-text').length;
        const oradd = $('.addquantity').html();

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

        tmoney = prprice + (opt1 + opt2);

        sizetxt += " " + opt22;

        optionText = `<p>${colortxt} - ${sizetxt}</p>`;

        $('.addquantity').html(oradd + opthtml);

        // .eq() : 순서정하기
        $('.total-text').eq(totalTextLength).html(optionText);

        $('.tomoney').eq(totalTextLength).html(tmoney.toLocaleString() + "원");
    });


    // html에서는 리스트를 삭제하고, js에서 추가했기에, 문서를 다시 읽어와야함
    // 수량 늘리기
    $(document).on('click', ".qup", function(){
        let quantity = Number($(this).parent().prev().val());
        quantity += 1;
        if(quantity > 9){
            alert("최대 수량입니다.");
            quantity = 9;
        }
        $(this).parent().prev().val(quantity);
        totalmoney = prprice * quantity;

        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>" + tmoney + "원</strong> (" + quantity + "개)";

        $('.totalmoney').html(txt);
    });

    // 수량 줄이기
    $(document).on('click', ".qdown", function(){
        let quantity = Number($(this).parent().next().val());
        quantity -= 1;
        if(quantity < 1){
            alert("최소 수량입니다.");
            quantity = 1;
        }
        $(this).parent().next().val(quantity);
        totalmoney = prprice * quantity;

        let tmoney = totalmoney.toLocaleString();
        let txt = "총 상품금액(수량) : <strong>" + tmoney + "원</strong> (" + quantity + "개)";

        $('.totalmoney').html(txt);
    });
    
});

function orders(){

}

