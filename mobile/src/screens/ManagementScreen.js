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
export default function ManagementScreen({
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
  const [draft, setDraft] = useState(venueName);
  return (
    <Page>
      <Title>Your venue, connected.</Title>
      <Copy>Manage the spaces, sources and people behind your insights.</Copy>
      <Card>
        <Text style={styles.heading}>Venue details</Text>
        <Row label="Name" value={venueName} />
        <Row label="Timezone / currency" value="Europe/London · GBP" />
        <TextInput
          accessibilityLabel="Venue name"
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
        />
        <Button
          title="Save display name"
          disabled={!draft.trim()}
          onPress={() => setVenueName(draft.trim())}
        />
        <Copy>
          Saved on this device only; backend remains the Glasshouse demo.
        </Copy>
      </Card>
      <Card>
        <Text style={styles.heading}>Data integrations</Text>
        {[
          "Guest Wi-Fi: login, session and zone signals",
          "Point of sale: value, location and time",
          "Operating costs: zone and event allocation",
        ].map((x) => (
          <Row key={x} label={x} value="Not connected" />
        ))}
      </Card>
      <Card>
        <Text style={styles.heading}>Team & permissions</Text>
        <Row label="Travis Styer" value="Administrator" />
        <Row label="Alex Morgan · example" value="Venue manager" />
        <Row label="Sam Taylor · example" value="Garden bar" />
        <Copy>
          Example roles only. Authentication and permission enforcement are not
          implemented in this local demo.
        </Copy>
      </Card>
    </Page>
  );
}
