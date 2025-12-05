// app/index.js
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import LabeledInput from "../components/LabeledInput";

export default function MainScreen() {
  const [amount, setAmount] = useState("1"); // default amount
  const [baseCurrency, setBaseCurrency] = useState("CAD"); // default base
  const [destCurrency, setDestCurrency] = useState("USD");

  const handleConvert = () => {
    // temporary placeholder – real logic will come later
    console.log(
      "Convert pressed.",
      "Amount:",
      amount,
      "Base:",
      baseCurrency,
      "Dest:",
      destCurrency
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <LabeledInput
        label="Base Currency (e.g. CAD, USD)"
        value={baseCurrency}
        onChangeText={setBaseCurrency}
        placeholder="CAD"
      />

      <LabeledInput
        label="Destination Currency (e.g. USD, EUR)"
        value={destCurrency}
        onChangeText={setDestCurrency}
        placeholder="USD"
      />

      <LabeledInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="1"
      />

      <Button title="Convert" onPress={handleConvert} />
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
