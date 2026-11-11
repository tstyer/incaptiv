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
export default function ZonesScreen({
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
  const [filter, setFilter] = useState("All");
  return (
    <Page>
      <Title>Your Zones.</Title>
      <Copy>Revenue, activity and operating profit across your venue.</Copy>
      <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
        {["All", "Profitable", "Needs attention"].map((x) => (
          <Button
            key={x}
            title={x}
            primary={filter === x}
            onPress={() => setFilter(x)}
          />
        ))}
      </View>
      {data.zones
        .filter(
          (z) =>
            filter === "All" ||
            (filter === "Profitable" ? z.profit >= 0 : z.profit < 0),
        )
        .map((z) => (
          <Pressable key={z.id} onPress={() => detail(z, "Zone")}>
            <Card>
              <Text style={styles.heading}>{z.name}</Text>
              <Copy>{z.profit < 0 ? "Needs attention" : "Profitable"}</Copy>
              <Row label="Linked revenue" value={money(z.revenue)} />
              <Row label="Estimated visits" value={z.visits.toLocaleString()} />
              <Row label="Operating profit" value={money(z.profit)} />
            </Card>
          </Pressable>
        ))}
      <Copy>
        Zone visits can overlap. Profit deducts allocated operating costs.
      </Copy>
      <Button
        title="Export zone report"
        onPress={() =>
          Share.share({
            message:
              "Zone,Visits,Revenue,Costs,Profit\n" +
              data.zones
                .map((z) =>
                  [z.name, z.visits, z.revenue, z.cost, z.profit].join(","),
                )
                .join("\n"),
          }).catch(() => Alert.alert("Export unavailable"))
        }
      />
    </Page>
  );
}
