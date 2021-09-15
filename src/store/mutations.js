
export default {
  addCount(state, oldGoods){
      oldGoods.count++;
  },
  addToCart(state, payload){
    payload.count = 1;
    state.cartList.push(payload);
  },
  checkGoods(state, index){
    state.cartList[index].checked = !state.cartList[index].checked
  },
  showLoading(state){
    state.isLoading = true
  },
  hiddenLoading(state){
    state.isLoading = false
  }
}