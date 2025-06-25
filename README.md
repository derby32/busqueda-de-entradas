# Ticket Checker

Simple page for verifying ticket codes via the `/check` endpoint. The page colors the
background according to the ticket status:

- **Green** (`.ok`) for valid tickets.
- **Gold** (`.vip`) for valid VIP tickets.
- **Red** (`.used`) for invalid or already used tickets.

After each check the input field stays focused and is cleared so scanning can
continue quickly.
