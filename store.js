// to make sure the cart functions even if the Javascript isnt fully loaded yet due to it being 'async'
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// the function that loads the relevant cart code
function ready() {
    var removeCartItemButtons = document.getElementsByClassName(`btn-dark`)

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button =removeCartItemButtons[i]
        button.addEventListener(`click`, removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)

    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)

    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    
}

// clicking purchase button empties the cart and alerts that items have been purchased
function purchaseClicked() {
    alert(`Thank you for your purchase`)
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// remove item button
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// make sure the number of items in cart is not 0 or a negative number
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value)  ||  input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// add item image, price, and item title to the cart when "add to cart" is clicked
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(imageSrc)
    if (imageSrc == `http://127.0.0.1:5500/Landing-Page/images/0.22lb-cricket-powder.png`) {
        imageSrc = `http://127.0.0.1:5500/Landing-Page/images/cricket-powder-in-cart.png`
    } else {
        imageSrc = `http://127.0.0.1:5500/Landing-Page/images/cricket-powder-premium-in-cart.png`
    }

    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

// function adding the image, price and title of an item to the cart when 'add to cart' button clicked
// checking if the item has already been added and alerting the user if it has
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-dark" type="button">REMOVE</button>
</div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-dark')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

// setting the remove from cart button variable
var removeCartItemButtons = document.getElementsByClassName(`btn-dark`)

// when 'remove' button is clicked, remove the image, title, and price of the item
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button =removeCartItemButtons[i]
    button.addEventListener(`click`, function(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
        
    })
}


// function to update the cart total by removing '$' then multiplying price by item quantity, then adding back the '$'
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

