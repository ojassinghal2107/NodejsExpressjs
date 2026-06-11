const API = "http://localhost:5000/api";

// ── Tab switching ──────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
});

// ── Helpers ───────────────────────────────────────────────────
function showMsg(el, text, isError = false) {
    el.textContent = text;
    el.className = "msg " + (isError ? "error" : "success");
    setTimeout(() => { el.textContent = ""; el.className = "msg"; }, 4000);
}

// ── CREATE USER ───────────────────────────────────────────────
document.getElementById("createUserForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name  = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const msg   = document.getElementById("userMsg");

    try {
        const res  = await fetch(`${API}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showMsg(msg, `✅ User created! ID: ${data.user.id}`);
        e.target.reset();
    } catch (err) {
        showMsg(msg, `❌ ${err.message}`, true);
    }
});

// ── LOAD USERS ────────────────────────────────────────────────
document.getElementById("loadUsersBtn").addEventListener("click", async () => {
    const list = document.getElementById("userList");
    list.innerHTML = "<p class='empty'>Loading…</p>";

    try {
        const res   = await fetch(`${API}/users`);
        const users = await res.json();

        if (!users.length) {
            list.innerHTML = "<p class='empty'>No users yet.</p>";
            return;
        }

        list.innerHTML = users.map(u => `
            <div class="list-item">
                <span class="id-badge">ID ${u.id}</span>
                <strong>${u.name}</strong> — ${u.email}
            </div>
        `).join("");
    } catch {
        list.innerHTML = "<p class='empty'>Failed to load users.</p>";
    }
});

// ── CREATE EVENT ──────────────────────────────────────────────
document.getElementById("createEventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = document.getElementById("eventMsg");

    const body = {
        title:       document.getElementById("eventTitle").value.trim(),
        description: document.getElementById("eventDescription").value.trim(),
        date:        document.getElementById("eventDate").value,
        location:    document.getElementById("eventLocation").value.trim(),
        capacity:    document.getElementById("eventCapacity").value,
        hostId:      document.getElementById("eventHostId").value
    };

    try {
        const res  = await fetch(`${API}/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showMsg(msg, `✅ Event created! ID: ${data.event.id}`);
        e.target.reset();
    } catch (err) {
        showMsg(msg, `❌ ${err.message}`, true);
    }
});

// ── LOAD EVENTS ───────────────────────────────────────────────
document.getElementById("loadEventsBtn").addEventListener("click", async () => {
    const list = document.getElementById("eventList");
    list.innerHTML = "<p class='empty'>Loading…</p>";

    try {
        const res    = await fetch(`${API}/events`);
        const events = await res.json();

        if (!events.length) {
            list.innerHTML = "<p class='empty'>No events yet.</p>";
            return;
        }

        list.innerHTML = events.map(ev => `
            <div class="list-item">
                <span class="id-badge">ID ${ev.id}</span>
                <strong>${ev.title}</strong><br/>
                📍 ${ev.location} &nbsp;|&nbsp; 🗓️ ${new Date(ev.date).toLocaleString()}<br/>
                👤 Host: ${ev.host?.name ?? "Unknown"} (${ev.host?.email ?? ""})<br/>
                🪑 Capacity: ${ev.capacity}
            </div>
        `).join("");
    } catch {
        list.innerHTML = "<p class='empty'>Failed to load events.</p>";
    }
});

// ── REGISTER FOR EVENT ────────────────────────────────────────
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId  = document.getElementById("regUserId").value;
    const eventId = document.getElementById("regEventId").value;
    const msg     = document.getElementById("registerMsg");

    try {
        const res  = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, eventId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        showMsg(msg, `✅ Seat booked! Registration ID: ${data.registration.id}`);
        e.target.reset();
    } catch (err) {
        showMsg(msg, `❌ ${err.message}`, true);
    }
});
