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
export default function InsightsScreen({
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
      <Title>Here's A little clarity.</Title>
      <Copy>Three illustrative opportunities based on demo data.</Copy>
      {[
        [
          "Give the terrace’s busiest hours more attention.",
          "Review service capacity between 18:00 and 20:00.",
          data.zones[1],
          "Zone",
        ],
        [
          "A quieter lounge is affecting the bottom line.",
          "Compare staffing and opening hours with hourly demand.",
          data.zones[3],
          "Zone",
        ],
        [
          "Build on the success of Late Sessions.",
          "Review the ticket, bar sales and staffing mix.",
          data.events[0],
          "Event",
        ],
      ].map(([title, body, item, type], i) => (
        <Card key={title}>
          <Text style={styles.heading}>{title}</Text>
          <Copy>{body}</Copy>
          <Button title="Review source →" onPress={() => detail(item, type)} />
          <Button
            title={reviews.includes(i) ? "✓ Added to review" : "Add to review"}
            onPress={() =>
              setReviews(
                reviews.includes(i)
                  ? reviews.filter((x) => x !== i)
                  : [...reviews, i],
              )
            }
          />
        </Card>
      ))}
    </Page>
  );
}
