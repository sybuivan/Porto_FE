const loaded = document.querySelector('.loaded-page')
const buttonBar = document.querySelector('.header-middle__bar-table')
const pageMain = document.querySelector('.page-wrapper')
const menuMobile = document.querySelector('.mobile-menu-container')
const buttonClose = document.querySelector('.mobile-menu__close')
const overlay = document.querySelector('.mobile-menu-overlay')

const inputSearch = document.querySelector('.header-middle__search-wrapper')
const buttonSearch = document.querySelector('.header-middle__search-table')
const buttonDown = document.querySelectorAll('.icon-down-mobile')
const listMobile = document.querySelectorAll('.mobile-menu__nav-item ul')
const headerNav = document.querySelector('.header-nav')
// const btnSliderRight = document.querySelector('.slider-home__control-right')
const btnSliderLeft = document.querySelector('.slider-home__control-left')
const listSlider = document.querySelectorAll('.slider-home__item')
let listProduct = document.querySelector('.products-feature')

let productDetails = document.getElementById('product-detail')

const eventClick = () => {
    buttonBar.onclick = ()=> {
        loaded.classList.add('loaded-active')
    }

    buttonClose.onclick = ()=> {
        loaded.classList.remove('loaded-active')
    }

    overlay.onclick = ()=> {
        loaded.classList.remove('loaded-active')
        console.log('sy');
        
    }

    buttonSearch.onclick = ()=> {
        inputSearch.classList.toggle('visible-input')
    }

    buttonDown.forEach((item,index )=>{
        item.onclick = ()=> {
            listMobile[index].classList.toggle('show')
        }
    })
}



const renderProducts = () => {
    var listProductAPI = 'http://localhost:3000/products'

    const sliderProducts = () => {
        var $sliderOwl = $('.owl-carousel.products-feature')
        $sliderOwl.trigger('destroy.owl.carousel');
        $sliderOwl.owlCarousel({
                items:4, 
            // items change number for slider display on desktop
                autoplayHoverPause:true,
                margin: 30,
                responsive:{
                    0:{
                        items:1,
                        nav:true
                    },
                    600:{
                        items:2,
                        nav:false
                    },
                    800: {
                        items:3,
                        nav:false
                    },
                    1000:{
                        items:4,
                        nav:true,
                        loop:false
                    }
                }
            });
    }
    fetch(listProductAPI)
        .then((response) => {
            return response.json()
        })
        .then((products) => {
            
            var html = products.map((product)=>{
                return `
                    <div class="products-feature__item">
                        <figure class= "mb-3">
                            <a href="" class="products-feature__image">
                                <img src="${product.images}" alt="" data-id="${product.id}">
                            </a>
                            <button class="button-view" data-id="${product.id}">XEM NHANH</button>
                            <span class="products-feature__image-sale products-feature__image-label">-${product.sale}%</span>
                            <span class="products-feature__image-hot products-feature__image-label">HOT</span>
                        </figure>
                        <div class="products-feature__details">
                            <div class="products-feature__details-name">
                                <h2><a href="">${product.name}</a></h2>
                                <div class="products-feature__details-action">
                                    <i class="fab fa-heart"></i>
                                </div>
                            </div>
                            <div class="products-feature__price pb-3">
                                <span class="products-feature__price-old">${product.priceOld}đ</span>
                                <span class="products-feature__price-new">${product.priceNew}}đ</span>
                            </div>
                        </div>
                    </div>
                `
            }).join('')
            
            listProduct.innerHTML = html
            sliderProducts()
            return products
        })
        .then((dataProduct) =>{
            var btnViewDetails = document.querySelectorAll('.button-view')
            
            btnViewDetails.forEach((item, index)=> {
                item.addEventListener('click',()=> {
                    // console.log(dataProduct[index].description);
                    let dataProductItem = {
                        name: dataProduct[index].name,
                        priceOld: dataProduct[index].priceOld,
                        priceNew: dataProduct[index].priceNew,
                        images: dataProduct[index].images,
                        description: dataProduct[index].description
                    }
                    viewDetails(btnViewDetails,dataProductItem)
                    // ZoomImages()
                })
            })
        })
}

