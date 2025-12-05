import { StyleSheet, Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.label}>Student Name:</Text>
      <Text style={styles.value}>Fitsum Asgedom</Text>

      <Text style={styles.label}>Student ID:</Text>
      <Text style={styles.value}>101510623</Text>

      <Text style={styles.subtitle}>What this app does</Text>
      <Text style={styles.description}>
        This React Native application converts an amount from a base currency
        (such as CAD or USD) to a destination currency using live exchange rates
        from the FreeCurrencyAPI service. The app validates the amount, handles
        possible network and API errors, and displays both the exchange rate and
        the converted amount when the request is successful. Navigation allows
        users to switch between the main converter screen and this About screen.
      </Text>
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
  label: {
    fontWeight: "600",
    marginTop: 8,
  },
  value: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
