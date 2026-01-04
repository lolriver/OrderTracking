import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Order } from '../types/order';
import OrderListScreen from '../screens/OrderListScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import { Colors } from '../utils/colors';

export type RootStackParamList = {
    OrderList: undefined;
    OrderDetail: { order: Order };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="OrderList"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.card,
                    },
                    headerTintColor: Colors.primary,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: Colors.text,
                    },

                }}
            >
                <Stack.Screen
                    name="OrderList"
                    component={OrderListScreen}
                    options={{ title: 'My Orders' }}
                />
                <Stack.Screen
                    name="OrderDetail"
                    component={OrderDetailScreen}
                    options={{ title: 'Order Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
