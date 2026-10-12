type Ticket = {
  id: string;
  title: string;
  customer: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
};

type TicketListProps = {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket | null) => void;
  selectedTicketId: string | null;
};

export default function TicketList({
  tickets,
  onSelectTicket,
  selectedTicketId,
}: TicketListProps) {
  if (tickets.length === 0) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        No tickets found.
      </div>
    );
  }

  return (
    <>
      {tickets.map((ticket) => {
        const isSelected =
          selectedTicketId === ticket.id;

        return (
          <div
            key={ticket.id}
            onClick={() => {
              if (isSelected) {
                onSelectTicket(null);
              } else {
                onSelectTicket(ticket);
              }
            }}
            style={{
              border: isSelected
                ? "2px solid #1976d2"
                : "1px solid #ddd",
              backgroundColor: isSelected
                ? "#e3f2fd"
                : "#fff",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <h3>{ticket.title}</h3>

            <p>
              <strong>Customer:</strong>{" "}
              {ticket.customer}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {ticket.priority}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {ticket.status}
            </p>
          </div>
        );
      })}
    </>
  );
}