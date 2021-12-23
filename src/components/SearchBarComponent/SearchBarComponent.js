import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {_searchRestaurantNames} from 'constants/constants';

const SearchBarComponent = props => {
  const {restaurantData, renderMatchingRestaurants} = props;

  const _searchTermChanged = newSearchTerm => {
    let matchingRestaurants = _searchRestaurantNames(
      newSearchTerm,
      restaurantData,
    );

    renderMatchingRestaurants(matchingRestaurants);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Hae ravintoloita'}
        placeholderTextColor={'gray'}
        style={styles.text_input}
        onChangeText={_searchTermChanged}></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'black',
  },
  text_input: {
    marginHorizontal: 16,
    marginVertical: 8,
    fontSize: 20,
    color: 'black',
    fontFamily: 'Outfit-Bold',
  },
});
export default SearchBarComponent;
