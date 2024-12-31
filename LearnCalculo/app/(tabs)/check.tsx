import { StyleSheet, Image, Platform, useColorScheme, View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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
interface requestQuest {
  topic: string;
  data: {
    numero: number;
    respondidas: number;
  };
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

type ButtonState = {
  [key: number]: string;
};
const firebaseConfig = {
  apiKey: process.env.USER_API_Firebase,
  authDomain: "calculando-f8af8.firebaseapp.com",
  projectId: "calculando-f8af8",
  storageBucket: "calculando-f8af8.firebasestorage.app",
  messagingSenderId: "68303837221",
  appId: "1:68303837221:web:c75000aa388ef9360947cc"
};
const app = initializeApp(firebaseConfig);
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { string } from 'cohere-ai/core/schemas';


const db = getFirestore(app);

export default function checkScreen() {

  const colorScheme = useColorScheme();
  const [titleQuest, setTitleQuest] = useState<string>("");
  const [responseQuest, setResponseQuest] = useState<Array<QuestionObject>>([]);
  const [indexQuestion, setIndexQuestion] = useState<number>(1);
  const [questionsArray, setQuestionArray] = useState<Array<QuestionFire>>([]);
  const [listNumberQuest, setListNumberQuest] = useState<Array<requestQuest>>([]);
  const [nextQuest, setNextQuest] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState<ButtonState>({});
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("4Gjmz4lTH20kfCwKAWgt");
  const [stateLoad, setStateLoad] = useState(false);

  const opcionButon = (index: number) => {
    if (!nextQuest) {
      const indexCorrect = responseQuest.findIndex((q) => q.isCorrect)
      console.log(indexCorrect,index)
      if (indexCorrect !== -1 && indexCorrect !== index) {
        setSelectedButtons((prev) => {
          const nextColor = responseQuest[indexCorrect].isCorrect ? Colors.light.colorCorrect : Colors.light.colorError
          return { ...prev, [indexCorrect]: nextColor };
        })
        console.log("incorrecto,respuesta")
      } else {
        setScore((prev) => { return (prev + 1) });
        const topicQuest = getTopicQuest();
        console.log("correcto,respuesta")
        if (topicQuest) {
          const questIndex = listNumberQuest.findIndex(
            (item) => item.topic === topicQuest.topic
          );
          console.log("encontro el topico,respuesta")
          if (questIndex !== -1) {
            setListNumberQuest((prev) => {
              if (questIndex < 0 || questIndex >= prev.length) return prev;  // Validación de índice

              // Clonar y actualizar el elemento
              const updatedList = prev.map((item, index) =>
                index === questIndex
                  ? {
                    ...item,
                    data: {
                      ...item.data,
                      respondidas: item.data.respondidas + 1,
                    },
                  }
                  : item
              );
              
              return updatedList;
            });

          }
        }
      }
      setSelectedButtons((prev) => {
        const nextColor = responseQuest[index].isCorrect ? Colors.light.colorCorrect : Colors.light.colorError
        return { ...prev, [index]: nextColor };
      });
      setNextQuest(true);
    }
  };

  

  const updateLevel = async (name: string, nivel: string) => {
    const userRef = doc(db, "usuarios", name);
  
    try {
      // 1. Obtener el documento actual
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const currentData = userSnap.data().niveles || {};
  
        // 2. Incrementar solo el nivel específico
        const newLevel = (currentData[nivel] || 0) + 1;
  
        // 3. Actualizar solo ese campo sin borrar los demás
        await updateDoc(userRef, {
          [`niveles.${nivel}`]: newLevel
        });
  
        console.log(`Nivel actualizado correctamente: ${nivel} -> ${newLevel}`);
      } else {
        console.log("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error actualizando nivel:", error);
    }
  };
  
  
  const updateLevels = async () => {
    console.log(listNumberQuest);

    for (const element of listNumberQuest) {
      if (element.data.numero === element.data.respondidas) {
        await updateLevel(userName, element.topic);  // Esperar a que se complete cada actualización
        console.log("actualizado el topico",element.topic)
      }
      console.log(element.topic)
    }
  };

  const getTopicQuest = () => {
    let numberQ = 0;
    let numberR = 0;

    while (numberQ < listNumberQuest.length) {
      const current = listNumberQuest[numberQ];

      if (numberR + current.data.numero > indexQuestion) {
        return current;  // Retorna todo el objeto en lugar de solo el topic
      }

      numberR += current.data.numero;
      numberQ++;
    }

    return null;  // Retorna null si no encuentra coincidencias
  };
  const sendNext = () => {
    if (questionsArray.length > indexQuestion + 1) {
      setIndexQuestion(indexQuestion + 1);
      setNextQuest(false);
      setSelectedButtons({});
    } else {
      updateLevels();
      console.log("numero de cuestiones",listNumberQuest)
      console.log("no hay siguiente")
    }

  }
  const getPreguntas = async (idNombre: string) => {
    const pregunta = await getDoc(doc(db, "preguntas", idNombre));
    return pregunta
  }
  const getUser = async (name: string) => {
    const user = await getDoc(doc(db, "usuarios", name));
    return user;
  }
  const shuffleArray = (array: any[]) => {

    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchData = async (topic: string, level: number) => {
      const preguntaSnap = await getPreguntas(topic);
      if (preguntaSnap.exists()) {
        const data = preguntaSnap.data();
        let dataQuestion = data.preguntas;
        dataQuestion = dataQuestion.filter((a: QuestionFire) => a.Dificultad == level);
        const shuffledQuestions = dataQuestion.map((q: QuestionFire) => {
          return {
            ...q,
            respuestas: shuffleArray(q.respuestas)  // Mezcla las respuestas de cada pregunta
          };
        });

        // Añadir al array principal de preguntas
        setListNumberQuest((prev) => {
          return [...prev, { "topic": topic, "data": { numero: dataQuestion.length, respondidas: 0, } }]
        })
        setQuestionArray((prevQuestions) => [
          ...prevQuestions,
          ...shuffledQuestions
        ]);
        setIndexQuestion(0);
        //console.log("cargado en la base de datos",shuffledQuestions,dataQuestion)
      } else {
        console.log("No such document!");
      }

    };
    const fetchUser = async (user: string) => {
      const usernap = await getUser(user);
      if (usernap.exists()) {
        const data = usernap.data();
        const levels = data.niveles;
        console.log(levels);
        if (levels) {
          for (const [key, value] of Object.entries(levels)) {
            console.log(key, Number(value))
            fetchData(key, Number(value))
          }

        }

      } else {
        console.log("No such document!");
      }
    };

    const fetchAllData = async () => {
      try {
        await fetchUser(userName);  // Espera a que se carguen los datos del usuario y las preguntas
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    
    fetchAllData();
    console.log(questionsArray, responseQuest)
    
    
  }, []);

  useEffect(() => {
    //console.log(questionsArray,"llamada a preguntas")
    if (questionsArray.length > 0) {
      setTitleQuest(questionsArray[indexQuestion]?.pregunta || '');  // ? para evitar errores si es undefined
      setResponseQuest(questionsArray[indexQuestion]?.respuestas || []);
      setStateLoad(true);
    }
  }, [questionsArray, indexQuestion]);  
  if (stateLoad) {
    return (
      <View style={styles.container}>
        <View style={styles.titleQuestionContainer}>
          <Text style={styles.titleTextQuestion}>{titleQuest}</Text>
        </View>

        <View style={styles.chatQuestion}>

          {responseQuest.map((question, index) => {
            const color = selectedButtons[index] || 'lightblue';  // Celeste por defecto
            return (
              <Pressable
                key={index}
                onPress={() => opcionButon(index)}
                style={[styles.questionButton, { backgroundColor: color }]}
              >
                <Text style={styles.textQuestion}>
                  {question.text}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {!nextQuest ||

          <View style={styles.nextButton}>
            <Pressable
              onPress={sendNext}
            >
              <AntDesign name="arrowright" size={24} color="white" />
            </Pressable>
          </View>
        }
      </View>

    );
  } else {
    return (<SafeAreaProvider>
      <SafeAreaView style={[styles.containerx, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    </SafeAreaProvider>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Asegura que el contenedor ocupe toda la pantalla
  },
  nextButton: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: "10%",
    height: 50,
    width: 50,
    backgroundColor: Colors.light.color5,
    alignSelf: "flex-end",

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
  containerx: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});