import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { AssessmentResult } from "@/lib/assessment-schema";

const styles = StyleSheet.create({
  page: { padding: 42, fontSize: 10, color: "#17131f", fontFamily: "Helvetica", lineHeight: 1.45 },
  overline: { fontSize: 8, color: "#6f50bd", letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 8 },
  title: { fontSize: 25, marginBottom: 12, fontFamily: "Helvetica-Bold" },
  subtitle: { fontSize: 15, marginTop: 18, marginBottom: 8, fontFamily: "Helvetica-Bold" },
  body: { marginBottom: 8 },
  card: { border: "1px solid #ddd7ec", borderRadius: 7, padding: 12, marginBottom: 10 },
  meta: { color: "#6c6675", marginBottom: 4 },
  severity: { color: "#6f50bd", fontSize: 8, textTransform: "uppercase", marginBottom: 5 },
  footer: { position: "absolute", bottom: 22, left: 42, right: 42, color: "#80798b", fontSize: 8 },
});

export function ReportDocument({ title, organisation, createdAt, result }: { title: string; organisation?: string | null; createdAt: string; result: AssessmentResult }) {
  return (
    <Document title={`${title} — AI Responsibility Assessment`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.overline}>Traceremove · AI Responsibility Laboratory</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>{organisation || "Independent project"} · {new Date(createdAt).toLocaleDateString("en-GB")}</Text>
        <Text style={styles.meta}>Overall risk: {result.overallRisk.toUpperCase()} · Risk score: {result.score}/100</Text>

        <Text style={styles.subtitle}>Executive summary</Text>
        <Text style={styles.body}>{result.executiveSummary}</Text>
        <Text style={styles.subtitle}>System claim</Text>
        <Text style={styles.body}>{result.systemClaim}</Text>

        <Text style={styles.subtitle}>Findings</Text>
        {result.findings.map((finding, index) => (
          <View key={`${finding.module}-${index}`} style={styles.card} wrap={false}>
            <Text style={styles.severity}>{finding.module} · {finding.severity}</Text>
            <Text style={{fontFamily:"Helvetica-Bold", marginBottom:5}}>{finding.title}</Text>
            <Text style={styles.body}>{finding.analysis}</Text>
            <Text style={{fontFamily:"Helvetica-Bold", marginBottom:3}}>Recommendation</Text>
            <Text>{finding.recommendation}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>Responsibility map</Text>
        {result.responsibilityMap.map((actor) => (
          <View key={actor.actor} style={styles.card} wrap={false}>
            <Text style={{fontFamily:"Helvetica-Bold", marginBottom:4}}>{actor.actor}</Text>
            <Text style={styles.body}>{actor.role}</Text>
            <Text>{actor.accountability}</Text>
          </View>
        ))}

        <Text style={styles.subtitle}>Unresolved questions</Text>
        {result.unresolvedQuestions.map((item) => <Text key={item} style={styles.body}>• {item}</Text>)}
        <Text style={styles.subtitle}>Next actions</Text>
        {result.nextActions.map((item) => <Text key={item} style={styles.body}>• {item}</Text>)}
        <Text style={styles.footer}>{result.disclaimer}</Text>
      </Page>
    </Document>
  );
}
