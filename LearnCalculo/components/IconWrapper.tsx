import { Colors } from '@/constants/Colors';
import React, { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface IconWrapperProps {
  children: ReactNode;
  size?: number; // Tamaño opcional del círculo, con valor predeterminado de 60
}

const IconWrapper: FC<IconWrapperProps> = ({ children, size = 60 }) => (
  <View style={[styles.iconWrapper, { width: size, height: size, borderRadius: size / 2 }]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: Colors['light'].color1, // Fondo del círculo
    justifyContent: 'center', // Centra el icono horizontalmente
    alignItems: 'center', // Centra el icono verticalmente
  },
});

export default IconWrapper;
