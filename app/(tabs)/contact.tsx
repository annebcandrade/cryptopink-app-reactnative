
import { useState } from 'react';
import { View, Text, StyleSheet, Animated} from 'react-native'

export default function TabTwoScreen() {

  const [largura, setLargura] = useState(new Animated.Value(0));
  const [altura, setAltura] = useState(30);

  Animated.timing(
    largura, 
    {
      toValue:360,
      duration: 2000,
      useNativeDriver: false, 
    }).start();


  return (

    <View style={styles.container}>

      <Animated.View style={{
        width: largura,
        height: altura,
      }}
      >
      <Text style={styles.text}>Hello World, Essa é a Página Contato</Text>
      </Animated.View>
    </View>

  )}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
  });