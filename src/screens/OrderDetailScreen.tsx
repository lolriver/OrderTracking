import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../utils/colors';
import { Order, OrderItem } from '../types/order';

interface OrderDetailScreenProps {
    route: any;
    navigation: any;
}

export default function OrderDetailScreen({ route, navigation }: OrderDetailScreenProps) {
    const { order } = route.params as { order: Order };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `Order #${order.id}`,
        });
    }, [navigation, order.id]);

    const statusColor =
        order.status === 'Pending'
            ? Colors.status.pending
            : order.status === 'In Progress'
                ? Colors.status.inProgress
                : Colors.status.delivered;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.section}>
                <View style={styles.headerRow}>
                    <Text style={styles.orderId}>Order ID: {order.id}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                        <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                </View>
                <Text style={styles.date}>Placed on {order.date}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Delivery Details</Text>
                <Text style={styles.address}>{order.deliveryAddress}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Items ({order.items.length})</Text>
                {order.items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                        </View>
                        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    </View>
                ))}
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        padding: 16,
    },
    section: {
        backgroundColor: Colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    date: {
        color: Colors.secondaryText,
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: Colors.text,
    },
    address: {
        fontSize: 16,
        color: Colors.text,
        lineHeight: 24,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
        marginRight: 8,
        flexShrink: 1,
    },
    itemQuantity: {
        fontSize: 14,
        color: Colors.secondaryText,
    },
    itemPrice: {
        fontSize: 16,
        color: Colors.text,
        fontWeight: '600',
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});
