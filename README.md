# Real-Time Log Analysis Dashboard

A modern web application built with React and TypeScript that visualizes server logs in real-time. The dashboard connects to a WebSocket server to receive log data, offering dynamic filtering capabilities and visual data representation.

## Features

- **Real-time Log Monitoring**: View server logs as they are generated via WebSocket connection
- **Interactive Filtering**: Filter logs by severity level (INFO, WARN, ERROR)
- **Visual Data Representation**: Chart.js integration for log data visualization
- **Color-coded Log Entries**: Easily distinguish between different severity levels
- **Responsive Design**: Clean interface that works across different devices
- **Efficient Data Management**: Maintains the most recent 100 log entries for optimal performance

## Technologies Used

- **React**: Front-end UI library
- **TypeScript**: Type-safe JavaScript
- **Chart.js**: Data visualization library
- **WebSocket**: Real-time data communication
- **CSS3**: Responsive styling

## Architecture

The application follows a component-based architecture for maintainability and reusability:

- **App (app.tsx)**: Main component that manages state and WebSocket connection
- **FilterPanel (filterpanel.tsx)**: Controls for filtering logs by severity
- **LogTable (logtable.tsx)**: Displays logs in a tabular format with color coding
- **LogChart (logchart.tsx)**: Visual representation of log distribution by severity

## Log Data Structure

Each log entry follows this structure:

```typescript
interface Log {
    id: string;
    timestamp: string;
    severity: 'INFO' | 'WARN' | 'ERROR';
    message: string;
}
```

## Component Highlights

### WebSocket Integration

```typescript
useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
        const newLog: Log = JSON.parse(event.data);
        setLogs((prev) => [...prev, newLog].slice(-100));
    };
    return () => ws.close();
}, []);
```

### Dynamic Chart Generation

```typescript
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

        // Chart initialization and cleanup logic
    }
}, [logs]);
```

### Type-Safe Filtering System

```typescript
const filteredLogs = filter === 'ALL' ? logs : logs.filter((log) => log.severity === filter);
```

## Installation and Setup

1. Clone the repository:
```
git clone https://github.com/username/real-time-log-analysis-dashboard.git
```

2. Install dependencies:
```
cd real-time-log-analysis-dashboard
npm install
```

3. Start the application:
```
npm run dev
```

4. Start the WebSocket server (see below)

## WebSocket Server

The application requires a WebSocket server that sends log data in the following format:

```json
{
  "id": "unique-log-id",
  "timestamp": "2023-04-13T15:30:45",
  "severity": "INFO",
  "message": "User logged in successfully"
}
```

A simple implementation of the server is provided in the `server.js` file in the repository. To start the server:

```
node server.js
```

## Customization

### Severity Colors

Log severity colors can be customized in the `app.css` file:

```css
.log-table tr.info {
    background-color: #e6f3ff;
}

.log-table tr.warn {
    background-color: #fff3cd;
}

.log-table tr.error {
    background-color: #f8d7da;
}
```

### Chart Appearance

Chart appearance can be modified in the `logchart.tsx` component by adjusting the Chart.js options.

## Future Enhancements

- Add search functionality for log messages
- Implement date range filtering
- Add more visualization types (pie charts, line graphs for trends)
- Create export options for log data (CSV, JSON)
- Implement dark mode theme
- Add notifications for critical errors
- Create a dashboard layout with draggable widgets

## Author

Benjamin C. Ward