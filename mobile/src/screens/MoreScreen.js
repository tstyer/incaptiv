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
export default function MoreScreen({
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
      <Title>Extras</Title>
      <Copy>Explore the detail, or manage your venue.</Copy>
      {[
        ["Revenue", "Revenue intelligence"],
        ["Visitors", "Visitor behaviour"],
        ["Insights", "Insights"],
        ["Management", "Venue management"],
        ["Settings", "Settings"],
        ["Help", "Help & data guide"],
      ].map(([key, label]) => (
        <Button key={key} title={label + " →"} onPress={() => navigate(key)} />
      ))}
    </Page>
  );
}
