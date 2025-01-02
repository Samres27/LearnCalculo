import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { limit } from "firebase/firestore";

interface ProgressBarProps {
    value: number;  
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const targetWidth = value || 0;
        
        Animated.timing(animatedWidth, {
            toValue: targetWidth,
            duration: 500,  // Duración en ms (500ms)
            useNativeDriver: false,
        }).start();
    }, [value]);
    return(
        <View style={sytles.bar}>
            <Animated.View 
                style={[
                    sytles.progress, 
                    { width: animatedWidth.interpolate({
                        inputRange: [0, 6],
                        outputRange: ["0%", "100%"],  // Escala de 0 a 100%
                    }) }
                ]}
            />
        </View>
    );
}

const sytles=StyleSheet.create({
    
    bar: {
        height: 20,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: '#4caf50',  // Color de la barra
    },
})
export default ProgressBar