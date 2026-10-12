import { useEffect, useState } from "react";
import SearchFilter from "./components/SearchFilter";
import TicketList from "./components/TicketList";
import TicketDetails from "./components/TicketDetails";

export type Ticket = {
  id: string;
  title: string;
  customer: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
};

export default function TicketDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedTicket, setSelectedTicket] =
    useState<Ticket | null>(null);

  useEffect(() => {
    fetch("/api/tickets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch tickets");
        }

        return res.json();
      })
      .then((data: Ticket[]) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tickets.");
        setLoading(false);
      });
  }, []);
  const handleClearFilters = () => {
setSearchTerm("");
setStatusFilter("All");
setSelectedTicket(null);
};


  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      ticket.customer
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading tickets...</h2>
      </div>
    );
  }
  
  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #f5c2c7",
          backgroundColor: "#fff5f5",
          borderRadius: "8px",
        }}
      >
        <h2>Unable to load tickets</h2>
        <p>{error}</p>

        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support Ticket Dashboard</h1>

      <SearchFilter
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onClear ={ handleClearFilters}
      />

      <p>
        <strong>Ticket Count:</strong>{" "}
        {filteredTickets.length}
      </p>

      {filteredTickets.length === 0 ? (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#fff",
            marginTop: "20px",
          }}
        >
          <h3>No tickets found</h3>
          <p>
            Try changing the search text or
            selecting a different status filter.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div>
            <TicketList
              tickets={filteredTickets}
              onSelectTicket={setSelectedTicket}
              selectedTicketId={selectedTicket?.id??null}
              
            />
          </div>

          <div>
            <TicketDetails
              ticket={selectedTicket}
              onClose={() =>
                setSelectedTicket(null)
              }
              onStatusUpdated={(updatedTicket) => {
                setTickets((prevTickets) =>
                  prevTickets.map((ticket) =>
                    ticket.id === updatedTicket.id
                      ? updatedTicket
                      : ticket
                  )
                );

                setSelectedTicket(
                  updatedTicket
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}