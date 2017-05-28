import { StyleSheet } from 'react-native';


let styles = StyleSheet.create({
  grey: {
    color: "#9e9e9e"
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    fontSize: 24,
    color: '#626262',
    fontWeight: 'bold'
  },
  navbar: {
    backgroundColor: '#cb0051',
    height: 65,
    alignSelf: 'stretch'
  },
  navbar_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  navbar_search: {
    flex: .5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  navbar_icons: {
    paddingHorizontal: 20,
  },
  navbar_search_input: {
    backgroundColor: '#fff',
    flex: 1,
    height: 32,
    borderRadius: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  txt_search_button: {
    paddingVertical: 7,
    paddingLeft: 5,
    flex: 1
  },
  home_categori: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  home_categori_list: {
    width: 100,
    height: 100,
    margin: 10,
    alignItems: 'center',
  },
  home_kategori_icon: {
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 100/2,
    justifyContent: 'center'
  },
  home_kategori_icon_bg1: {
    backgroundColor: '#d8edd7'
  },
  home_kategori_icon_bg2: {
    backgroundColor: '#ec9191'
  },
  home_kategori_icon_bg3: {
    backgroundColor: '#acd7dd'
  },
  home_kategori_icon_bg4: {
    backgroundColor: '#e8caab'
  },
  home_kategori_icon_bg5: {
    backgroundColor: '#d1e0e3'
  },
  home_kategori_icon_bg6: {
    backgroundColor: '#ffe093'
  },
  text_home_kategori: {
    fontWeight: 'bold',
    color: '#626262'
  },
  // list_products
  list_container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listview_container: {
    width: 155,
    minHeight: 250,
    margin: 5,
    borderWidth: 1,
    borderColor: '#dedede',
    borderStyle: 'solid',
    borderRadius: 4
  },
  listview_container2: {
    width: 155,
    height: 180,
    padding: 3,
    paddingRight: 5
  },
  listview_thumbnail: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  listview_thumbnail_info_container: {
    flex: 1,
    flexDirection: 'column'
  },
  listview_thumbnail_info: {
    flex: .3,
    flexDirection: 'row',
    alignSelf:'stretch',
    padding: 3,
    justifyContent: 'flex-start'
  },
  listview_todetail_container: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 3,
    justifyContent: 'flex-start'
  },
  listview_todetail_btn: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: 150,
    height: 150
  },
  listview_thumbnail_info_button: {
    padding: 5,
    backgroundColor: 'rgba(233, 30, 99, 1)',
    borderRadius: 4
  },
  listview_thumbnail_info_discount: {
    color: '#fff',
    borderRadius: 3,
    backgroundColor: '#e91e63'
  },
  listview_product_name: {
    paddingVertical: 5,
    fontSize: 12,
    color: '#626262',
    height: 35
  },
  listview_seller_name: {
    fontWeight: 'normal',
    color: '#bbbbbb',
    fontSize: 12,
    paddingBottom: 2
  },
  listview_feedback: {
    fontWeight: 'normal',
    color: '#bbbbbb',
    fontSize: 12
  },
  listview_discount_price: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 2
  },
  listview_min_pay: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingVertical: 3
  },
  listview_premiun_account: {
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

export default styles;
