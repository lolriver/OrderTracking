import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, RefreshControl, Button } from 'react-native';
import { Order } from '../types/order';
import { OrderService } from '../services/orderService';
import { OrderCard } from '../components/OrderCard';
import { Colors } from '../utils/colors';

// We'll define navigation types in the Navigator but use any here for expediency as importing from a file not yet created might pass TS check but is circular conditionally.
interface OrderListScreenProps {
    navigation: any;
}

export default function OrderListScreen({ navigation }: OrderListScreenProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrders = useCallback(async (isRefresh = false) => {
        try {
            setError(null);
            if (!isRefresh) setLoading(true);

            const data = await OrderService.getOrders();
            setOrders(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders(true);
    };

    const renderItem = ({ item }: { item: Order }) => (
        <OrderCard
            order={item}
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
        />
    );

    if (loading && !refreshing) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>{error}</Text>
                <Button title="Try Again" onPress={() => fetchOrders(false)} color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>No orders found.</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: Colors.error,
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    emptyText: {
        color: Colors.secondaryText,
        fontSize: 16,
    }
});
