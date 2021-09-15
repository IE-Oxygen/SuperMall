export default{
  addCart(context, payload){
    return new Promise((resolve) =>{
      let oldGoods = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldGoods){
        context.commit('addCount',oldGoods);
        resolve('当前商品数量+1')
      }else{
        context.commit('addToCart',payload);
        resolve('添加了新的商品')
      }
    })
  }
}