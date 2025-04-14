import { useState, useEffect } from 'react';
import './app.css';
import LogTable from './components/logtable.tsx';
import LogChart from './components/logchart.tsx';
import FilterPanel from './components/filterpanel.tsx';

export interface Log {
    id: string;
    timestamp: string;
    severity: 'INFO' | 'WARN' | 'ERROR';
    message: string;
}

const App: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [filter, setFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR'>('ALL');

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onmessage = (event) => {
            const newLog: Log = JSON.parse(event.data);
            setLogs((prev) => [...prev, newLog].slice(-100));
        };
        return () => ws.close();
    }, []);

    const filteredLogs = filter === 'ALL' ? logs : logs.filter((log) => log.severity === filter);

    return (
        <div className="app">
            <h1>Real-Time Log Analysis Dashboard</h1>
            <FilterPanel setFilter={setFilter} currentFilter={filter} />
            <LogChart logs={filteredLogs} />
            <LogTable logs={filteredLogs} />
        </div>
    );
};

export default App;