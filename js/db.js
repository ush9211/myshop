$(function(){
    $.ajax({
        url: './data/db.json',
        success: function(rs){
            const cat = rs.category;
            let link='';
            let sublink = '';
            for(let i=0; i<cat.length; i++){
                if(cat[i].sub.length>0){
                    for(let j=0; j<cat[i].sub.length; j++){
                        sublink += `<li>
                                    <a href="${cat[i].sub[j].link}">${cat[i].sub[j].title}</a>
                                </li>`;
                    }
                    link += `<li><a href="${cat[i].link}">${cat[i].title}</a>
                                <ul class="sub-cate">${sublink}</ul>
                            </li>`;
                    sublink = '';
                }else{
                    link += `<li><a href="${cat[i].link}">${cat[i].title}</a></li>`;
                }
            }
            $('.pr-category').html(link);
            $('.category-subnav-view').html(link);
        }
    });

    $.get("data/slide.json", function(rs){
        const img = rs.carousel;
        let imgs = '';
        for(let i=0; i<img.length; i++){
            imgs += `<div class="text-center"><img src="images/${img[i]}" alt=${img[i]}"></div>`;
        }
        $('.mySlick').prepend(imgs).slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 5000
          });
    });

    $.get("data/new.json", function(rs){
        let newbox = '';
        const list = rs.newlist;
        for(let i=0; i<list.length; i++){
            newbox = `
            <div class="col-md-3">
                <div class="card">
                    <a href="#" class="card-img">
                        <img src="images/pd/017.jpg" class="card-img-top" alt="nothing">
                    </a>
                    <a href="#"><div class="card-body"></a>
                        <h5 class="mt-4">OFFICE LOOK</h5>
                        <p>센스있는 직장인 데일리룩</p>
                    </div>
                </div>
            </div>
            `;
        }
    });

    
});