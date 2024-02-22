$(function(){

    viewCart();

    // x 버튼을 누르면 cartview 닫히는 식
    $('.cartview-close').click(function(){
        $('.cartview').fadeOut();
    });

    $('#cart').click(function(){
        let quantity, subtitle, toptmoney, ct;
        let mycart = getCart();
        const form = $('#detail-form').serializeArray();
        const title = $('#title').val();
        const img = $('#imgid').val();
        for(let i=0; i<$('.quantity').length; i++){
            quantity = $('.quantity').eq(i).val();
            subtitle = $('.subtitle').eq(i).val();
            toptmoney = $('.toptmoney').eq(i).val();
            ct = { "title":title, "img":img, "quantity":quantity, "subtitle":subtitle, "toptmoney":toptmoney };
            mycart.push(ct);
        }
        addCart(mycart);
        viewCart();
    });
});

// 장바구니 보기
function getCart() {

    // 문자열 -> object 타입으로 변환해줘야하므로, JSON.parse()로 타입변환
    return JSON.parse(localStorage.getItem('cart')) || [];
    
}

// 장바구니에 상품이 담기면 보이기
function viewCart(){
    const vcart = getCart();
    console.log(vcart);
    if(vcart.length>0){
        $('.cart-count').text(vcart.length);
        let chtml = '', ct;
        for(let i=0; i<vcart.length; i++){
            console.log(vcart[i]);
            ct = `<li class="list-group-item">
                    <div class="d-flex">
                        <a href="#"><img src="images/pd/${vcart[i].img}.jpg" alt="${vcart[i].img}" class="img-thumbnail"></a>
                        <div class="cart-txt">
                            <h1><a href="#">${vcart[i].title}</a></h1>
                            <p>${vcart[i].subtitle}</p>
                        </div>
                    </div>
                    <div class="c-money">
                        <span>${vcart[i].quantity}</span>${vcart[i].toptmoney}원
                    </div>
                </li>`;
            chtml += ct;
        }
        $('.cartin>.list-group').html(chtml);
        $('.cartview').show();
    }
}

// 장바구니에 상품 추가
function addCart(product) {

    // 카트에서 기존에 있던 상품들을 받아옴
    let cart = getCart();

    // 기존 카트에 새 상품을 추가한 후 newCart에 보관
    // cart.push(product);
    
    // newCart를 문자열로 만든 후 로컬스토리지에 저장
    localStorage.setItem("cart", JSON.stringify(product));
}