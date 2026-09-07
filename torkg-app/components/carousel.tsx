import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    Dimensions,
    StyleSheet,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    Text,
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

interface CarouselItem {
    id: number;
    image: any;
    title?: string;
}

interface Props {
    data: CarouselItem[];
    autoPlay?: boolean;
    interval?: number;
    height?: number;
}

export default function Carousel({ data, autoPlay = true, interval = 3000, height = 180 }: Props) {
    const flatListRef = useRef<FlatList>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const currentIndexRef = useRef(0);
    const [index, setIndex] = useState(0);
    const animatedIndex = useSharedValue(0);
    const isInteractingRef = useRef(false);

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const visibleIndex = viewableItems[0].index ?? 0;
            currentIndexRef.current = visibleIndex;
            setIndex(visibleIndex);
            animatedIndex.value = visibleIndex;
        }
    });

    const getItemLayout = useCallback(
        (_: any, itemIndex: number) => ({
            length: width,
            offset: width * itemIndex,
            index: itemIndex,
        }),
        []
    );

    const goToIndex = useCallback(
        (nextIndex: number) => {
            if (!flatListRef.current || data.length === 0) return;
            try {
                flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
            } catch (err) {
                flatListRef.current.scrollToOffset({ offset: nextIndex * width, animated: true });
            }
            currentIndexRef.current = nextIndex;
            setIndex(nextIndex);
            animatedIndex.value = nextIndex;
        },
        [data.length]
    );

    useEffect(() => {
        if (!autoPlay || data.length <= 1) return;

        const start = () => {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                if (isInteractingRef.current) return;
                const next = (currentIndexRef.current + 1) % data.length;
                goToIndex(next);
            }, interval);
        };

        start();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [autoPlay, interval, data.length, goToIndex]);

    const handleTouchStart = () => {
        isInteractingRef.current = true;
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    const handleTouchEnd = () => {
        isInteractingRef.current = false;
        if (autoPlay && data.length > 1) {
            timerRef.current = setInterval(() => {
                if (isInteractingRef.current) return;
                const next = (currentIndexRef.current + 1) % data.length;
                goToIndex(next);
            }, interval);
        }
    };

    const onMomentumScrollEnd = (_e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = _e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / width);
        currentIndexRef.current = newIndex;
        setIndex(newIndex);
        animatedIndex.value = newIndex;
    };

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={data}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                getItemLayout={getItemLayout}
                viewabilityConfig={viewabilityConfig.current}
                onViewableItemsChanged={onViewableItemsChanged.current}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onScrollEndDrag={handleTouchEnd}
                onMomentumScrollEnd={onMomentumScrollEnd}
                renderItem={({ item }) => (
                    <Pressable style={{ width, height }}>
                        <View style={{ width: 380, height: "100%", position: "relative" }}>
                            <Image
                                source={item.image}
                                style={{ width: "100%", height: "100%", borderRadius: 14 }}
                                contentFit="cover"
                            />

                            {/* BADGE */}
                            <View
                                style={{
                                    position: "absolute",
                                    bottom: 12,
                                    left: 12,
                                    backgroundColor: "rgba(0,165,172,0.8)",
                                    paddingHorizontal: 10,
                                    paddingVertical: 4,
                                    borderRadius: 12,
                                }}
                            >
                                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                                    {item.title ?? "Título"}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}

            />

            {/* Indicadores */}
            <View style={[styles.dotsContainer]}>
                {data.map((_, i) => {
                    const animatedStyle = useAnimatedStyle(() => ({
                        width: animatedIndex.value === i ? 18 : 8,
                        height: 8,
                        borderRadius: 8,
                        marginHorizontal: 4,
                        backgroundColor: animatedIndex.value === i ? "rgba(0,165,172,0.8)" : "#ccc",
                    }));
                    return <Animated.View key={i} style={[styles.dot, animatedStyle]} />;
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 8,
    },
    dot: {
        // propriedades visuais básicas; as animadas substituem a largura/ cor
    },
});
