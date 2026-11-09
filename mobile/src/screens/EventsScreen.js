import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Switch,
  Share,
  Alert,
} from "react-native";
import {
  Page,
  Title,
  Copy,
  Card,
  Button,
  Row,
  Metric,
  Grid,
  Trend,
  styles,
  colors,
  money,
} from "../ui";
export default function EventsScreen({
  data,
  navigate,
  detail,
  ask,
  reviews,
  setReviews,
  prefs,
  setPrefs,
  venueName,
  setVenueName,
}) {
  return (
    <Page>
      <Title>Your Events.</Title>
      <Copy>
        Discover the events that bring people in — and deliver a return.
      </Copy>
      {data.events.map((e) => (
        <Card key={e.id}>
          <View
            style={{
              backgroundColor: colors.mint,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Title>{e.day} OCT</Title>
            <Copy>{e.category}</Copy>
          </View>
          <Text style={styles.heading}>{e.name}</Text>
          <Copy>{e.date}</Copy>
          <Row label="Linked revenue" value={money(e.revenue)} />
          <Row
            label="Event ROI"
            value={Math.round(((e.revenue - e.cost) / e.cost) * 100) + "%"}
          />
          <Button title="View event →" onPress={() => detail(e, "Event")} />
          <Button
            title="Ask about this event"
            onPress={() => ask(`How is ${e.name} doing?`)}
          />
        </Card>
      ))}
      <Copy>ROI = (revenue − allocated costs) ÷ allocated costs × 100.</Copy>
    </Page>
  );
}
