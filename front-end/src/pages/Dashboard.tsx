import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { ChartArea } from "../features/dashboard/AreaChart"
import { ChartBar } from "../features/dashboard/BarChart"






export function Dashboard() {
    return (
        <div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] mb-4">
                <Card>

                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    
                </Card>
                <Card>

                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>

                </Card>
                <Card>

                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>

                </Card>
                <Card>

                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>

                </Card>

            </div>


            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <ChartArea />
                <ChartBar />
            </div>
        </div>
    )
}