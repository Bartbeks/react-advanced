const fetchEvents = async () => {
  const response = await fetch("http://localhost:3000/events", {
    method: "GET",
  });
  const data = await response.json();

  return data;
};

const fetchUsers = async () => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching users:", error);
    throw error;
  }
};

const fetchCategories = async () => {
  const response = await fetch("http://localhost:3000/categories", {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const addEvent = async (event) => {
  const response = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
const updateEvent = async (updatedEvent) => {
  const response = await fetch(
    `http://localhost:3000/events/${updatedEvent.id}`,
    {
      method: "PUT",
      body: JSON.stringify(updatedEvent),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
};

const deleteEvent = async (eventId) => {
  const response = await fetch(`http://localhost:3000/events/${eventId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  fetchUsers,
  fetchCategories,
};
