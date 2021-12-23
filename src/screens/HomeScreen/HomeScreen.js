import React, {useState, useEffect, Fragment} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';

import RestaurantCardComponent from 'RestaurantCardComponent/RestaurantCardComponent';
import SearchBarComponent from 'SearchBarComponent/SearchBarComponent';

import {
  _fetchUnicaRestaurants,
  _fetchKarkaRestaurants,
  _fetchSodexoRestaurants,
  _getFavoriteRestaurants,
} from 'constants/constants';

const HomeScreen = () => {
  //RestaurantData stays constants, is the one which search bar searces from
  const [restaurantData, setRestaurantData] = useState(null);
  //RenderedRestaurantData includes search results
  const [renderedRestaurantData, setRenderedRestaurantData] = useState(null);

  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  useEffect(() => {
    const _loadData = async () => {
      let promiseArray = [
        _fetchKarkaRestaurants(),
        _fetchUnicaRestaurants(),
        _fetchSodexoRestaurants(),
      ];
      let promiseAllArray = await Promise.all(promiseArray);
      let everyRestaurantData = promiseAllArray[0].concat(
        promiseAllArray[1],
        promiseAllArray[2],
      );

      let favoriteRestaurants = await _getFavoriteRestaurants();

      let orderedRestaurantData = await _orderRestaurantData(
        favoriteRestaurants,
        everyRestaurantData,
      );
      setFavoriteRestaurants(favoriteRestaurants);
      setRestaurantData(orderedRestaurantData);

      setRenderedRestaurantData(orderedRestaurantData);
    };
    _loadData();
  }, []);

  const _orderRestaurantData = async (favoriteRestaurants, restaurantData) => {
    let reorderedRestaurantData = [];
    restaurantData.forEach(restaurant => {
      if (favoriteRestaurants.includes(restaurant.name)) {
        //To the first index
        reorderedRestaurantData.unshift(restaurant);
      } else {
        //To the last index
        reorderedRestaurantData.push(restaurant);
      }
    });
    return reorderedRestaurantData;
  };

  const _renderMatchingRestaurants = matchingRestaurants => {
    setRenderedRestaurantData(matchingRestaurants);
  };

  const _renderItem = ({item}) => (
    <RestaurantCardComponent
      favoriteRestaurants={favoriteRestaurants}
      restaurantData={item}
    />
  );
  return (
    <View style={styles.view_container}>
      {renderedRestaurantData !== null ? (
        <Fragment>
          <SearchBarComponent
            renderMatchingRestaurants={_renderMatchingRestaurants}
            restaurantData={restaurantData}
          />
          <FlatList
            data={renderedRestaurantData}
            renderItem={_renderItem}
            keyExtractor={item => {
              return item.name;
            }}
          />
        </Fragment>
      ) : (
        <ActivityIndicator color={'black'} style={{alignSelf: 'center'}} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    justifyContent: 'center',
  },

  text_title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    margin: 26,
  },
});
export default HomeScreen;
