import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEffect, useState } from "react";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ProgressBar from "@/components/ui/Linebar";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.USER_API_Firebase,
  authDomain: "calculando-f8af8.firebaseapp.com",
  projectId: "calculando-f8af8",
  storageBucket: "calculando-f8af8.firebasestorage.app",
  messagingSenderId: "68303837221",
  appId: "1:68303837221:web:c75000aa388ef9360947cc"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface topic{
  topic:string;
  value:number
}

export default function HomeScreen() {
  const [days, setDays] = useState("2d")
  const [skills, setSkills] = useState(["limites", "derivadas", "nombre largo como calculo de derivadas"])
  const [userName, setUserName] = useState("4Gjmz4lTH20kfCwKAWgt");
  const [listTopic,setListTopic]=useState<Array<topic>>([]);
  const [loading,setLoading]=useState(false);

  const getUser = async (name: string) => {
    const user = await getDoc(doc(db, "usuarios", name));
    return user;
  }
  useEffect(()=>{
    const fetchUser = async (name:string) => {
      const usernap = await getUser(name);
      if (usernap.exists()) {
        const data = usernap.data();
        const levels = data.niveles;
        console.log(levels);
        if (levels) {
          for (const [key, value] of Object.entries(levels)) {
            setListTopic((prev)=>{
              return [...prev,{topic:key.toString(),value:Number(value)}]
            })
          }

        }
      }
      setLoading(true);
  };

  fetchUser(userName);
  },[])
useEffect(()=>{
  console.log(listTopic);
},[listTopic])
  return (  
    <View style={styles.Container}>
      <View style={styles.rankendContainer}>
        <View style={[{ margin: "auto" }, { alignItems: "center" }]}>
          <FontAwesome6 name="fire-flame-curved" size={64} color="black" />
          <Text style={styles.textRankend}>{days} racha</Text>
        </View>

      </View>
      <View style={styles.skillContainer}>
        <View>
          <Text style={styles.titleAreaSkill}>
            Areas
          </Text>
        </View>

        <View style={[{ width: "95%" }, { alignSelf: "center" }]}>
          {loading ? (listTopic.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.text} numberOfLines={1}>{item.topic} :</Text>
              <View style={styles.progressBarContainer}>
                <ProgressBar value={item.value} />
              </View>
            </View>
          ))):(
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4caf50" />
            </View>
        )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  Container: {
    position: "fixed",
    //flexDirection: 'column',
    alignSelf: "center",
    height: "100%",
    width: "80%",
  },
  rankendContainer: {
    gap: 8,
    height: "40%",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    margin: "auto",
  },
  skillContainer: {

    height: "60%",
  },
  textRankend: {
    fontSize: 40
  },
  titleAreaSkill: {
    fontSize: 36,
    flexDirection: "row",

  },
  row: {
    flexDirection: 'row',  // Alinear en fila
    alignItems: 'center',  // Alinear verticalmente
    marginVertical: 10,
  },
  text: {
    flex: 4,  // El texto ocupa 3 partes de 10 (30%)
    fontSize: 16,
  },
  progressBarContainer: {
    flex: 6,  // La barra de progreso ocupa 7 partes de 10 (70%)
    height: "100%",
    width: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
},
});