// app/index.js
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LabeledInput from "../components/LabeledInput";

// API constants
const API_URL = "https://api.freecurrencyapi.com/v1/latest";
const API_KEY = "fca_live_DWLdxHXfEC8RVmaXpEmWkXv8mwUVM5kcmlMNvWql";

export default function MainScreen() {
  const [amount, setAmount] = useState("1"); // default amount
  const [baseCurrency, setBaseCurrency] = useState("CAD"); // default base
  const [destCurrency, setDestCurrency] = useState("USD");
  const [errorMsg, setErrorMsg] = useState("");

  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    const amt = parseFloat(amount);
    const base = baseCurrency.trim().toUpperCase();
    const dest = destCurrency.trim().toUpperCase();

    const codeRegex = /^[A-Z]{3}$/;

    // reset
    setErrorMsg("");
    setExchangeRate(null);
    setConvertedAmount(null);

    // validation: currency code format
    if (!codeRegex.test(base)) {
      setErrorMsg(
        "Base currency must be a 3-letter uppercase code (e.g. CAD)."
      );
      return;
    }

    if (!codeRegex.test(dest)) {
      setErrorMsg(
        "Destination currency must be a 3-letter uppercase code (e.g. USD, EUR,AUS)."
      );
      return;
    }

    // NEW: prevent equal currencies
    if (base === dest) {
      setErrorMsg("Base and destination currencies must be different.");
      return;
    }

    // validation: amount
    if (isNaN(amt) || amt <= 0) {
      setErrorMsg("Amount must be a positive number.");
      return;
    }

    setLoading(true);

    try {
      const url = `${API_URL}?apikey=${API_KEY}&base_currency=${base}&currencies=${dest}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();

      // Expected: data.data = { "USD": 0.73, ... }
      const rate = data?.data?.[dest];

      if (typeof rate !== "number") {
        throw new Error("Missing or invalid currency rate in API response.");
      }

      const converted = amt * rate;

      setExchangeRate(rate);
      setConvertedAmount(converted);
    } catch (err) {
      console.error(err);
      const msg = err?.message || "";

      if (msg.includes("Network")) {
        setErrorMsg("Network error: please check your internet connection.");
      } else if (msg.includes("401")) {
        setErrorMsg("Invalid or missing API key. Please verify your API key.");
      } else if (msg.startsWith("HTTP error")) {
        setErrorMsg(
          "API request failed. Please verify your currency codes and try again."
        );
      } else if (msg) {
        setErrorMsg(msg);
      } else {
        setErrorMsg("Something went wrong while fetching the exchange rate.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <LabeledInput
        label="Base Currency (e.g. CAD, USD,EUR)"
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

      {loading && (
        <ActivityIndicator size="large" style={{ marginVertical: 10 }} />
      )}

      <Button
        title={loading ? "Converting..." : "Convert"}
        onPress={handleConvert}
        disabled={loading}
      />

      {exchangeRate !== null && convertedAmount !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Exchange Rate: {exchangeRate.toFixed(4)}
          </Text>
          <Text style={styles.resultText}>
            Converted Amount: {convertedAmount.toFixed(2)} {destCurrency}
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
