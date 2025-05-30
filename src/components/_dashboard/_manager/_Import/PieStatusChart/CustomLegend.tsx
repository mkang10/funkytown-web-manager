// components/charts/PieStatusChart/CustomLegend.tsx

interface LegendProps {
  payload?: any[];
  activeIndex: number | null;
  onLegendClick: (entry: any, index: number) => void;
  isDarkMode: boolean;
  fontSize: number;
}

export const CustomLegend = ({
  payload = [],
  activeIndex,
  onLegendClick,
  isDarkMode,
  fontSize,
}: LegendProps) => {
  const textColor = isDarkMode ? '#fff' : '#374151';

  return (
    <div
      role="list"
      aria-label="Status legend"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 16,
        marginTop: 16,
        fontWeight: 600,
        color: textColor,
        fontSize: fontSize * 0.9,
      }}
    >
      {payload.map((entry, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={`legend-item-${index}`}
            role="listitem"
            tabIndex={0}
            onClick={() => onLegendClick(entry, index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onLegendClick(entry, index);
            }}
            aria-pressed={isActive}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
                  justifyContent: 'center', // center horizontally

              opacity: isActive ? 1 : 0.6,
              transition: 'opacity 0.4s ease',
              userSelect: 'none',
              outline: 'none',
              padding: '4px 8px',
              borderRadius: 8,
              backgroundColor: isActive
                ? isDarkMode
                  ? 'rgba(224, 231, 255, 0.15)'
                  : 'rgba(55, 65, 81, 0.1)'
                : 'transparent',
              boxShadow: isActive ? `0 0 8px 2px ${entry.color}66` : 'none',
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                backgroundColor: entry.color,
                borderRadius: '50%',
                marginRight: 8,
                animation: isActive ? 'pulse 2s infinite' : 'none',
              }}
            />
            {entry.value}
          </div>
        );
      })}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 6px 0 ${isDarkMode ? '#e0e7ff' : '#374151'}99; }
          50% { box-shadow: 0 0 14px 4px ${isDarkMode ? '#e0e7ff' : '#374151'}cc; }
          100% { box-shadow: 0 0 6px 0 ${isDarkMode ? '#e0e7ff' : '#374151'}99; }
        }
      `}</style>
    </div>
  );
};
