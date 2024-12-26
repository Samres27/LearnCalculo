import { StyleSheet, Image, Platform, useColorScheme, View, Text, ScrollView, TextInput, Pressable } from 'react-native';

import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
interface QuestionObject {
  id: number;
  text: string;
  isCorrect: boolean;
}
interface QuestionFire {
  pregunta: string;
  Dificultad: Number;
  respuestas: Array<QuestionObject>;
}
const MAPPING = {
  'arrowright': 'arrowright.fill',  // Mapea a un nombre válido de MaterialIcons
  'check': 'check_circle',
  'close': 'close'
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;


export default function checkScreen() {

  const colorScheme = useColorScheme();
  const [titleQuest, setTitleQuest] = useState<string>("");
  const [responseQuest, setResponseQuest] = useState<Array<QuestionObject>>([]);
  const [indexQuestion, setIndexQuestion] = useState<number>(0);
  const [questionsArray, setQuestionArray] = useState<Array<QuestionFire>>([]);
  const [nextQuest, setNextQuest] = useState(false);
  var pregunta = {
    "preguntas": [
      {
        "pregunta": "Sabiendo que representa la funcion. Tiene pendiente -3 y ordenada en el origen -1",
        "Dificultad": 2,
        "respuestas": [
          {
            "id": 1,
            "text": "-3x-2",
            "isCorrect": false
          },
          {
            "id": 2,
            "text": "3x-3",
            "isCorrect": false
          },
          {
            "id": 3,
            "text": "-3x-1",
            "isCorrect": true
          },
          {
            "id": 4,
            "text": "-3x+2",
            "isCorrect": false
          }
        ]
      },
    ]
  }
  const opcionButon = (cosas: Number) => {
    console.log(cosas)
  }
  useEffect(() => {
    setQuestionArray(pregunta.preguntas);  // Carga inicial
    setIndexQuestion(0);
  }, []);

  useEffect(() => {
    if (questionsArray.length > 0) {
      setTitleQuest(questionsArray[indexQuestion]?.pregunta || '');  // ? para evitar errores si es undefined
      setResponseQuest(questionsArray[indexQuestion]?.respuestas || []);
    }
  }, [indexQuestion]);  // Elimina questionsArray de la dependencia
  return (
    <View style={styles.container}>
      <View style={styles.titleQuestionContainer}>
        <Text style={styles.titleTextQuestion}>{titleQuest}</Text>
      </View>

      <View style={styles.chatQuestion}>
        {responseQuest.map((question, index) => (
          <Pressable
            key={index}
            onPress={() => { opcionButon(index) }}
            style={styles.questionButton}
          >
            <Text style={styles.textQuestion} numberOfLines={1}>{question.text}</Text>
          </Pressable>))
        }
      </View>
      {/* {nextQuest || */}
      {
        <View style={styles.nextButton}>
          <Pressable>
          <AntDesign  name="arrowright" size={24} color="white" />
          </Pressable>
        </View>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
  },
  nextButton:{
    position: 'absolute',  
    bottom: 50,  
    right: 50,  
    
    alignItems:"center",
    alignContent:"center",
    justifyContent:"center",
    borderRadius:"10%",
    height:50,
    width:50,
    backgroundColor:Colors.light.color5,
    alignSelf:"flex-end",
    
  },
  titleQuestionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 30,
    gap: 8,
    height: "40%"
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
    textAlign: "center",
    margin: "auto",
  },
  questionButton: {

    backgroundColor: Colors.light.color4, // Color de fondo del contenedor
    height: "20%",
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