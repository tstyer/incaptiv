import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, ScrollView, Text } from "react-native";
import { Title, Copy, Card, Button, colors, styles } from "../ui";
import { answer } from "../offlineAnswers";

export default function ChatScreen({
  prompt,
  clearPrompt,
  messages,
  setMessages,
  data,
}) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scroll = useRef();
  const lock = useRef(false);
  async function send(value) {
    const message = value.trim();
    if (!message || lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    setText("");
    setMessages((old) => [...old, { role: "user", text: message }]);
    try {
      const reply = answer(message, data);
      setMessages((old) => [...old, { role: "assistant", text: reply }]);
    } catch (e) {
      setError("Unable to read demo data");
      setText(message);
    } finally {
      setBusy(false);
      lock.current = false;
    }
  }
  useEffect(() => {
    if (prompt) {
      send(prompt);
      clearPrompt();
    }
  }, [prompt]);
  const composer = (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          accessibilityLabel="Ask about your venue"
          value={text}
          onChangeText={setText}
          maxLength={500}
          placeholder="Ask about an event or a space…"
          style={[styles.input, { flex: 1 }]}
          onSubmitEditing={() => send(text)}
        />
        <Button
          title="↑"
          disabled={busy || !text.trim()}
          primary
          onPress={() => send(text)}
        />
      </View>
      <Copy style={{ fontSize: 10 }}>
        Demo responses · Check source data before decisions
      </Copy>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 20, gap: 16 }}
        onContentSizeChange={() =>
          messages.length && scroll.current?.scrollToEnd({ animated: false })
        }
      >
        {!messages.length ? (
          <>
            <Title>
              {'Your venue has answers.\nJust ask.'}
            </Title>
            {composer}
            <Copy>
              Explore your events, spaces and sales in a conversation.
            </Copy>
            {[
              "How is Late Sessions doing?",
              "Which zone is losing money?",
              "Which event has the best return?",
            ].map((q) => (
              <Button key={q} title={q + " →"} onPress={() => send(q)} />
            ))}
          </>
        ) : (
          <>
            <Button
              title="New chat"
              disabled={busy}
              onPress={() => {
                setMessages([]);
                setError("");
              }}
            />
            {messages.map((m, i) => (
              <Card
                key={i}
                style={{
                  backgroundColor: m.role === "user" ? colors.mint : "white",
                  marginLeft: m.role === "user" ? 25 : 0,
                }}
              >
                <Copy>{m.role === "user" ? "YOU" : "INCAPTIV"}</Copy>
                <Text style={{ color: colors.ink, lineHeight: 23 }}>
                  {m.text}
                </Text>
              </Card>
            ))}
          </>
        )}
        {busy && <Copy>Loading demo answer…</Copy>}
        {!!error && (
          <Copy style={{ color: "#a43d37" }}>
            {error} — please retry below.
          </Copy>
        )}
      </ScrollView>
      {messages.length > 0 && (
        <View
          style={{ padding: 16, borderTopWidth: 1, borderColor: colors.line }}
        >
          {composer}
        </View>
      )}
    </View>
  );
}
