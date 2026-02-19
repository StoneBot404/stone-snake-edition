# 🪨 Snake: Stone Edition

A modern, Dockerized take on the classic Snake game, built for cross-platform play (PC & Mobile) with a focus on seamless deployment from isolated environments.

## 🚀 The Story
This project was built as a collaboration between Boris and **Stone Bot**. The challenge wasn't just building the game, but "delivering" it. 

The game was developed on a server running inside a **VirtualBox VM (NAT mode)**. Usually, this makes the app invisible to the outside world. We solved this by:
1.  **Dockerizing** the app for consistent environments.
2.  **Mapping ports** from the Virtual VM to the Physical Host.
3.  **Cloudflare Tunneling**: Deploying an outbound tunnel to create a secure, public URL without opening any firewall ports or revealing home IP addresses.

## 📱 Features
- **Responsive Controls:** Automatically detects your device. Use **Arrow Keys** on desktop or **On-Screen Touch Buttons** on mobile.
- **Persistent High Scores:** Your best score is saved in your local browser storage.
- **Customizable Difficulty:** Toggle between **Slow**, **Normal**, and **Fast** modes.
- **Stone Visuals:** A sleek, dark-mode aesthetic with a distinct "Head" indicator for precision movement.

## 🛠️ Technical Stack
- **Frontend:** Vanilla JS, HTML5 Canvas, CSS3.
- **Containerization:** Docker & Docker Compose.
- **Web Server:** Nginx (Alpine-based for minimal footprint).
- **Deployment:** Cloudflare Tunnels for secure public access.

## 📦 Run it Locally
If you have Docker installed, you can spin this up in seconds:

```bash
docker-compose up -d --build
```
Access the game at `http://localhost:8085`.
