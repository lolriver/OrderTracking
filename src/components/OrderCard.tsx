import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../types/order';
import { Colors } from '../utils/colors';

interface OrderCardProps {
    order: Order;
    onPress: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
    const statusColor =
        order.status === 'Pending'
            ? Colors.status.pending
            : order.status === 'In Progress'
                ? Colors.status.inProgress
                : Colors.status.delivered;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.header}>
                <Text style={styles.idText}>{order.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.dateText}>{order.date}</Text>
                <Text style={styles.amountText}>${order.totalAmount.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Elevation for Android
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    idText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    statusText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: Colors.secondaryText,
        fontSize: 14,
    },
    amountText: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text,
    },
});
