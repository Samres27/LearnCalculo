import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { Colors } from "@/constants/Colors";
import IconWrapper from "@/components/IconWrapper";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import { CohereClient } from "cohere-ai";

interface Message {
  role: 'USER' | 'CHATBOT';  // El role puede ser 'USER' o 'CHATBOT'
  message: string;           // El contenido del mensaje
}

export default function HomeScreen() {
  const [question, setQuestion] = useState("");
  const [listQuestion, setListQuestion] = useState<Message[]>([]);
  const cohere = new CohereClient({
    token: process.env.EXPO_PUBLIC_API_KEY_COHERE,
  });
  
  const chatHistory:Message[] = [
    {
      role: 'USER',
      message: '¿Cuál es el resultado de 2 + 3?'
    },
    {
      role: 'CHATBOT',
      message: 'El resultado de 2 + 3 es 5.'
    },
    {
      role: 'USER',
      message: '¿Cuántos años tiene una persona que nació en 1990 y hoy es 2024?'
    },
    {
      role: 'CHATBOT',
      message: 'La persona tiene 34 años.'
    }
  ];
  const promptInit = `
Responde a las preguntas de cálculo en español. 
Habla como un profesor que quiere enseñar a un estudiante Cálculo . Explica los conceptos de manera clara y detallada, y usa ejemplos sencillos cuando sea necesario.
`

  // Función para manejar las solicitudes de chat
  async function handleChatRequest(prompt: string) {
    try {
      // Realiza la solicitud a la API de Cohere con el prompt personalizado
      const respuestas = await cohere.chat({
        model: 'command',
        message: promptInit + '\n\n' + prompt,
        temperature: 0.7,
        k: 0,
        p: 0.9,
        chatHistory:[...chatHistory,...listQuestion]
      });

      // Extrae la respuesta generada
      const generatedResponse = respuestas;
      console.log(respuestas);
      return generatedResponse.text;
    } catch (error) {
      console.error('Error al realizar la solicitud a Cohere:', error);
      return 'Lo siento, no pude procesar tu solicitud.';
    }
  }

  const llamadaApi = async () => {
    const userPrompt = question;
    console.log(question);
    setListQuestion(prevList => [
      ...prevList,
      { "message": question, "role": "USER" }
    ]);
    setQuestion("");
    handleChatRequest(userPrompt).then(respuesta => {
      
      setListQuestion(prevList => [
        ...prevList,
        { "message": respuesta.toString(), "role": "CHATBOT" }
      ]);
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.textTitle}>Pregunta a tu tutor</Text>
      </View>

      <ScrollView style={styles.chat}>
        {listQuestion.map((item, index) => (
          <View
            key={index}
            style={item.role == 'CHATBOT' ? styles.bubleResponse : styles.bubleQuest}>
            <Text style={styles.textQuestion}>{item.message}</Text>
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
        <Pressable
          onPress={llamadaApi}
        >
          <IconWrapper size={40}>
            <IconSymbol
              size={25}
              name="paperplane.fill"
              color={Colors.light.color3}
            />
          </IconWrapper>
        </Pressable>

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
    padding: 10
  },
  textQuestion: {
    fontSize: 16,
    width: "100%",
    flex: 1, // Permite que el texto ocupe todo el espacio disponible
    flexWrap: "wrap", // Hace que el texto se envuelva si es necesario
    textAlignVertical: "top", // Evita que el texto se recorte
    padding: 10
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
    padding: 2
  },
});
