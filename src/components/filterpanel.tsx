interface FilterPanelProps {
    setFilter: (filter: 'ALL' | 'INFO' | 'WARN' | 'ERROR') => void;
    currentFilter: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ setFilter, currentFilter }) => {
    const severities: ('ALL' | 'INFO' | 'WARN' | 'ERROR')[] = ['ALL', 'INFO', 'WARN', 'ERROR'];

    return (
        <div className="filter-panel">
            <label>Filter by Severity: </label>
            {severities.map((severity) => (
                <button
                    key={severity}
                    className={severity === currentFilter ? 'active' : ''}
                    onClick={() => setFilter(severity)}
                >
                    {severity}
                </button>
            ))}
        </div>
    );
};

export default FilterPanel;