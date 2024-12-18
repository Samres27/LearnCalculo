import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  TextInput,
} from "react-native";
import { Colors } from "@/constants/Colors";
import IconWrapper from "@/components/IconWrapper";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
export default function HomeScreen() {
  const [question, setQuestion] = useState("");
  const [listQuestion,setListQuestion]= useState([{"texto":"Respuesta de la pregunta","tipo":"respuesta"},{"texto":"Pregunta a responder","tipo":"pregunta"}]);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Pregunta a tu tutor</Text>
      </View>

      <ScrollView style={styles.chat}>
        {listQuestion.map((item, index)=>(
          <View style={item.tipo=='respuesta'?styles.bubleResponse : styles.bubleQuest}>
          <Text style={styles.textQuestion}>{item.texto}</Text>
        </View>
        
        ))}
        
      </ScrollView>

      <View style={styles.Quest}>
        <TextInput
          style={styles.textQuest}
          placeholder="Escribe tu pregunta aquí..." // Texto que aparece cuando el campo está vacío
          value={question}
          onChangeText={(text) => setQuestion(text)} // Actualiza el estado cuando el texto cambia
          multiline={true}
          numberOfLines={4} // Permite que el campo sea multilinea
          // Número de líneas visibles del campo de texto
        />
        <IconWrapper size={40}>
          <IconSymbol
            size={25}
            name="paperplane.fill"
            color={Colors.light.color3}
          />
        </IconWrapper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    gap: 8,
  },
  chat: {
    height: "70%", // Ocupa el 70% de la altura de la pantalla
  },
  textTitle: {
    fontSize: 32,
  },
  textQuest: {
    fontSize: 14,
    width: "70%",
    flex: 1, // Permite que el texto ocupe todo el espacio disponible
    flexWrap: "wrap", // Hace que el texto se envuelva si es necesario
    textAlignVertical: "top", // Evita que el texto se recorte
    padding:10
  },
  textQuestion: {
    fontSize: 16,
    width: "70%",
    flex: 1, // Permite que el texto ocupe todo el espacio disponible
    flexWrap: "wrap", // Hace que el texto se envuelva si es necesario
    textAlignVertical: "top", // Evita que el texto se recorte
    padding:10
  },
  bubleResponse: {
    borderColor: Colors.light.color1, // Color del borde
    backgroundColor: "#D9D9D9", // Color de fondo del contenedor
    borderWidth: 2, // Ancho del borde
    borderRadius: 10, // Bordes redondeados
    width: "90%", // Anchura del contenedor
    justifyContent: "flex-start",
    overflow: "hidden", // Corta cualquier contenido que sobresalga
    alignSelf: "flex-start",
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
    padding:2
  },
});
