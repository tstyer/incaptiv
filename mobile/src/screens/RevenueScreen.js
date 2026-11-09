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
export default function RevenueScreen({
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
      <Title>Simple Revenue Insights.</Title>
      <Copy>Understand visitors, sales and costs.</Copy>
      <Grid>
        <Metric
          label="Linked sales"
          value={money(data.zones.reduce((n, z) => n + z.revenue, 0))}
        />
        <Metric
          label="Operating costs"
          value={money(data.zones.reduce((n, z) => n + z.cost, 0))}
        />
      </Grid>
      <Trend />
      <Card>
        <Text style={styles.heading}>Revenue mix</Text>
        {[
          ["Food & drink", 67162],
          ["Event tickets", 28570],
          ["Retail & other", 19538],
        ].map(([k, v]) => (
          <Row key={k} label={k} value={money(v)} />
        ))}
      </Card>
      <Card>
        <Title>62%</Title>
        <Copy>
          Of sales value matched to a guest identifier. Unmatched sales remain
          in venue totals. Wi-Fi login alone does not record a purchase.
        </Copy>
      </Card>
    </Page>
  );
}
