import { Text, TextInput, View } from "react-native";

export default function LabeledInput({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  placeholder,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
      />
    </View>
  );
}
