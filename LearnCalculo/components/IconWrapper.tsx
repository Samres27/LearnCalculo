import { Colors } from '@/constants/Colors';
import React, { FC, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface IconWrapperProps {
  children: ReactNode;
}

const IconWrapper: FC<IconWrapperProps> = ({ children }) => (
  <View style={styles.iconWrapper}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  iconWrapper: {
    width: 60, // Ajusta el tamaño del círculo
    height: 60,
    borderRadius: 30, // Hace el contenedor redondo
    backgroundColor: Colors['light'].color1, // Fondo del círculo
    justifyContent: 'center', // Centra el icono horizontalmente
    alignItems: 'center', // Centra el icono verticalmente
  },
});

export default IconWrapper;