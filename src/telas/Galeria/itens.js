import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import styles from "./style";

export default Itens = ({ item }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.itensContainer, { width }]}>
            <Image source={item.image} style={[styles.itensImage, { width, resizeMode: 'contain' }]}/>
        </View>
    );
}