const actionSliderDetail = ()=> {
    let pssSliderDetail = 0
    const sliderDetails = document.querySelectorAll('.product-detail__slider-item')
    const sliderDetailsActive = document.querySelector('.product-detail__slider-item.active')
    let btnSliderRight = document.querySelector('.product-detail__control-right')
    let btnSliderLeft = document.querySelector('.product-detail__control-left')

    let listThumb = document.querySelectorAll('.product-detail__thumbnail-image')

    btnSliderRight.onclick = ()=> {
        sliderDetails.forEach((item, index)=>{
            item.classList.remove('active')
            listThumb[index].classList.remove('active')
        })

        ++pssSliderDetail

        pssSliderDetail < sliderDetails.length ? (sliderDetails[pssSliderDetail].classList.add('active'),listThumb[pssSliderDetail].classList.add('active')) : (pssSliderDetail = 0, sliderDetails[pssSliderDetail].classList.add('active'),listThumb[pssSliderDetail].classList.add('active'))
    }

    btnSliderLeft.onclick = () => {
        sliderDetails.forEach((item, index)=>{
            item.classList.remove('active')
            listThumb[index].classList.remove('active')
        })
        if(pssSliderDetail == 0) pssSliderDetail = sliderDetails.length
        pssSliderDetail--
        sliderDetails[pssSliderDetail].classList.add('active')
        listThumb[pssSliderDetail].classList.add('active')
    }

    listThumb.forEach((item, index) => {
        item.onclick = () => {
            for (let i = 0; i < listThumb.length; i++) {
                listThumb[i].classList.remove('active')
                sliderDetails[i].classList.remove('active')
            }
            item.classList.add('active')
            sliderDetails[index].classList.add('active')
        }
    })
}

const actionAddProduct = () => {
    let totals = 1
    let btnAddProduct = document.querySelectorAll('.product-detail__up button')
    let textTotals = document.querySelector('.product-detail__totals')
 
    btnAddProduct[1].onclick = () => {
        totals ++
        console.log(totals);
        textTotals.innerHTML = totals
        btnAddProduct[0].removeAttribute('disabled', 'disabled')
        // btnAddProduct[0].setAttribute('enabled', 'enabled')
    }

    btnAddProduct[0].onclick = () => {
        totals --
        console.log(totals);
        if(totals < 2){
            btnAddProduct[0].setAttribute('disabled', 'disabled')
        }
        textTotals.innerHTML = totals
    }

}



const getIdProduct = (listBtnView) => {
    console.log(listBtnView);
    const dataId = []
    function getId() {
        listBtnView.forEach((item, index)=>{
            dataId.push(item.getAttribute('data-id'))
        })
        return dataId
    }
    return getId
}



