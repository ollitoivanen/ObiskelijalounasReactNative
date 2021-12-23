import React, {Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const RestaurantCardMenuComponent = props => {
  const {menu} = props;

  const _renderMenu = () => {
    return (
      <View>
        {menu.map(meal => {
          return (
            <Fragment key={meal.name}>
              <View style={styles.view_header_row_container}>
                <Text style={styles.text_header_meal_type}>{meal.type}</Text>
                <Text style={styles.text_price}>{meal.price}</Text>
              </View>
              <Text style={styles.text_meal_name}>{meal.name}</Text>
            </Fragment>
          );
        })}
      </View>
    );
  };
  return <View style={styles.view_container}>{_renderMenu()}</View>;
};
const styles = StyleSheet.create({
  view_container: {
    backgroundColor: 'white',
  },

  view_header_row_container: {
    flexDirection: 'row',
    margin: 24,
    marginBottom: 4,
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  text_header_meal_type: {
    color: 'black',
    fontFamily: 'Outfit-Bold',
    fontSize: 16,
  },

  text_price: {
    color: 'gray',
    fontFamily: 'Outfit-Bold',
    marginStart: 6,
    fontSize: 14,
  },

  text_meal_name: {
    color: 'black',
    fontFamily: 'Outfit-Regular',
    fontSize: 16,
    marginStart: 30,
    marginBottom: 12,
  },
});
export default RestaurantCardMenuComponent;
