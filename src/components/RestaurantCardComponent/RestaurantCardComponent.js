import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import RestaurantCardMenuComponent from 'RestaurantCardMenuComponent/RestaurantCardMenuComponent';

import {
  _checkIfRestaurantIsFavorite,
  _getFavoriteRestaurants,
  _storeFavoriteRestaurants,
} from 'constants/constants';

const RestaurantCardComponent = props => {
  //This doesn't update when users presses favorite icon, only when app relaunches.
  const {favoriteRestaurants, restaurantData} = props;
  const {name, url, openHours, menu} = restaurantData;
  const [favoriteRestaurant, setFavoriteRestaurant] = useState(false);

  useState(() => {
    if (_checkIfRestaurantIsFavorite(name, favoriteRestaurants)) {
      setFavoriteRestaurant(true);
    }
  }, []);

  const _determineFavoriteIcon = () => {
    if (favoriteRestaurant) {
      return require('images/favorite_full.png');
    }
    return require('images/favorite_border.png');
  };

  const _onFavoriteIconPress = async () => {
    let currentFavoriteRestaurants = await _getFavoriteRestaurants();
    if (!Array.isArray(currentFavoriteRestaurants)) return;
    if (_checkIfRestaurantIsFavorite(name, currentFavoriteRestaurants)) {
      await _removeFavoriteRestaurant(name, currentFavoriteRestaurants);
    } else {
      await _addFavoriteRestaurant(name, currentFavoriteRestaurants);
    }
  };

  const _addFavoriteRestaurant = async (
    newFavoriteRestaurant,
    currentFavoriteRestaurants,
  ) => {
    //Immediately change to full heart to give user feedback
    setFavoriteRestaurant(true);
    currentFavoriteRestaurants.push(newFavoriteRestaurant);
    const success = await _storeFavoriteRestaurants(currentFavoriteRestaurants);
    if (success === undefined) setFavoriteRestaurant(false);
  };

  const _removeFavoriteRestaurant = async (
    name,
    currentFavoriteRestaurants,
  ) => {
    setFavoriteRestaurant(false);

    const indexOfRestaurant = currentFavoriteRestaurants.indexOf(name);
    currentFavoriteRestaurants.splice(indexOfRestaurant, 1);

    await _storeFavoriteRestaurants(currentFavoriteRestaurants);
  };

  const _accessWebsite = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.view_container}>
      <View style={styles.view_row_container}>
        <TouchableOpacity activeOpacity={0.9} onPress={_accessWebsite}>
          <Text style={styles.text_restaurant_name}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => await _onFavoriteIconPress()}>
          <Image
            style={styles.image_favorite}
            source={_determineFavoriteIcon()}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.text_restaurant_open_hours}>{openHours}</Text>
      <RestaurantCardMenuComponent menu={menu} />
    </View>
  );
};
const styles = StyleSheet.create({
  view_container: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 16,
    paddingVertical: 16,
    borderColor: 'black',
    borderWidth: 3,
    paddingEnd: 16,
  },

  view_row_container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 16,
  },

  image_favorite: {
    height: 24,
    width: 24,
  },

  text_restaurant_name: {
    color: 'black',
    fontFamily: 'Outfit-Bold',
    fontSize: 24,
    marginEnd: 12,
  },

  text_restaurant_open_hours: {
    color: 'black',
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginStart: 20,
    marginTop: 0,
  },
});
export default RestaurantCardComponent;
