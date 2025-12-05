// app/index.js
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import LabeledInput from "../components/LabeledInput";

export default function MainScreen() {
  const [amount, setAmount] = useState("1"); // default amount
  const [baseCurrency, setBaseCurrency] = useState("CAD"); // default base
  const [destCurrency, setDestCurrency] = useState("USD");
  const [errorMsg, setErrorMsg] = useState("");

  const handleConvert = () => {
    const amt = parseFloat(amount);
    const base = baseCurrency.trim().toUpperCase();
    const dest = destCurrency.trim().toUpperCase();

    // simple regex: 3 uppercase letters
    const codeRegex = /^[A-Z]{3}$/;

    // reset message
    setErrorMsg("");

    if (!codeRegex.test(base)) {
      setErrorMsg(
        "Base currency must be a 3-letter uppercase code (e.g. CAD)."
      );
      return;
    }

    if (!codeRegex.test(dest)) {
      setErrorMsg(
        "Destination currency must be a 3-letter uppercase code (e.g. USD, EUR)."
      );
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      setErrorMsg("Amount must be a positive number.");
      return;
    }

    // just log for now – API logic will come later
    console.log("Valid input. Ready to convert:", {
      base,
      dest,
      amount: amt,
    });
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

      {errorMsg !== "" && <Text style={styles.errorText}>{errorMsg}</Text>}

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
  errorText: {
    color: "red",
    marginTop: 8,
  },
});
