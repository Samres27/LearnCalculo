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

import { IconSymbol } from "@/components/ui/IconSymbol";
import { useState } from "react";
import { CohereClient } from "cohere-ai";

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import progressBar from "@/components/ui/linebar";

export default function HomeScreen() {
  const [days,setDays]=useState("2d")
  const [skills,setSkills]=useState(["limites","derivadas"])

  return (
    <View style={styles.Container}>
      <View style={styles.rankendContainer}>
          <View style={[{margin:"auto"},{alignItems:"center"}]}>
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
        
        <View style={[{width:"80%"},{alignSelf:"center"}]}>
        {skills.map((title,index)=>{
          return (<View
          key={index}
          >
            <Text>{title}</Text>
          </View>)
        })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  Container: {
    position:"fixed",
    //flexDirection: 'column',
    alignSelf:"center",
    height:"100%",
    width:"80%",
  },
  rankendContainer: {
    gap: 8,
    height: "40%",
    alignItems:"center",  
    flexDirection:"column",
    textAlign:"center",
    margin:"auto",
  },
  skillContainer: {
    
    height: "60%",
  },
  textRankend:{
    fontSize:40
  },
  titleAreaSkill:{
    fontSize:32,
    flexDirection:"row",
  },

});