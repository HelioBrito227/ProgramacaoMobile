import React, { useState, useRef } from "react";
import { Text, View, FlatList, Animated } from "react-native";

import Itens from "./itens";
import slider from "./slider";
import Paginas from "./paginas";
import styles from "./style";
import NavBar from "../NavBar";


export default function Galeria({navigation}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const sliderRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={slider}
                    renderItem={({ item }) => <Itens item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,

                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={sliderRef}
                />
            </View>
            
            <Paginas data={slider} scrollX={scrollX} />
            
            <NavBar navigation={navigation}/>
        </View>

    );
};