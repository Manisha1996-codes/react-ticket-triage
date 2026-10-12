import React from "react";

import { useState } from "react";

type Ticket = {
  id: string;
  title: string;
  customer: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
};

type TicketDetailsProps = {
  ticket: Ticket | null;
  onClose: () => void;
  onStatusUpdated: (updatedTicket: Ticket) => void;
};

export default function TicketDetails({
  ticket,
  onClose,
  onStatusUpdated,
}: TicketDetailsProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleStatusChange = async (
    newStatus: string
  ) => {
    if (!ticket) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `/api/tickets/${ticket.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update ticket status"
        );
      }

      const updatedTicket = await response.json();

      onStatusUpdated(updatedTicket);
    } catch (err) {
      console.error(err);
      setError("Failed to update ticket status.");
    } finally {
      setSaving(false);
    }
  };

  if (!ticket) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#fff",
        }}
      >
        <h3>Select a ticket</h3>
        <p>
          Click a ticket from the list to view
          details.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>{ticket.title}</h2>

        <button
          onClick={onClose}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>

      <p>
        <strong>ID:</strong> {ticket.id}
      </p>

      <p>
        <strong>Customer:</strong>{" "}
        {ticket.customer}
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        {ticket.priority}
      </p>

      <p>
        <strong>Description:</strong>{" "}
        {ticket.description}
      </p>

      <p>
        <strong>Created:</strong>{" "}
        {new Date(
          ticket.createdAt
        ).toLocaleDateString()}
      </p>

      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Status</strong>
        </label>

        <br />

        <select
          value={ticket.status}
          disabled={saving}
          onChange={(e) =>
            handleStatusChange(
              e.target.value
            )
          }
          style={{
            marginTop: "8px",
            padding: "8px",
            width: "200px",
          }}
        >
          <option value="Open">
            Open
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Resolved">
            Resolved
          </option>
        </select>
      </div>

      {saving && (
        <p
          style={{
            color: "blue",
            marginTop: "10px",
          }}
        >
          Updating status...
        </p>
      )}

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "10px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}