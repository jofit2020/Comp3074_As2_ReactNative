import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LabeledInput from "../components/LabeledInput";

const API_URL = "https://api.freecurrencyapi.com/v1/latest";
//  real key from https://freecurrencyapi.com
const API_KEY = "fca_live_DWLdxHXfEC8RVmaXpEmWkXv8mwUVM5kcmlMNvWql";

// Limited list of common ISO 4217 codes
const currencyOptions = ["CAD", "USD", "EUR", "GBP", "AUD"];

export default function MainScreen() {
  const [baseCurrency, setBaseCurrency] = useState("CAD"); // default CAD
  const [destCurrency, setDestCurrency] = useState("USD");
  const [amount, setAmount] = useState("1"); // default 1

  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const amt = parseFloat(amount);

    // Amount must be positive number
    if (isNaN(amt) || amt <= 0) {
      setErrorMsg("Amount must be a positive number.");
      return false;
    }

    // Codes are 3-letter uppercase by design (dropdown)
    if (baseCurrency === destCurrency) {
      setErrorMsg("Base and destination currencies must be different.");
      return false;
    }

    setErrorMsg("");
    return true;
  };

  const handleConvert = async () => {
    if (!validate()) return;

    const amt = parseFloat(amount);
    setLoading(true);
    setExchangeRate(null);
    setConvertedAmount(null);
    setErrorMsg("");

    try {
      const url = `${API_URL}?apikey=${API_KEY}&base_currency=${baseCurrency}&currencies=${destCurrency}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      const rate = data?.data?.[destCurrency];

      if (typeof rate !== "number") {
        throw new Error("Missing or invalid currency rate in API response.");
      }

      const converted = amt * rate;
      setExchangeRate(rate);
      setConvertedAmount(converted);
    } catch (err) {
      console.error(err);
      const msg = err.message || "Unknown error";
      if (msg.includes("Network")) {
        setErrorMsg("Network error. Please check your internet connection.");
      } else if (msg.includes("401")) {
        setErrorMsg("Invalid or missing API key. Please check your API key.");
      } else if (msg.startsWith("HTTP error")) {
        setErrorMsg(
          "API request failed. Please verify currency codes and try again."
        );
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      {/* Base currency dropdown */}
      <Text style={styles.label}>Base Currency</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={baseCurrency}
          onValueChange={setBaseCurrency}
          style={styles.picker}
        >
          {currencyOptions.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      {/* Destination currency dropdown */}
      <Text style={styles.label}>Destination Currency</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={destCurrency}
          onValueChange={setDestCurrency}
          style={styles.picker}
        >
          {currencyOptions.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      {/* Amount input */}
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

      <Link href="/about" style={styles.aboutLink}>
        Go to About Screen
      </Link>
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
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "600",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  picker: {
    height: 44,
  },
  errorText: {
    color: "red",
    marginVertical: 8,
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
  aboutLink: {
    marginTop: 24,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
