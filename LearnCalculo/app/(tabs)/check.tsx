import { StyleSheet, Image, Platform, useColorScheme, View, Text, ScrollView, TextInput, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import IconWrapper from '@/components/IconWrapper';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export default function checkScreen() {
  const colorScheme = useColorScheme();
  const [questionLabel, setQuestionLabel] = useState("pregunta la cual quienen que contestar");
  const [listQuest,setListQuest]=useState(["pregunta1","pregunta2","pregunta3","pregunta4"]);
  const opcionButon=(cosas:Number)=>{
    console.log(cosas)
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleQuestionContainer}>
        <Text style={styles.titleTextQuestion}>{questionLabel}</Text>
      </View>

      <View style={styles.chatQuestion}>
        {listQuest.map((question,index)=>(<Pressable
          onPress={()=>{opcionButon(index)}}
            style={styles.questionButton }>
            <Text style={styles.textQuestion} numberOfLines={1}>{question}</Text>
          </Pressable>))
          
        }
          
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
  },
  titleQuestionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    gap: 8,
    height:"40%"
  },
  chatQuestion: {
    height: "40%", // Ocupa el 70% de la altura de la pantalla
    alignItems: "center",
  },
  titleTextQuestion: {
    fontSize: 32,
    textAlign: "center",
  },
  textQuest: {
    fontSize: 14,
    width: "70%",
    flex: 1, // Permite que el texto ocupe todo el espacio disponible
    flexWrap: "wrap", // Hace que el texto se envuelva si es necesario
    textAlignVertical: "top", // Evita que el texto se recorte
    padding: 10
  },
  textQuestion: {
    fontSize: 16,
    width: "100%",
    textAlign:"center",
    margin:"auto",
  },
  questionButton: {
    
    backgroundColor: Colors.light.color4, // Color de fondo del contenedor
    height:"20%",
    borderRadius: 25, // Bordes redondeados
    width: "90%", // Anchura del contenedor
    overflow: "hidden", // Corta cualquier contenido que sobresalga
    margin: 10,
  },
  bubleQuest: {
    borderColor: Colors.light.color5, // Color del borde
    backgroundColor: "#D9D9D9", // Color de fondo del contenedor
    borderWidth: 2, // Ancho del borde
    borderRadius: 10, // Bordes redondeados
    width: "90%", // Anchura del contenedor
    justifyContent: "flex-end",
    overflow: "hidden", // Corta cualquier contenido que sobresalga
    alignSelf: "flex-end",
    margin: 10,
  },
  Quest: {
    flexDirection: "row",
    borderColor: Colors.light.color5, // Color del borde
    backgroundColor: "#D9D9D9", // Color de fondo del contenedor
    borderWidth: 2, // Ancho del borde
    borderRadius: 10, // Bordes redondeados
    width: "95%", // Anchura del contenedor
    justifyContent: "space-between",
    overflow: "hidden", // Corta cualquier contenido que sobresalga
    alignSelf: "flex-end",
    margin: 10,
    alignItems: "center", // Alinea los elementos en la parte superior del contenedor
    flexWrap: "wrap", // Permite que el contenido se envuelva a la siguiente línea si es necesario
    gap: 10, // Espacio entre el texto y el ícono
    padding: 2
  },
});