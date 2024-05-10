import { View, Text, StyleSheet} from 'react-native'

export default function TabTwoScreen() {
  return (

    <View style={styles.container}>
      <Text style={styles.text}>Sobre nós</Text>
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