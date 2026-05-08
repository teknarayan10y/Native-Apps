import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";

const LiveChat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState('');
    const scrollViewRef = useRef(null);

    const handleSend = () => {
        if (!textInput.trim()) return;

        const userMessage = { type: "user", text: textInput };
        setMessages((prev) => [...prev, userMessage]);

        const lowerText = textInput.toLowerCase();
        let reply = "Sorry, I don't understand. 🤖";

        if (lowerText.includes("hello")) reply = "Hi there! 👋";
        else if (lowerText.includes("how are you")) reply = "I'm just a bot, but I'm doing great! 😊";
        else if (lowerText.includes("what is your name")) reply = "I'm your friendly chatbot assistant!";
        else if (lowerText.includes("bye")) reply = "Goodbye! 👋 Have a great day!";
        else if (lowerText.includes("who made you")) reply = "I was created by a passionate developer!";
        else if (lowerText.includes("thank")) reply = "You're welcome! 😊";

        const botMessage = { type: "bot", text: reply };

        setTimeout(() => {
            setMessages((prev) => [...prev, botMessage]);
        }, 500);

        setTextInput('');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>⬅</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Live Chat 💬</Text>
            </View>

            {/* Chat Messages */}
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.chatBubble,
                            item.type === "user" ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text style={styles.chatText}>
                            {item.type === "user" ? "You: " : "Bot: "} {item.text}
                        </Text>
                    </View>
                )}
                style={styles.chatContainer}
            />

            {/* Input */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ask me anything..."
                        value={textInput}
                        onChangeText={setTextInput}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Text style={styles.sendButtonText}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#FF5252",
    },
    backButton: {
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 22,
        color: "#fff",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    chatBubble: {
        maxWidth: "80%",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    userMessage: {
        backgroundColor: "#FFEBEE",
        alignSelf: "flex-end",
    },
    botMessage: {
        backgroundColor: "#E0E0E0",
        alignSelf: "flex-start",
    },
    chatText: {
        fontSize: 16,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    sendButton: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: "#FF5252",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    sendButtonText: {
        fontSize: 18,
        color: "#fff",
    },
});

export default LiveChat;
