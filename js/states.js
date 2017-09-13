define([], function() {
  var states = {
    orders: {
      url: 'orders/',
      path: '/orders',
      controller: 'OrdersController as OrdersCtrl'
    },
    watchlist: {
      url: 'watchlist/',
      path: '/watchlist',
      controller: 'WatchlistController as WatchlistCtrl'
    },
    indicators: {
      path: 'currency/',
      url: '/currency/{currency}',
      controller: 'CurrencyController as CurrencyCtrl'
    },
    news: {
      path: 'news/',
      url: '/news',
      controller: 'NewsController as NewsCtrl'
    }
  };
  return states;
});
