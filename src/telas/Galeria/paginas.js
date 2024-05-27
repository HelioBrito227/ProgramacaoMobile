import React from "react";
import { View, Text, Animated, useWindowDimensions } from "react-native";
import styles from "./style";

export default Paginas = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.pagina}> 
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                })

                return <Animated.View style={[styles.dot, { width: dotWidth }]} key={i.toString()} />;
            })}
        </View>
    )
}