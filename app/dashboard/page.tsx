import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
//import { currentUser } from "@clerk/nextjs/server";
import CallChart from "@/components/ui/callchart";

export default async function DashboardPage() {
  //const user = await currentUser();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="font-semibold"></span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/dashboard/#"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/settings#"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
          <Input type="search" placeholder="Search..." className="w-64" />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Input type="date" className="w-auto" defaultValue="2024-01-01" />
            <span>to</span>
            <Input type="date" className="w-auto" defaultValue="2024-12-31" />
            <Button>Download</Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Insights</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Opportunities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>New Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$455,000</p>
                  <p className="text-sm text-green-600">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Call Seconds</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">2350</p>
                  <p className="text-sm text-green-600">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Time Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$52,234</p>
                  <p className="text-sm text-green-600">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Screened Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">254</p>
                  <p className="text-sm text-green-600">
                    +201 since last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Call Minutes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CallChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Calls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    You got 254 calls screened this month
                  </p>
                  <ul className="space-y-4">
                    {[
                      {
                        name: "Olivia Martin",
                        amount: "2:53",
                        email: "Home insurance",
                      },
                      {
                        name: "Jackson Lee",
                        amount: "0:48",
                        email: "Broadband sales",
                      },
                      {
                        name: "Isabella Nguyen",
                        amount: "3:52",
                        email: "Suspected phishing",
                      },
                      {
                        name: "William Kim",
                        amount: "1:55",
                        email: "Election spam",
                      },
                      {
                        name: "Sofia Davis",
                        amount: "0:34",
                        email: "Election spam",
                      },
                    ].map((sale, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {sale.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{sale.name}</p>
                            <p className="text-sm text-gray-500">
                              {sale.email}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">{sale.amount}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
