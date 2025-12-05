// app/index.js
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import LabeledInput from "../components/LabeledInput";

// API constants (we'll use them later for real fetch)
const API_URL = "https://api.freecurrencyapi.com/v1/latest";
// ⚠️ For GitHub, consider replacing your real key with a placeholder
const API_KEY = "YOUR_API_KEY_HERE";

export default function MainScreen() {
  const [amount, setAmount] = useState("1"); // default amount
  const [baseCurrency, setBaseCurrency] = useState("CAD"); // default base
  const [destCurrency, setDestCurrency] = useState("USD");
  const [errorMsg, setErrorMsg] = useState("");

  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = () => {
    const amt = parseFloat(amount);
    const base = baseCurrency.trim().toUpperCase();
    const dest = destCurrency.trim().toUpperCase();

    const codeRegex = /^[A-Z]{3}$/;
    setErrorMsg("");
    setExchangeRate(null);
    setConvertedAmount(null);

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

    // For now, just simulate a rate instead of calling the API
    const fakeRate = 0.75;
    const fakeConverted = amt * fakeRate;

    setExchangeRate(fakeRate);
    setConvertedAmount(fakeConverted);

    console.log("Ready to call API:", {
      url: API_URL,
      key: API_KEY ? "***hidden***" : "no-key",
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

      {exchangeRate !== null && convertedAmount !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            (Fake) Exchange Rate: {exchangeRate.toFixed(4)}
          </Text>
          <Text style={styles.resultText}>
            (Fake) Converted Amount: {convertedAmount.toFixed(2)} {destCurrency}
          </Text>
        </View>
      )}
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
  resultContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
