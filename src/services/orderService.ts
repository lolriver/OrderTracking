import ordersData from '../data/orders.json';
import { Order } from '../types/order';

const SIMULATED_DELAY_MS = 1000;
const SIMULATED_ERROR_RATE = 0.1; // 10% chance of failure

export const OrderService = {
    getOrders: (): Promise<Order[]> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const shouldFail = Math.random() < SIMULATED_ERROR_RATE;
                if (shouldFail) {
                    reject(new Error('Failed to fetch orders. Please pull to refresh.'));
                } else {
                    // Cast to unknown first if TS complains about JSON import type, but usually it works with resolveJsonModule 
                    // In Expo default TS config, resolveJsonModule is true.
                    resolve(ordersData as unknown as Order[]);
                }
            }, SIMULATED_DELAY_MS);
        });
    },

    getOrderById: (id: string): Promise<Order | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const order = (ordersData as unknown as Order[]).find(o => o.id === id);
                resolve(order);
            }, SIMULATED_DELAY_MS / 2); // Faster fetch for details
        });
    }
};
