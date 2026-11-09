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
export default function HelpScreen({
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
      <Title>Help & data guide</Title>
      <Card>
        <Text style={styles.heading}>Ask a question</Text>
        <Copy>
          Name an event or zone to explore its sample revenue, costs and
          estimated visits. Chat uses prepared responses, not a live AI model.
        </Copy>
      </Card>
      <Card>
        <Text style={styles.heading}>Read the data correctly</Text>
        <Copy>
          Wi-Fi logins and devices are not a direct headcount. Occupancy
          requires active-session signals and calibration. Zone visits can
          overlap. Sales come from linked POS records. Profit subtracts
          allocated costs.
        </Copy>
      </Card>
      <Card>
        <Text style={styles.heading}>Reporting period</Text>
        <Copy>
          This native version uses the complete October 2026 fixture. No
          fabricated daily or weekly breakdown is generated.
        </Copy>
      </Card>
      <Button
        title="View data sources →"
        onPress={() => navigate("Management")}
      />
    </Page>
  );
}
