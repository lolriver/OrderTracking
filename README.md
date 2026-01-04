# React Native Order Tracking App

A simple mobile application built with React Native and Expo to track orders. This project simulates fetching order data from a backend and displays it in a clean, user-friendly interface.

## 📱 Features

- **Order List**: View a scrollable list of orders with their status, date, and total amount.
- **Order Details**: Tap on any order to view detailed information, including line items, delivery address, and status.
- **Visual Status Styles**: Orders are color-coded based on their status (Pending = Yellow, In Progress = Blue, Delivered = Green).
- **Simulated API**: Data usage simulates a real network request with random latency and occasional failure (10% chance).
- **Pull-to-Refresh**: Easily refresh the order list.
- **Error Handling**: Friendly error messages with a retry option.

## 🛠️ Tech Stack

- **React Native** (Expo Managed Workflow)
- **TypeScript**
- **React Navigation** (Stack Navigator)
- **Safe Area Context**

## 📂 Folder Structure

```
src/
 ├── components/       # Reusable UI components (e.g., OrderCard)
 ├── screens/          # Application screens (OrderList, OrderDetail)
 ├── navigation/       # Navigation configuration
 ├── data/             # Mock data files
 ├── types/            # TypeScript type definitions
 ├── utils/            # Utilities and constants (e.g., colors)
 └── services/         # Data fetching services
```

## 🚀 Setup Instructions

1.  **Prerequisites**: Ensure you have Node.js installed.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the App**:
    ```bash
    npx expo start
    ```
4.  **Run on Device/Simulator**:
    - Scan the QR code with the Expo Go app (Android/iOS).
    - Press `w` for Web or `i` for iOS Simulator / `a` for Android Emulator.

## 📝 Assumptions & Decisions

- **Mock Data**: Uses a local JSON file to simulate order history.
- **Navigation**: Uses `@react-navigation/stack` for standard native-feel transitions.
- **Styling**: Uses standard React Native `StyleSheet` for performance and simplicity, avoiding external UI libraries to keep the bundle small.
- **State Management**: Uses React local state (`useState`, `useEffect`) as global state management (Redux/Context) would be over-engineering for this scope.

## 🐛 Troubleshooting

If you see "Something went wrong" on the Expo Go app:
1.  **Clear Cache**: Run `npx expo start -c`
2.  **Network Issues**: Ensure phone and computer are on the same Wi-Fi.
3.  **Tunnel Mode**: If LAN fails, try running `npx expo start --tunnel`.

## 🌍 Web Deployment

To host this app on the web (like a website):

1.  **Build the App**:
    ```bash
    npm run build:web
    ```
    This creates a `dist` folder with your static website.

2.  **Deploy**:
    - **Netlify/Vercel**: Simply drag and drop the `dist` folder onto their dashboard.
    - **GitHub Pages**: You can also host it on GitHub Pages.



## 🧪 Verification

- The app compiles cleanly with TypeScript.
- Navigation ensures proper back stack management.
- Safe Area views are used to handle notches and home indicators.