let viewDetails = (listBtnView, dataProductItem) => {
    const loadding = document.querySelector('.loadding')
    loadding.classList.add('loadding-active')

    setTimeout(function(){
        headerNav.classList.remove('header-nav--fixed')
        productDetails.style.display ='block'
        loaded.style.overflowY = 'hidden'
        overlay.style.visibility = 'visible'
        overlay.style.opacity = 1 
        loadding.classList.remove('loadding-active')
        
    },1000)

    overlay.onclick = function() {
        loaded.classList.remove('loaded-active')
        productDetails.style.display ='none'
        loaded.style.overflowY = 'visible'
        overlay.style.removeProperty('visibility');
        overlay.style.removeProperty('opacity');
        overlay.style.visibility = 'hidden'
        overlay.style.opacity = 0
        headerNav.classList.add('header-nav--fixed')
    }

    let htmls = ''
    const productDetailsElement = document.querySelector('.product-detail__single-row')

    var htmlsImages = dataProductItem.description[0].imagesDetails.map((imagesDetail,index)=>{
       return `
        <div class="product-detail__slider-item ${(index == 0) ? "active" : ""}" style="width: 402px; height:402px;" id="img-detail">
            <img src="${imagesDetail}" alt="" class="product-detail__slider-image"
            style="width: 400px; height: 400px;">
        </div>
       `
    }).join('')

    var htmlsImagesDetails = dataProductItem.description[0].imagesDetails.map((imagesDetail,index, array)=>{
        if(array.length >=0) {
            return `
            <div class="product-detail__thumbnail-item">
                <img src="${imagesDetail}" alt="" class="product-detail__thumbnail-image ${(index == 0) ? "active" : ""}" ${(index == 4) ? "hidden" : "active"}>
            </div>
            `
        }
    }).join('')

    htmls = `
    <div class="col col-lg-6 product-detail__gallery">
        <div class="product-detail__slider">
            <div class="product-detail__slider-list">
                ${htmlsImages}
            </div>
            <div class="product-detail__slider-control">
                <i class="product-detail__control-left fa-chevron-left fas"></i>
                <i class="product-detail__control-right fa-chevron-right fas"></i>
            </div>
        </div>

        <div class="product-detail__thumbnail">
            <div class="product-detail__thumbnail-list">
                ${htmlsImagesDetails}
            </div>
        </div>
    </div>

    <div class="col col-lg-6 product-detail__details">
        <div class="product-detail__details-wrapper">
            <h2 class="product-detail__details-title">
                ${dataProductItem.name}
            </h2>
            <div class="product-detail__ratings">
                <ul>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                    <li><i class="fas fa-star"></i></li>
                </ul>
                <p><a href="">(0 Comment)</a></p>
            </div>
            <div class="product-detail__price">
                <p class="product-detail__price-old">${dataProductItem.priceOld} đ</p>
                <p class="product-detail__price-new">${dataProductItem.priceOld} đ</p>
            </div>

            <p class="product-detail__status">Trạng thái: <b>${dataProductItem.description[0].status}</b></p>
            <p class="product-detail__desc">
            ${dataProductItem.description[0].descriptionDetails}
            </p>

                <div class="product-detail__color">
                    <label for="">COLOR:</label>
                    <b style="background-color: Yellow;">
                        <input type="radio" id="huey" name="drone" value="Yellow"checked>
                        Yellow
                    </b>
                    <b style="background-color: Red;">
                        <input type="radio" id="dewey" name="drone" value="Red">
                        Red
                    </b>
                    <b style="background-color: black;">
                        <input type="radio" id="dewey" name="drone" value="Black">
                        black
                    </b>
                </div>

                <div class="product-detail__action">
                    <div class="product-detail__up">
                        <button class="product-detail__minus" disabled>
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="product-detail__totals">1</span>
                        <button class="product-detail__plus">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="product-detail__cart">
                        <i class="fas fa-cart-arrow-down"></i>
                        <span>Thêm vào giỏ hàng</span>
                    </div>
                </div>
                <div class="product-detail__share">
                    <p>SHARE :</p>
                    <ul>
                        <li><a href=""><i class="fab fa-facebook"></i></a></li>
                        <li><a href=""><i class="fab fa-twitter"></i></a></li>
                        <li><a href=""><i class="fab fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    `
    productDetailsElement.innerHTML = htmls

    console.log(dataProductItem);
    // action Slider detail
    actionSliderDetail()

    // action add product
    actionAddProduct()

}

const scroll = () => {
    const ostHeaderNav = headerNav.offsetTop

    document.addEventListener('scroll', function(e){
        if(window.scrollY > ostHeaderNav) {
            headerNav.classList.add('header-nav--fixed')
        } else {
            headerNav.classList.remove('header-nav--fixed')
        }
    })
}

const App = ()=> {

    eventClick()

    renderProducts()

    // ZoomImages()
    // view product details
    scroll()
}

App()
