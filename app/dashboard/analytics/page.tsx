import { createClient } from "@/lib/supabase/server";
import {
  Badge,
  BarChart,
  Card,
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { notFound } from "next/navigation";

interface AnalyticsSummary {
  totalClicks: number;
  top_referrers: Array<{ referrer: string | null; clicks: number }>;
  top_countries: Array<{ country: string; clicks: number }>;
  top_links: Array<{ link_id: string; clicks: number }>;
}

type DailyClicksRow = { day: string; total_clicks: number };

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }
  const { data: summary, error: summaryError } = await supabase
    .rpc("get_analytics_summary", { p_user_id: user.id, p_days: 30 })
    .single<AnalyticsSummary>();

  const start = new Date();
  start.setDate(start.getDate() - 30);
  start.setUTCHours(0, 0, 0, 0);

  const { data: timeSeries, error: timesSeriesError } = await supabase
    .from("daily_clicks_by_user")
    .select("day, total_clicks")
    .eq("user_id", user.id)
    .gte("day", start.toISOString());

  if (summaryError || timesSeriesError) {
    console.error(summaryError || timesSeriesError);
    return <Text className="p-8">Ocorreu um erro ao carregar os dados</Text>;
  }

  const chartData =
    (timeSeries as DailyClicksRow[] | null)?.map((item) => ({
      Data: new Date(item.day).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      }),
      Cliques: item.total_clicks,
    })) ?? [];

  return (
    <main className="p-4 md:p-8 mx-auto max-w-4xl">
      <Title>Seu Dashboard Analytics</Title>
      <Text>Dados dos últimos 30 dias</Text>

      <Card className="mt-6">
        <Text>Total de cliques</Text>
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {summary?.totalClicks ?? 0}
        </p>
      </Card>

      <Card className="mt-6">
        <Title>Cliques ao longo do tempo</Title>
        <LineChart
          className="h-72 mt-4"
          data={chartData}
          index="Data"
          categories={["Cliques"]}
          colors={["blue"]}
          yAxisWidth={30}
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <Title>Top Países</Title>
          <BarChart
            className="mt-6"
            data={summary?.top_countries ?? []}
            index="country"
            categories={["clicks"]}
            colors={["blue"]}
            yAxisWidth={48}
          />
        </Card>
        <Card>
          <Title>Top Fontes de Tráfego</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Fonte</TableHeaderCell>
                <TableHeaderCell>Cliques</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(summary?.top_referrers ?? []).map((item) => (
                <TableRow key={item.referrer ?? "unknown"}>
                  <TableCell>{item.referrer ?? "Desconhecido"}</TableCell>
                  <TableCell>
                    <Badge>{item.clicks}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
}
