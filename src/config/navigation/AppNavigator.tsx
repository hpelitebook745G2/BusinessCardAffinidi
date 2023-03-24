import {colors} from '@/constants';
import {FORM, ITEM, LIST} from '@/constants/routes';
import {Layout} from '@config/theme';
import {FormScreen, ItemScreen, ListScreen} from '@containers';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '@utils';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Stack = createStackNavigator();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <SafeAreaView style={[Layout().fill, {backgroundColor: colors.white}]}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName={LIST}
          screenOptions={() => ({
            headerShown: false,
          })}>
          <Stack.Screen name={LIST} component={ListScreen} />
          <Stack.Screen name={FORM} component={FormScreen} />
          <Stack.Screen name={ITEM} component={ItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
