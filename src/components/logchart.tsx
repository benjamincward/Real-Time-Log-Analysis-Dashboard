import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Log } from '../app';

interface LogChartProps {
    logs: Log[];
}

const LogChart: React.FC<LogChartProps> = ({ logs }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const severityCounts = logs.reduce((acc, log) => {
                acc[log.severity] = (acc[log.severity] || 0) + 1;
                return acc;
            }, { INFO: 0, WARN: 0, ERROR: 0 } as Record<'INFO' | 'WARN' | 'ERROR', number>);

            const data = {
                labels: ['INFO', 'WARN', 'ERROR'],
                datasets: [
                    {
                        label: 'Log Count by Severity',
                        data: [severityCounts.INFO, severityCounts.WARN, severityCounts.ERROR],
                        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                    },
                ],
            };

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(chartRef.current, {
                type: 'bar',
                data,
                options: { responsive: true },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [logs]);

    return <canvas ref={chartRef} />;
};

export default LogChart;