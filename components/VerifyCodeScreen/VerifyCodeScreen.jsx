import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const VerifyCodeScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && !otp[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Verify Code</Text>
      <Text style={styles.subtitle}>
        Enter the OTP code that we just sent on your registered email
      </Text>
      <Text style={styles.email}>example@gmail.com</Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>

      {/* Resend Code */}
      <Text style={styles.resendText}>
        Didn’t receive the code?{" "}
        <Text style={styles.resendLink} onPress={() => alert("Code resent!")}>
          Resend Code
        </Text>
      </Text>

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={() => alert("OTP Verified!")}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#357AE8",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#357AE8",
    textAlign: "center",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  otpBox: {
    width: 50,
    height: 50,
    backgroundColor: "#f5f5f5",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resendText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  resendLink: {
    color: "#357AE8",
    fontWeight: "bold",
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: "#357AE8",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyCodeScreen;
