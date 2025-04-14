import { Log } from '../app';

interface LogTableProps {
    logs: Log[];
}

const LogTable: React.FC<LogTableProps> = ({ logs }) => {
    return (
        <table className="log-table">
            <thead>
                <tr>
                    <th>Timestamp</th>
                    <th>Severity</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {logs.map((log) => (
                    <tr key={log.id} className={log.severity.toLowerCase()}>
                        <td>{log.timestamp}</td>
                        <td>{log.severity}</td>
                        <td>{log.message}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LogTable;