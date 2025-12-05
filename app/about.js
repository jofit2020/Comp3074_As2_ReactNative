import { Text, View } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.title}>Comp3074 Assignment -2</Text>

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
