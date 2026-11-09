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
export default function SettingsScreen({
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
      <Title>Settings</Title>
      <Copy>Preferences are saved on this device.</Copy>
      {[
        ["largerText", "Larger text"],
        ["reduceMotion", "Reduce motion"],
        ["revenueAlerts", "Revenue alerts"],
        ["occupancyAlerts", "Occupancy alerts"],
        ["eventSummary", "Event summaries"],
      ].map(([key, label]) => (
        <Card key={key}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>{label}</Text>
            <Switch
              accessibilityLabel={label}
              value={!!prefs[key]}
              onValueChange={(value) => setPrefs({ ...prefs, [key]: value })}
              trackColor={{ true: colors.green }}
            />
          </View>
        </Card>
      ))}
      <Copy>
        Alert preferences are stored only. Push notifications are not connected.
        The interface uses no animated transitions.
      </Copy>
    </Page>
  );
}
