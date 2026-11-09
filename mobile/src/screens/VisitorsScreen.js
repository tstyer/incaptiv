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
export default function VisitorsScreen({
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
      <Title>Visitor Metrics.</Title>
      <Copy>A measured view of Wi-Fi-connected guests.</Copy>
      <Grid>
        <Metric label="Unique Wi-Fi logins" value="12,340" />
        <Metric label="Observed dwell" value="42 min" />
        <Metric label="Repeat guests" value="24.8%" />
        <Metric label="Peak window" value="18–20h" />
      </Grid>
      <Card>
        <Title>76% peak occupancy</Title>
        <Copy>380 / 500 people · modelled October estimate</Copy>
      </Card>
      <Card>
        <Text style={styles.heading}>When your venue comes alive</Text>
        <Copy>Relative demo activity · 10:00–21:00</Copy>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, j) => (
          <View
            key={day}
            style={{ flexDirection: "row", gap: 3, alignItems: "center" }}
          >
            <Copy style={{ width: 30, fontSize: 10 }}>{day}</Copy>
            {Array.from({ length: 12 }, (_, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: 22,
                  borderRadius: 3,
                  backgroundColor: [
                    "#edf2e8",
                    "#d4e1c7",
                    "#a5bf8e",
                    "#6b9567",
                    "#346a4a",
                  ][
                    Math.min(
                      4,
                      Math.floor((i + 1) / 3) + (j === 4 || j === 5 ? 1 : 0),
                    )
                  ],
                }}
              />
            ))}
          </View>
        ))}
      </Card>
      <Card>
        <Text style={styles.heading}>Movement between zones</Text>
        <Row label="Main hall → The terrace" value="38%" />
        <Row label="The terrace → Garden bar" value="27%" />
        <Row label="Main hall → Gallery lounge" value="16%" />
      </Card>
      <Copy>
        Connected guests are a sample. Dwell, return visits and movement require
        suitable identifiers and session signals.
      </Copy>
    </Page>
  );
}
