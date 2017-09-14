define([
  'lodash',
], function(_) {
  'use strict';

  var ordersTableVMServiceImpl = function ordersTableVMServiceImpl() {
    var formatTableData = function formatTableData(storeData) {
      var orders = _.cloneDeep(storeData.ordersStore.orders);
      var tableData = []
      // var titles = Object.keys(storeData.ordersStore.orders[0]);
      // titles = titles.map(function(key){
      //   return {
      //     name: key,
      //     label: key
      //   }
      // });

      var titles = [
        {
          name: 'exchange',
          label: 'Exchange'
        },
        {
          name: 'quantity',
          label: 'Quantity'
        },
        {
          name: 'limit',
          label: 'Limit'
        },
        {
          name: 'goalChange',
          label: '% to Goal'
        }
      ]
      // for(var coin in orders) {
      //   var wallet = orders[coin];
      //   wallet.currency = coin;
      //   tableData.push(wallet);
      // }
      console.log(titles);
      return {
        data: orders,
        titles: titles
      }
    };
  
    return {
      formatTableData: formatTableData
    }
  };

  return ordersTableVMServiceImpl;
});
