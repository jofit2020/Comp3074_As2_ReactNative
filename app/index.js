// app/index.js
import { StyleSheet, Text, View } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
});
