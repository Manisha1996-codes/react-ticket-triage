type SearchFilterProps = {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onClear: () => void;
};

export default function SearchFilter({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onClear,
}: SearchFilterProps) {
  const isResetEnabled =
    searchTerm.trim() !== "" ||
    statusFilter !== "All";

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search by title or customer..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
        }}
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{
          padding: "10px",
        }}
      >
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">
          In Progress
        </option>
        <option value="Resolved">
          Resolved
        </option>
      </select>

      <button
        onClick={onClear}
        disabled={!isResetEnabled}
        title="Reset Filters"
        style={{
          padding: "10px 12px",
          cursor: isResetEnabled
            ? "pointer"
            : "not-allowed",
          opacity: isResetEnabled
            ? 1
            : 0.5,
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "#fff",
        }}
      >
        Reset
      </button>
    </div>
  );
}