import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getCartApi } from '../../apis/cart'
import { useState } from 'react'
import { getProductById } from '../../../server/db/product'


function Cart () {
  const { isLoading, data } = useQuery('getCart', async () => {
    const cart = await getCartApi(1)
    console.log('inside useQuery, here is the cart: ', cart)
    const productsInCart = cart.map(async item => await getProductById(item.productId))
    console.log('inside useQuery, here is the productsInCart: ', productsInCart)
    return cart
  })

  //const [cart, setCart] = useState(data)

console.log(data)

  return (
    <>
      <p>On Cart page</p>
    </>
  )
}

export default Cart

//Run getCart to get all of the cart.
//For each item in the cart, run through and put the id into getProductById, and then store each banana into a seperate array in a state.
//Loop through the cart items, displaying all the details from the matching item in the detailed array. 
//For the price, take the price of the item and multiply it by the quantity.
//Create a combined array? Store it in state.

//Store state of total cost of cart, by going through cart items and adding up the total cost.
//When user clicks on increase/decrease quantity, run updateQuantity function.
//When user clicks on remove button for an item, run removeFromCartById
//A button that, when the user clicks will run clearCart.
//When user clicks on Checkout, clearCart() and redirect to a thank you page.
